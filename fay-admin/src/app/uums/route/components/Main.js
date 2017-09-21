/**
 * Created by feichongzheng on 16/12/18.
 */
import React, {Component} from 'react';
import Bundle from '../../../bundle/components/Bundle';
import loadE404 from 'bundle-loader?lazy&name=[E401D3]!../../../error/components/E404';

const E404 = (props) => (
    <Bundle load={loadE404}>
        {(E404) => {
            return <E404 {...props}/>;
        }}
    </Bundle>
);

export default class Main extends Component {

    constructor (props) {
        super(props);
        this.state = {
            component: <div>正在申请组件</div>,
        };
        this.uumsRoute(this.props);
    }

    componentWillReceiveProps (nextProps) {
        if (this.props !== nextProps) {
            this.uumsRoute(nextProps);
        }
    }

    uumsRoute = (props) => {
        const {pathname} = props.location;
        switch (pathname) {
            default :
                this.setState({component: <E404 {...props}/>});
        }
    };

    render () {
        return this.state.component;
    }
}
