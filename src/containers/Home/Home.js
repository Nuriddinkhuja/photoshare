import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as postsActions from 'redux/modules/posts';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import ListPosts from '../Posts/ListPosts';


@asyncConnect([{
  deferred: __SERVER__,
  promise: ({ store: { dispatch } }) => dispatch(postsActions.load())
}])

@connect(
  state => ({
    posts: state.posts.items
  }),
  { ...postsActions }
)

export default class Home extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  state = {
    posts: []
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="ui main container">
        {posts.length ? <ListPosts items={posts} /> : ''}
      </div>
    );
  }
}
