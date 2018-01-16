import React from 'react';
import { Register } from '../components/Register';
import { Login } from '../components/Login';
import { Switch, Route } from 'react-router';

export class Main extends React.Component {
    render() {
        return (
            <section className="main">
                <Switch>
                    <Route exact path="/" component={ Login }/>
                    <Route path="/register" component={ Register }/>
                    <Route path="/login" component={ Login }/>
                    <Route component={ Login }/>
                </Switch>
            </section>
        );
    }
}