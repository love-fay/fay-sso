/**
 * Created by feichongzheng on 16/12/7.
 */
import Cookie from '../../app/cookie/cookie';
import UserServer from '../../app/resource/userServer';
import LoginFrame from '../../app/frame/login';
import Parent from '../../app/security/parent';

const init = (callback) => {
    if (Parent.isOrAllowed) {
        Cookie.changeCookieFromEventListener(callback);
        LoginFrame.createIframe();
    } else {
        callback();
    }
};

window.FayUc = {
    login: UserServer.login,
    logout: UserServer.logout,
    init: init
};
