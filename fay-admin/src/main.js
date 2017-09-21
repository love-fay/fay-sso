/**
 * Created by feichongzheng on 16/12/7.
 */
require('../../fay-uc/src/lib/fayUc/fayUc.js');
import React from 'react';
import {render} from 'react-dom';
import Main from './app/route/Main';

if (typeof (FayUc) === 'object') {
    FayUc.init(() => {
        main();
    });
} else {
    main();
}


/**
 * 应用页面加载
 * @returns {void}
 */
function main () {
    render(<Main/>, document.getElementById('app'));
}
