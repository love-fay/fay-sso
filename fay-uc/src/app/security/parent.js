/**
 * Created by feichongzheng on 17/1/5.
 */
import Config from '../config.json';

const parentHref = document.referrer;
function isOrAllowed() {
    const host = parentHref.replace('http://', '').split('/')[0];
    return (Config.allowedDomain.indexOf(host) > -1 || Config.allowedDomain.indexOf('*') > -1);
}

function getHost() {
    return parentHref.split('//')[0] + '//' + parentHref.split('//')[1].split('/')[0];
}

const Parent = {
    isOrAllowed: isOrAllowed,
    getHost: getHost,
};

export default Parent;
