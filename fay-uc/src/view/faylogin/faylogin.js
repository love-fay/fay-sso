/**
 * Created by feichongzheng on 17/1/3.
 */
import Params from '../../lib/query/params';
import Parent from '../../app/security/parent';
import Cookie from '../../app/cookie/cookie';

const remember = Params.getQueryString('remember');
const replaceHref = Params.getQueryString('replaceHref');
const replaceHost = replaceHref.replace('http://', '').split('/')[0];

let loginIframe = document.createElement('iframe');
loginIframe.src = 'http://' + replaceHost + '/faylogin.html';
loginIframe.width = '0';
loginIframe.height = '0';
loginIframe.style.border = '0';

if (Parent.isOrAllowed) {
    Cookie.changeCookieFromEventListener(() => {
        window.location.replace(replaceHref);
    }, remember);
    document.body.appendChild(loginIframe);
}
