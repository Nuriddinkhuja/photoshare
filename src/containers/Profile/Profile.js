import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Grid, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
// import { asyncConnect } from 'redux-connect';
// import { Menu, Input, Icon } from 'semantic-ui-react';
// import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';

@connect(
  () => ({}),
  { pushState: push })
export default class Profile extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static defaultProps = {
  };

  static contextTypes = {
  };

  goto = route => {
    this.props.pushState(route);
  }

  render() {
    const { children } = this.props;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Menu vertical>
              <Menu.Item onClick={() => this.goto('/profile')}>
                Account
              </Menu.Item>
              <Menu.Item>
                <Label
                  as="a"
                  onClick={() => this.goto('/profile/add_post?redirect=/profile/posts')}
                  color="teal"
                  circular
                >
                  +
                </Label>
                <Link to={'/profile/posts'}>Posts</Link>
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column width={1}>
          </Grid.Column>
          <Grid.Column width={12}>
            {children}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
