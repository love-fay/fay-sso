/**
 * Created by feichongzheng on 16/12/29.
 */
import cookie from 'react-cookie';
import Listener from '../event/listener';
import Config from '../../app/config.json';
import isJSON from 'is-json';

const changeCookieFromEventListener = (callback, remember) => {
    Listener.addEvent(window, 'message', (e) => {
        const result = e.data;
        let data = isJSON(result) ? JSON.parse(result) : null;
        if (data) {
            let name = data.name;
            if (name === 'logout') {
                cookie.save('current-user', null, {});
                cookie.remove('current-user');
            } else if (name === 'login') {
                let value = data.value;
                cookie.save('current-user', value, (data.remember || remember === 'true') ? {maxAge: Config.cookieMaxAge} : {});
            } else if (name === 'UcLoginSuccess') {
                let value = data.value;
                cookie.save('UcLoginSuccess', value, {});
            }
            if ((name === 'logout' || name === 'login') && callback) {
                callback();
            }
        }
    });
};

const Cookie = {
    changeCookieFromEventListener: changeCookieFromEventListener,
};

export default Cookie;
