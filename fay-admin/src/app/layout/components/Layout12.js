/**
 * Created by feichongzheng on 16/12/15.
 */

import React, {Component} from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import 'FayAntd/row/style/index.js';
import 'FayAntd/col/style/index.js';

import NavTop from '../../navigation/components/NavTop';
import NavLeft from '../../navigation/components/NavLeft';
import '../style/Layout12.css';
import PropTypes from 'prop-types';

class Layout12 extends Component {

    constructor (props) {
        super(props);
        this.state = {
            style: {
                marginLeft: 0,
            },
        };
    }

    changeNavTopCurrent = (path) => {
        this.navTop.setState({
            current: path,
        });
    };

    changeNavLeftCurrent = (path) => {
        this.navLeft.setState({
            current: path,
        });
    };

    changeContentStyle = (marginLeft) => {
        if (this.state.style.marginLeft !== marginLeft) {
            this.setState({
                style: {
                    marginLeft: marginLeft,
                },
            });
        }
    };

    render () {
        const history = this.props.history;
        const location = this.props.location;
        return (
            <div>
                <div id='navTop'>
                    <NavTop history={history} location={location} ref={(ref) => this.navTop = ref} changeNavLeftCurrent={this.changeNavLeftCurrent}/>
                </div>
                <div id="navLeft">
                    <NavLeft history={history} location={location} ref={(ref) => this.navLeft = ref}
                             changeNavTopCurrent={this.changeNavTopCurrent} changeContentStyle={this.changeContentStyle}/>
                </div>
                <Row>
                    <Col id="fayContent" style={this.state.style}>
                            {this.props.children}
                    </Col>
                </Row>
            </div>
        );
    }
}

Layout12.propTypes = {
    history: PropTypes.object,
    location: PropTypes.any,
    children: PropTypes.any,
    loading: PropTypes.string,
};

export default Layout12;
