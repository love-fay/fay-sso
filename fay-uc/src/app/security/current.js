/**
 * Created by feichongzheng on 17/1/5.
 */
import Config from '../config.json';

const currentHref = document.domain;
function isOrAllowed() {
    const host = currentHref.replace('http://', '').split('/')[0];
    return (Config.allowedDomain.indexOf(host) > -1 || Config.allowedDomain.indexOf('*') > -1);
}

const Current = {
    isOrAllowed: isOrAllowed,
};

export default Current;
