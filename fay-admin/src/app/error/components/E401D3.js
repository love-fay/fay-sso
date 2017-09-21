/**
 * Created by feichongzheng on 17/6/9.
 */
import React, {Component} from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import 'FayAntd/row/style/index.js';
import 'FayAntd/col/style/index.js';
import {Link} from 'react-router-dom';

class E401D3 extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Row style={{textAlign: 'center', marginTop: '100px'}}>
                <Col span={5}> </Col>
                <Col span={14}>
                    <div style={{fontSize: '8em'}}>4<img src="assets/images/error/giphy.jpg" width="80px" style={{border: '3px solid #000', borderRadius: '50px'}} />1</div>
                    <div style={{fontSize: '1.5em'}}>非常抱歉，您的访问受到限制！</div>
                    <div style={{fontSize: '1.5em'}}>如想要访问，请联系您的管理员！</div>
                    <div style={{fontSize: '1.5em', marginTop: '50px'}}><Link to="/">返回首页</Link></div>
                </Col>
            </Row>
        );
    }
}

export default E401D3;
