import React from 'react';
import { Register } from '../components/Register';
import { Login } from '../components/Login';
import { Switch, Route, Redirect } from 'react-router';
import { Home } from './Home';

export class Main extends React.Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login loginHandler= {this.props.loginHandler}/>
    }

    getHome = ()=> {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login"/>
    }

    getRoot = () => {
        return <Redirect to="/login"/>;
    }
    render() {
        return (
            <section className="main">
                <Switch>
                    <Route exact path="/" render={ this.getRoot }/>
                    <Route path="/register" component={ Register }/>
                    <Route path="/login" render={ this.getLogin }/>
                    <Route path="/home" render={ this.getHome }/>
                    <Route component={ Login }/>
                </Switch>
            </section>
        );
    }
}