import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';
import { Menu, Input, Icon } from 'semantic-ui-react';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (!isAuthLoaded(getState())) {
      return dispatch(loadAuth());
    }
  }
}])
@connect(
  state => ({
    user: state.auth.user
  }),
  { logout, pushState: push })

export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static defaultProps = {
    user: null
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleLogout = event => {
    event.preventDefault();
    this.props.logout().then(() => this.props.pushState('/'));
  };

  render() {
    const { user, pushState } = this.props;
    const logo = require('./logo.png');
    const styles = require('./Header.scss');
    return (
      <div className={styles.bordered_menu}>
        <Menu secondary className="sticky">
          <Menu.Item>
            <Link to="/" >
              <img alt="" src={logo} className={styles.brand} />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Input className="icon" icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item position="right">
            {!user && <Menu.Item
              name="Sign In"
              onClick={() => pushState('/signin')} />
            }
            {!user && <Menu.Item
              name="Sign Up"
              onClick={() => pushState('/signup')} />
            }
            {user && <Menu.Item
              name="logout"
              onClick={this.handleLogout} />
            }
            {user && <Menu.Item
              className={
                styles['circle-hover']
              }
              name="user"
              onClick={() => pushState('profile')}
            >
              <Icon name="user" />
            </Menu.Item>
            }
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
