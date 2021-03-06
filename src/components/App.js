import React, { Component } from 'react';
import '../styles/App.css';
import { Header } from '../components/Header.js';
import { Main } from '../components/Main.js';
import { TOKEN_KEY } from '../constants';

class App extends Component {
  state = {
    isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
  }

  loginHandler = (response) => {
    localStorage.setItem(TOKEN_KEY, response);
    this.setState({isLoggedIn: true});
  }

  logoutHandler = () => {
    localStorage.removeItem(TOKEN_KEY);
    this.setState({isLoggedIn: false});
  }

  render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} logoutHandler = {this.logoutHandler}/>
        <Main isLoggedIn={this.state.isLoggedIn} loginHandler = {this.loginHandler}/>
      </div>
    );
  }
}

export default App;
