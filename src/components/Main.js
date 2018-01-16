import React from 'react';
import { Register } from '../components/Register';
import { Login } from '../components/Login';
import { Switch, Route } from 'react-router';
import { Home } from './Home';

export class Main extends React.Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Home/> : <Login loginHandler= {this.props.loginHandler}/>
    }
    render() {
        return (
            <section className="main">
                <Switch>
                    <Route exact path="/" render={ this.getLogin }/>
                    <Route path="/register" component={ Register }/>
                    <Route path="/login" render={ this.getLogin }/>
                    <Route component={ Login }/>
                </Switch>
            </section>
        );
    }
}