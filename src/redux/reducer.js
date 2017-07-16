import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as form } from 'redux-form';
import auth from './modules/auth';
import notifs from './modules/notifs';
import posts from './modules/posts';
import comments from './modules/comment';
import likes from './modules/likes';
import accountForm from './modules/accountForm';

export default function createReducers(asyncReducers) {
  return {
    routing: routerReducer,
    reduxAsyncConnect,
    online: (v = true) => v,
    form,
    notifs,
    auth,
    posts,
    likes,
    comments,
    accountForm,
    ...asyncReducers
  };
}
