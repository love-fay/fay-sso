/**
 * Created by feichongzheng on 16/12/15.
 */
import React, {Component} from 'react';
import Menu from 'antd/lib/menu';
import 'FayAntd/menu/style/index.js';
import 'FayAntd/icon/style/index.js';
import PropTypes from 'prop-types';

let pathname;

class NavLeft extends Component {

    constructor (props) {
        super(props);
        const location = this.props.location;
        pathname = location.pathname;
        pathname = pathname.indexOf('/') === 0 ? pathname : '/' + pathname;
        this.state = {
            current: pathname,
            openKeys: null,
            html: [],
        };
    }

    handleClick = (e) => {
        const history = this.props.history;
        let key = e.key;
        if (key !== undefined) {
            this.setState({
                current: key,
            });
            this.props.changeNavTopCurrent(key);
            history.push(key, null);
        }
    };

    render () {
        let html;
        if (this.state.html.length === 0) {
            html = <div>{this.state.html}</div>;
        } else {
            html = <Menu onClick={this.handleClick}
                     style={{ width: 150 }}
                     defaultOpenKeys={this.state.openKeys}
                     selectedKeys={[this.state.current]}
                     mode="inline"
                     id="nav-left-menu">
                     {this.state.html}
            </Menu>;
        }
        return (
            <div>{html}</div>
        );
    }
}

NavLeft.propTypes = {
    location: PropTypes.any,
    history: PropTypes.object,
    changeNavTopCurrent: PropTypes.func,
    changeContentStyle: PropTypes.func,
};


export default NavLeft;
