/**
 * Created by feichongzheng on 17/1/4.
 */

const addEvent = (obj, type, handle) => {
    try {
        obj.addEventListener(type, handle, false);
    } catch (e) {
        try {
            obj.attachEvent('on' + type, handle);
        } catch (e) {
            obj['on' + type] = handle;
        }
    }
};

const Listener = {
    addEvent: addEvent,
};

export default Listener;
