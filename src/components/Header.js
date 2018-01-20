import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import { Icon } from 'antd';

export class Header extends Component {
  render() {
    return (
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Around</h1>
            {this.props.isLoggedIn ?
              <a className="logout"
                  onClick={this.props.logoutHandler}
              >
                <Icon type="logout" />
                {' '}Logout
              </a> : null}
        </header>
    );
  }
}
