import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import SignUpForm from 'components/SignUp/SignUpForm';
import * as authActions from 'redux/modules/auth';

@connect(
  () => ({}),
  { ...authActions, pushState: push })
export default class SignUp extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  register = data => this.props.register(data).then(this.successRegister);

  successRegister = () => this.props.pushState('signin');

  render() {
    return (
      <div className="two column ui container middle aligned center aligned grid main_container">
        <div className="column">
          <SignUpForm onSubmit={this.register} initialValues={this.getInitialValues()} />
        </div>
      </div>
    );
  }
}
