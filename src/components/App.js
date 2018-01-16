import React, { Component } from 'react';
import '../styles/App.css';
import { Header } from '../components/Header.js';
import { Main } from '../components/Main.js';

class App extends Component {
  state = {
    isLoggedIn: false,
  }

  loginHandler = () => {
    this.setState({isLoggedIn: true});
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main isLoggedIn={this.state.isLoggedIn} loginHandler = {this.loginHandler}/>
      </div>
    );
  }
}

export default App;
