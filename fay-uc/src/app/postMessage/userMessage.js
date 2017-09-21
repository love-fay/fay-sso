/**
 * Created by feichongzheng on 17/1/5.
 */
import cookie from 'react-cookie';
import Parent from '../../app/security/parent';

const postUserMessageToParent = () => {
    const host = Parent.getHost();
    const data = cookie.load('current-user');
    if (window.top !== window.self) {
        let obj = data ? {name: 'login', value: data} : {name: 'logout'};
        window.parent.postMessage(JSON.stringify(obj), host);
    }
};

const UserMessage = {
    postUserMessageToParent: postUserMessageToParent,
};

export default UserMessage;
