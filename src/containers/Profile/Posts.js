import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as postsActions from 'redux/modules/posts';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ListPosts from '../Posts/ListPosts';


@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    dispatch(postsActions.load({
      user_id: getState().auth.user.id
    }));
  }
}])

@connect(
  state => ({
    posts: state.posts.items
  }),
  { ...postsActions, pushState: push }
)
export default class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    clearItems: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static defaultProps = {
    posts: []
  };

  static contextTypes = {
  };

  state = {
    editId: 0
  }

  componentWillUnmount() {
    if (!this.state.editId) {
      this.props.dispatch(this.props.clearItems());
    }
  }

  gotoEdit = id => {
    this.setState({
      editId: id
    });
    this.props.pushState(`/profile/edit_post/${id}`);
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        <h1>My Posts</h1>
        <ListPosts items={posts} editable gotoEdit={this.gotoEdit} />
      </div>
    );
  }
}
