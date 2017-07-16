import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';
import { change } from 'redux-form';
// import { Menu, Input, Icon } from 'semantic-ui-react';
import { update } from 'redux/modules/auth';
// import { load } from 'redux/modules/accountForm';
import { AccountForm } from 'components';
import Dropzone from 'react-dropzone';
import { createApp } from 'app';
const app = createApp('rest');


@asyncConnect([

])
@connect(
  state => ({
    user: state.auth.user
  }),
  { updateUser: update }
)
export default class Account extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired
  };

  static defaultProps = {
  };

  static contextTypes = {
  };

  state = {
    files: []
  }

  componentDidMount() {
    const { user, dispatch } = this.props;
    Object.keys(user).forEach(key => {
      if (['password', 'confirm_password', 'avatar_path'].indexOf(key) === -1) {
        dispatch(change('account', key, user[key]));
      }
    });
  }

  onDrop = files => {
    this.setState({
      files
    });
  }

  saveAccount = data => {
    const { user, updateUser } = this.props;

    if (this.state.files[0]) {
      const uploadService = app.service('uploads');
      if (user.avatar_path) {
        uploadService.remove(user.avatar_path);
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.state.files[0]);
      reader.addEventListener('load', () => {
        uploadService
          .create({ uri: reader.result })
          .then(response => {
            updateUser(user.id, { ...data, avatar_path: response.id });
          });
      }, false);
    } else {
      updateUser(user.id, data);
    }
  }

  render() {
    const { user } = this.props;
    let { files } = this.state;

    if (!files.length) {
      files = [{
        preview: `/uploads/${user.avatar_path}`
      }];
    }

    return (
      <div>
        <h1>Account</h1>
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
                      Upload profile photo.
                    </h4>
                  </div> :
                  ''
              }
            </Dropzone>
          </div>
          <AccountForm onSubmit={this.saveAccount} />
        </div>
      </div>
    );
  }
}
