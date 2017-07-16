import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import LoginForm from 'components/LoginForm/LoginForm';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({ user: state.auth.user }),
  { ...authActions, pushState: push })
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  }

  static defaultProps = {
    user: null
  }

  static contextTypes = {
    router: PropTypes.object
  }

  login = data => this.props.login('local', data).then(this.successLogin);

  successLogin = () => {
    if (!this.props.location.query.redirect) {
      this.props.pushState('/');
    }
  }

  render() {
    const { user, logout } = this.props;
    const styles = require('./login.scss');
    return (
      <div className={`two column ui container middle aligned center aligned grid ${styles.main_container}`}>
        {!user && <div className="column">
          <LoginForm onSubmit={this.login} />
        </div>
        }
        {user && <div>
          <p>You are currently logged in as {user.email}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out" />{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
