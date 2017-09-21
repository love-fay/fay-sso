/**
 * Created by feichongzheng on 16/12/30.
 */
import Config from '../config.json';
import Package from '../../../package.json';

const createIframe = (callback) => {
    const version = Package.version;
    let loginIframe = document.createElement('iframe');
    loginIframe.src = Config.location + '/' + version +'/login.html';
    loginIframe.width = '0';
    loginIframe.height = '0';
    loginIframe.style.border = '0';
    loginIframe.style.position = 'absolute';
    let first = document.body.firstChild;

    document.body.insertBefore(loginIframe, first);
    callback && iframeOnload(callback);
};

const iframeOnload = (callback) => {
    if (loginIframe.attachEvent) {
        loginIframe.attachEvent('onload', () => {
            callback();
        });
    } else {
        loginIframe.onload = () => {
            callback();
        };
    }
};

const LoginFrame = {
    createIframe: createIframe,
};

export default LoginFrame;
