import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';
import * as postActions from 'redux/modules/posts';
import { PostForm } from 'components';
import Dropzone from 'react-dropzone';
import { change } from 'redux-form';
import { createApp } from 'app';
const app = createApp('rest');

@asyncConnect([{
  promise: ({ store: { dispatch }, params }) => {
    console.log(params);
    let res;
    if (params.postId) {
      res = dispatch(postActions.load({ id: params.postId }));
    } else {
      res = dispatch(postActions.clearItems());
    }
    return res;
  }
}])
@connect(
  state => ({
    posts: state.posts.items,
    user: state.auth.user
  }),
  {
    ...postActions,
    pushState: push
  }
)

export default class AddingPost extends Component {

  static propTypes = {
    addItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    location: PropTypes.object,
    posts: PropTypes.array,
    params: PropTypes.object
  }

  static defaultProps = {
    location: null,
    posts: [],
    params: {}
  }

  state = {
    files: []
  }

  componentDidMount() {
    if (this.props.posts.length) {
      this.fillForm();
    }
  }

  onDrop = files => {
    this.setState({
      files
    });
  }

  addItem = data => {
    this.props.addItem({ ...data });
    this.props.dispatch(reset('postForm'));
    this.setState({
      files: []
    });
    if (this.props.location.query.redirect) {
      this.props.pushState(this.props.location.query.redirect);
    }
  }

  AddPost = data => {
    if (this.state.files[0]) {
      const uploadService = app.service('uploads');
      const reader = new FileReader();
      reader.readAsDataURL(this.state.files[0]);
      reader.addEventListener('load', () => {
        uploadService
          .create({ uri: reader.result })
          .then(response => {
            if (this.props.params.postId) {
              this.props.updateItem(this.props.params.postId, { ...data, img_path: response.id });
            } else {
              this.addItem({ ...data, user_id: this.props.user.id, img_path: response.id });
            }
          });
      }, false);
    } else if (this.props.params.postId) {
      this.props.updateItem(this.props.params.postId, { ...data });
    } else {
      this.addItem({ ...data, user_id: this.props.user.id });
    }
  }

  fillForm = () => {
    this.props.dispatch(change('postForm', 'description', this.props.posts[0].description));
  }

  render() {
    const { posts } = this.props;
    let { files } = this.state;
    if (posts.length && !files.length) {
      files = [{
        preview: `/uploads/${posts[0].img_path}`
      }];
    }

    return (
      <div className="two column ui container middle aligned center aligned grid main_container">
        <div className="column">
          <h2 className="ui white image header">
            { posts.length ? 'Update' : 'Create' } a post
          </h2>
          <div className="ui stacked segment">
            <div
              style={{
                margin: '10px auto'
              }}
            >
              <Dropzone
                onDrop={this.onDrop}
                accept="image/jpeg, image/png"
              >
                {
                  files.length ?
                    <div
                      style={{
                        width: 130,
                        height: 200,
                        backgroundImage: `url(${files[0].preview})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        margin: '0 auto'
                      }}
                    >
                      <h4
                        style={{
                          color: '#fff',
                          textShadow: '1px 1px black'
                        }}
                      >
                        Upload post photo.
                      </h4>
                    </div> :
                    ''
                }
              </Dropzone>
            </div>
            <PostForm onSubmit={this.AddPost} />
          </div>
        </div>
      </div>
    );
  }
}
