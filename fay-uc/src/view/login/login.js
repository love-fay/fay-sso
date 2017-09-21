/**
 * Created by feichongzheng on 17/1/3.
 */
import Parent from '../../app/security/parent';
import CookieForIframe from '../../app/cookie/cookieForIframe';
import UserMessage from '../../app/postMessage/userMessage';

window.onload = function () {
    if (Parent.isOrAllowed()) {
        CookieForIframe.changeCookieFromEventListenerForIframe();
        UserMessage.postUserMessageToParent();
    }
};
