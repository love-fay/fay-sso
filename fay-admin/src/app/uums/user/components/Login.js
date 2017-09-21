/**
 * Created by feichongzheng on 16/12/20.
 */
import React, {Component} from 'react';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import 'FayAntd/card/style/index.js';
import 'FayAntd/form/style/index.js';
import 'FayAntd/input/style/index.js';
import 'FayAntd/button/style/index.js';
import 'FayAntd/checkbox/style/index.js';
const FormItem = Form.Item;
import style from '../style/login.css';
import Params from '../../../../lib/query/params';
import PropTypes from 'prop-types';
import Spin from 'antd/lib/spin';
import Alert from 'antd/lib/alert';
import 'FayAntd/spin/style/index.js';
import 'FayAntd/alert/style/index.js';

class LoginForm extends Component {

    static propTypes = {
        location: PropTypes.any,
        history: PropTypes.any,
        form: PropTypes.object,
    };

    constructor (props) {
        super(props);
        this.state = {
            loading: false,
            message: '',
            messageType: '',
            showMessage: 'none',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({showMessage: 'none', message: '', messageType: ''});
        const { location, history } = this.props;
        let nextPathname = '';
        let returnPath = Params.getQueryString('returnPath');
        if (location.state && location.state.nextPathname) {
            if (location.state.nextPathname !== '/') {nextPathname += '/' + location.state.nextPathname;}
        } else if (returnPath) {
            nextPathname += returnPath;
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (typeof (FayUc) === 'object') {
                    this.setState({loading: true});
                    FayUc.login(
                        {username: values.userName, password: values.password, remember: values.remember},
                        history, nextPathname, values.remember, (loginMessage) => {
                            if(loginMessage && loginMessage.err){
                                this.setState({showMessage: 'block', message: loginMessage.err, messageType: 'error', loading: false});
                            }
                        }
                    );
                }
            }
        });
    };

    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={style.root}>
                <Spin spinning={this.state.loading}>
                    <Card title="SIMBA系统管理平台" className={style.card}>
                        <div className={style.customImage}>
                            <img width="150px" src="assets/images/logo/150x150.png" />
                        </div>
                        <Form onSubmit={this.handleSubmit} className={style.loginForm}>
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [
                                        { required: true, message: '请输入您的用户名!' },
                                        {/* { required: true, pattern: /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/, message: '由数字、字母或下划线组成，必须是6到16位且以字母为首!' }*/},
                                    ],
                                })(
                                    <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [
                                        { required: true, message: '请输入您的密码!' },
                                    ],
                                })(
                                    <Input autoComplete="off" autoFocus addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Alert style={{display: this.state.showMessage}} message={this.state.message} type={this.state.messageType} showIcon/>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: false,
                                })(
                                    <Checkbox>记住我</Checkbox>
                                )}
                                {/* <a className={style.loginFormForgot}>忘记密码</a>*/}
                                <Button type="primary" htmlType="submit" className={style.loginFormButton}>
                                    登录
                                </Button>
                                {/* 或者 <a>立即注册!</a>*/}
                            </FormItem>
                        </Form>
                    </Card>
                </Spin>
            </div>
        );
    }
}

const Login = Form.create()(LoginForm);

export default Login;

