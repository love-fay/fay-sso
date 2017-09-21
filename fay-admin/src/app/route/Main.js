/**
 * Created by feichongzheng on 16/12/18.
 */

import 'node-waves/src/less/waves.less';
import React, {Component} from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Bundle from '../bundle/components/Bundle';
import loadLayout12 from 'bundle-loader?lazy&name=[Layout12]!../layout/components/Layout12';
import loadE401D3 from 'bundle-loader?lazy&name=[E401D3]!../error/components/E401D3';
import loadE504 from 'bundle-loader?lazy&name=[E504]!../error/components/E504';
import loadE404 from 'bundle-loader?lazy&name=[E404]!../error/components/E404';
import loadHome from 'bundle-loader?lazy&name=[Home]!../home/components/Home';
import loadLogin from 'bundle-loader?lazy&name=[Login]!../uums/user/components/Login';
import loadUumsRoute from 'bundle-loader?lazy&name=[UumsRoute]!../uums/route/components/Main';

const history = createBrowserHistory();

const UumsRoute = (props) => (
    <Bundle load={loadUumsRoute}>
        {(Main) => {
            return <Main {...props}/>;
        }}
    </Bundle>
);

const E401D3 = (props) => (
    <Bundle load={loadE401D3}>
        {(E401D3) => {
            return <E401D3 {...props}/>;
        }}
    </Bundle>
);

const E504 = (props) => (
    <Bundle load={loadE504}>
        {(E504) => {
            return <E504 {...props}/>;
        }}
    </Bundle>
);

const E404 = (props) => (
    <Bundle load={loadE404}>
        {(E404) => {
            return <E404 {...props}/>;
        }}
    </Bundle>
);

const Login = (props) => (
    <Bundle load={loadLogin}>
        {(Login) => {
            return <Login {...props}/>;
        }}
    </Bundle>
);

const Home = (props) => (
    <Bundle load={loadHome}>
        {(Home) => {
            return <Home {...props}/>;
        }}
    </Bundle>
);

const Layout12 = (props) => (
    <Bundle load={loadLayout12}>
        {(Layout12) => {
            const pathname = props.location.pathname;
            return pathname === '/' ?
                <Layout12 {...props}>
                    <Route path={`${props.match.url}`} component={Home}/>
                </Layout12> :
                <Layout12 {...props}>
                    <Route path={`${props.match.url}`} component={UumsRoute}/>
                </Layout12>;
        }}
    </Bundle>
);

export default class Main extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return <Router history={history}>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/504" component={E504} />
                    <Route path='/404' component={E404} />
                    <Route path='/401D3' component={E401D3} />
                    <Route path="/" component={Layout12}/>
                </Switch>
            </Router>;
    }

    loggedIn = () => {
        let user = cookie.load('current-user');
        return typeof (user) === 'object';
    };
}
