/**
 * Created by feichongzheng on 16/12/15.
 */
import React, {Component} from 'react';
import cookie from 'react-cookie';
import Menu from 'antd/lib/menu';
import 'FayAntd/menu/style/index.js';
import style from '../style/navTop.css';
import PropTypes from 'prop-types';
import config from '../../config/config';

export default class NavTop extends Component {

    static propTypes = {
        location: PropTypes.any,
        history: PropTypes.object,
        changeNavLeftCurrent: PropTypes.func,
    };

    constructor (props) {
        super(props);
        const location = this.props.location;
        let pathname = location.pathname;
        pathname = pathname.indexOf('/') === 0 ? pathname : '/' + pathname;
        this.state = {
            current: pathname,
            user: this.getUser(),
        };
    }

    handleClick = (e) => {
        let key = e.key;
        if (key !== undefined) {
            if (key.indexOf('/prevent') !== 0) {
                this.setState({
                    current: key,
                });
                this.props.changeNavLeftCurrent(key);
                const history = this.props.history;
                history.push(key, null);
            }
        }
    };

    changePath = (e, path) => {
        e.stopPropagation();
        const history = this.props.history;
        this.setState({
            current: path,
        });
        history.push(path + '?returnPath=' + window.location.pathname, null);
    };

    getUser = () => {
        let user = cookie.load('current-user');
        if (typeof (user) === 'object') {
            return user;
        } else {
            return null;
        }
    };

    logout (e) {
        e.stopPropagation();
        FayUc.logout(() => {
            const history = this.props.history;
            history.push('/login', null);
        });
    }

    render () {
        const user = this.state.user;
        return (
            <Menu onClick={this.handleClick}
                  selectedKeys={[this.state.current]}
                  mode="horizontal"
                  className={style.menu}
                  id="nav-top-menu"
            >
                <Menu.Item key="/">
                    <div className={style.log + ' waves-effect'}>
                        <img width="30px" src="assets/images/logo/80x80.png" className={style.logImg} />
                        {config.projectName}
                    </div>
                </Menu.Item>
                {user ?
                    [
                        <Menu.Item key="/prevent1" style={{float: 'right', marginRight: '50px'}}>
                            <div className={style.register + ' waves-effect'} onClick={(e) => {this.logout(e);}}>退出</div>
                        </Menu.Item>,
                        <Menu.Item key="/prevent2" style={{float: 'right'}}>
                            <div className={style.userInfo + ' waves-effect'}>{user.username}</div>
                        </Menu.Item>
                    ] :
                    <Menu.Item key="/prevent3" style={{float: 'right', marginRight: '50px'}}>
                        <div className={style.login + ' waves-effect'} onClick={(e) => {this.changePath(e, '/login');}}>登录</div>
                    </Menu.Item>
                }
            </Menu>
        );
    }
}
