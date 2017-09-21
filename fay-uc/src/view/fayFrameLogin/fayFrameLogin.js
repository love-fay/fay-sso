/**
 * Created by feichongzheng on 17/1/3.
 */
import Parent from '../../app/security/parent';
import UserMessage from '../../app/postMessage/userMessage';

window.onload = function(){
    if (Parent.isOrAllowed()) {
        UserMessage.postUserMessageToParent();
    }
};
