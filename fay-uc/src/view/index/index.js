/**
 * Created by feichongzheng on 16/12/7.
 */
import Cookie from '../../app/cookie/cookie';
import UserServer from '../../app/resource/userServer';
import LoginFrame from '../../app/frame/login';
import Current from '../../app/security/current';

const init = (callback) => {
    if (Current.isOrAllowed()) {
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

init(() => {
    document.getElementById('app').innerHTML = '<div>我被初始化了</div>';
});

