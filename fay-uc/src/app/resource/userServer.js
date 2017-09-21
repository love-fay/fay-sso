/**
 * Created by feichongzheng on 16/12/29.
 */

import Config from '../config.json';
import cookie from 'react-cookie';
import Browser from '../browser/browser';
import Hashids from 'hashids';
const hashids = new Hashids('爱死费崇政', 8);

const login = (data, history, nextPathname, remember, callback) => {
    const result = {};
    result.username = data.username;
    cookie.save('current-user', data);
    let hashId = hashids.encode(new Date().getTime());
    const loginMessage = {name: 'login', value: result, remember: remember, hashId: hashId};

    window.frames[0].postMessage(JSON.stringify(loginMessage), Config.location);
    let n = 0;
    let interval = window.setInterval(() => {
        if (cookie.load('UcLoginSuccess') === hashId) {
            window.clearInterval(interval);
            cookie.remove('UcLoginSuccess');
            callback && callback(loginMessage);
            if (Browser.getBrowser() === 'Safari' || Browser.getBrowser() === 'Opera') {
                window.location.href = Config.location + '/faylogin.html?replaceHref=' + window.location.protocol + '//' + window.location.host + nextPathname + '&remember=' + remember;
            } else if (history !== null && nextPathname !== null) {
                history.push(nextPathname, null);
            } else if (nextPathname !== null) {
                window.location.href = nextPathname;
            }
        } else {
            n++;
            if (n > 100) {
                window.clearInterval(interval);
            }
        }
    }, 30);
};

const logout = (callback) => {
    const logoutMessage = {name: 'logout'};
    window.frames[0].postMessage(JSON.stringify(logoutMessage), '*');
    cookie.remove('current-user');
    callback && callback();
};


const UserServer = {
    login: login,
    logout: logout,
};

export default UserServer;
