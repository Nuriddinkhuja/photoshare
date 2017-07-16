import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';


export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        <div className="ui container">
          {children}
        </div>
      </div>
    );
  }
}
