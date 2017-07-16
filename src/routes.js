import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { App, NotFound, Profile } from 'containers';
import getRoutesUtils from 'utils/routes';

// eslint-disable-next-line import/no-dynamic-require
if (typeof System.import === 'undefined') System.import = module => Promise.resolve(require(module));

export default store => {
  const {
    injectReducerAndRender,
    permissionsComponent
  } = getRoutesUtils(store);

  /* Permissions */

  const isAuthenticated = UserAuthWrapper({
    authSelector: state => state.auth.user,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated',
    failureRedirectPath: '/signin'
  });

  const isNotAuthenticated = UserAuthWrapper({
    authSelector: state => state.auth.user,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    predicate: user => !user,
    failureRedirectPath: '/signin',
    allowRedirectBack: false
  });

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      {/* Home (main) route */}
      <IndexRoute
        getComponent={() => injectReducerAndRender(
          {
            posts: System.import('./redux/modules/posts'),
            user: System.import('./redux/modules/auth')
          },
          System.import('./containers/Home/Home')
        )}
      />
      {/* Routes requiring login */}
      {/*
        You can also protect a route like this:
        <Route path="protected-route" {...permissionsComponent(isAuthenticated)(Component)}>
      */}
      <Route {...permissionsComponent(isAuthenticated)()}>
        <Route path="loginSuccess" getComponent={() => System.import('./containers/LoginSuccess/LoginSuccess')} />
        <Route component={Profile}>
          <Route
            path="/profile"
            getComponent={() => injectReducerAndRender(
              {
                posts: System.import('./redux/modules/posts'),
                user: System.import('./redux/modules/auth')
              },
              System.import('./containers/Profile/Account')
            )}
          ></Route>
          <Route
            path="/profile/posts"
            getComponent={() => injectReducerAndRender(
              {
                posts: System.import('./redux/modules/posts')
              },
              System.import('./containers/Profile/Posts')
            )}
          ></Route>
          <Route
            path="/profile/edit_post/:postId"
            getComponent={() => injectReducerAndRender(
              {
                posts: System.import('./redux/modules/posts')
              },
              System.import('./containers/Posts/AddingPost')
            )}
          />
          <Route
            path="/profile/add_post"
            getComponent={() => injectReducerAndRender(
              {
                posts: System.import('./redux/modules/posts')
              },
              System.import('./containers/Posts/AddingPost')
            )}
          />
        </Route>
      </Route>

      {/* Routes disallow login */}
      <Route {...permissionsComponent(isNotAuthenticated)()}>
        <Route path="signup" getComponent={() => System.import('./containers/SignUp/SignUp')} />
      </Route>

      {/* Routes */}
      <Route path="signin" getComponent={() => System.import('./containers/Login/Login')} />
      <Route
        path="addingpost"
        getComponent={() => injectReducerAndRender(
          {
            posts: System.import('./redux/modules/posts')
          },
        System.import('./containers/Posts/AddingPost')
        )}
      />
      <Route
        path="/posts/:postId"
        getComponent={() => injectReducerAndRender(
          {
            posts: System.import('./redux/modules/posts')
          },
        System.import('./containers/PostDetails/PostDetails')
        )}
      />

      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
