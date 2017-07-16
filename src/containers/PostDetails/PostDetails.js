import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Container, Icon } from 'semantic-ui-react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import * as postActions from 'redux/modules/posts';
import * as commentActions from 'redux/modules/comment';
import * as likesAction from 'redux/modules/likes';
import { CommentForm } from 'components';

@asyncConnect([{
  promise: ({ store: { dispatch }, params }) => {
    dispatch(postActions.load({ id: params.postId }));
  }
}, {
  promise: ({ store: { dispatch }, params }) => {
    dispatch(commentActions.load({ post_id: params.postId }));
  }
}])
@connect(
  state => ({
    posts: state.posts.items,
    comments: state.comments.items,
    user: state.auth.user
  }),
  {
    ...postActions,
    ...commentActions,
    ...likesAction
  }
)
export default class PostDetails extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    incrementView: PropTypes.func.isRequired,
    addLikes: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
  };

  static defaultProps = {
    user: null
  };

  state = {
    posts: [],
    comments: [],
    likeClass: ''
  }

  componentDidMount() {
    this.props.incrementView(this.props.posts);
    this.setLikeClass();
  }

  setLikeClass = () => {
    const { user, posts } = this.props;
    let hasLike = false;
    const post = posts[0];

    post.likes.forEach(like => {
      if (like.user_id === user.id) {
        hasLike = true;
      }
    });

    if (hasLike) {
      this.setState({
        likeClass: ' red'
      });
    } else {
      this.setState({
        likeClass: ' '
      });
    }
  }

  AddLikes = () => {
    const { user, posts } = this.props;

    if (user) {
      let hasLike = false;
      let likeId = 0;
      const post = posts[0];

      post.likes.forEach(like => {
        if (like.user_id === user.id) {
          hasLike = true;
          likeId = like.id;
          // console.log(hasLike);
        }
      });

      if (hasLike) {
        this.props.removeLike(likeId);
        this.props.dispatch(postActions.load({ id: posts[0].id }));
        this.setState({
          likeClass: ' '
        });
      } else {
        this.props.addLikes({ post_id: posts[0].id, user_id: user.id });
        this.props.dispatch(postActions.load({ id: posts[0].id }));
        this.setState({
          likeClass: ' red'
        });
      }
    }
  }

  AddComment = (id, data) => {
    const { user } = this.props;
    console.log(user);
    this.props.addComment({ ...data, post_id: id, user_id: user.id });
    this.props.dispatch(reset('commentForm'));
  }

  render() {
    const { posts, comments, user } = this.props;
    const { likeClass } = this.state;
    // console.log(posts);
    const styles = require('./PostDetails.scss');
    const img = require('../Posts/daniel.jpg');
    return (
      <Container text className={styles.cent_cont}>
        <Grid container columns={1}>
          <Grid.Row>
            <Grid.Column className="">
              <div className="ui feed">
                <div className="event">
                  <div className="label">
                    <img
                      alt=""
                      src={`/uploads/${posts[0].users[0].avatar_path}`}
                      className={styles.user_avatar}
                      size="large"
                    />
                  </div>
                  <div className="content">
                    {posts[0] && posts[0].users && posts[0].users[0].firstName}
                  </div>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Image alt="" src={`/uploads/${posts[0].img_path}`} />
              <div className={`content ${styles.marg_cont}`}>
                {posts[0].description}
              </div>
              <div className="ui feed">
                <div className="event">
                  <div className="content" >
                    <Icon
                      name="like"
                      link size="large"
                      className={likeClass}
                      onClick={() => { this.AddLikes(); }}
                    />
                    {posts[0].likes.length}
                    <Icon name="unhide" size="large" className={styles.marg_icon} />
                    {posts[0].views}
                  </div>
                </div>
              </div>
              <div className="ui feed">
                <div className="event">
                  <div className="content">
                    {user && <CommentForm onSubmit={data => this.AddComment(this.props.params.postId, data)} />}
                    <div className="ui list">
                      {comments.map(item => (
                        <div className="item" key={item.id} >
                          <img className={`ui ${styles.user_avatar}, avatar image`} alt="" src={img} />
                          <div className="content">
                            <a className="header">{comments[0].users[0].firstName}</a>
                            <div className="description">
                              {item.comment}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
