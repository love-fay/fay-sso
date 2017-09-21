/**
 * Created by feichongzheng on 17/6/9.
 */
import React, {Component} from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import 'FayAntd/row/style/index.js';
import 'FayAntd/col/style/index.js';
import cookie from 'react-cookie';

class Home extends Component {

    constructor (props) {
        super(props);
        if (!this.loggedIn()) {
            const {history} = this.props;
            history.push('/login', null);
        }
    }

    render () {
        return (
            <Row style={{textAlign: 'center'}}>
                <Col span={5}> </Col>
                <Col span={14}>
                    <img src="assets/images/logo/logo-home.png" width="500px"/>
                </Col>
            </Row>

        );
    }

    loggedIn = () => {
        let user = cookie.load('current-user');
        return typeof (user) === 'object';
    };
}

export default Home;
