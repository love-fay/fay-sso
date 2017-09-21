/**
 * Created by feichongzheng on 16/12/29.
 */
import cookie from 'react-cookie';
import Listener from '../event/listener';
import Config from '../../app/config.json';
import Parent from '../../app/security/parent';
import isJSON from 'is-json';

const changeCookieFromEventListenerForIframe = () => {
    Listener.addEvent(window, 'message', (e) => {
        let result = e.data;
        let data = isJSON(result) ? JSON.parse(result) : null;
        if (data) {
            let name = data.name;
            if (name === 'logout') {
                cookie.save('current-user', null, {});
                cookie.remove('current-user');
            } else if (name === 'login') {
                let value = data.value;
                cookie.save('current-user', value, data.remember ? {maxAge: Config.cookieMaxAge} : {});
                let obj = new Object({name: 'UcLoginSuccess', value: data.hashId});
                window.parent.postMessage(JSON.stringify(obj), Parent.getHost());
            }
        }
    });
};

const CookieForIframe = {
    changeCookieFromEventListenerForIframe: changeCookieFromEventListenerForIframe,
};
export default CookieForIframe;
