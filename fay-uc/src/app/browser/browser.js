/**
 * Created by feichongzheng on 17/1/3.
 */
const getBrowser = function () {
    const ua = window.navigator.userAgent;
    let isIE = window.ActiveXObject != undefined && ua.indexOf('MSIE') != -1;
    let isFirefox = ua.indexOf('Firefox') != -1;
    let isOpera = window.opr != undefined;
    let isChrome = ua.indexOf('Chrome') && window.chrome;
    let isSafari = ua.indexOf('Safari') != -1 && ua.indexOf('Version') != -1;
    if (isIE) {
        return 'IE';
    } else if (isFirefox) {
        return 'Firefox';
    } else if (isOpera) {
        return 'Opera';
    } else if (isChrome) {
        return 'Chrome';
    } else if (isSafari) {
        return 'Safari';
    } else {
        return 'Unkown';
    }
};

const Browser = {
    getBrowser: getBrowser,
};

export default Browser;
