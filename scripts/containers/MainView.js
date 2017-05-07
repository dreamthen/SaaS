/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Link} from "react-router";
import {Button, Modal} from "antd";
import {logOutAction} from "../actions/login_action";
import localStorageObject from "../config/localStorage";
import storageData from "../config/storageData";

class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    /**
     * 组件即将卸载的时候,将localStorage里面的信息去掉
     */
    componentWillUnmount() {
        localStorageObject.removeLocalStorage(storageData);
    }

    handleCancel = (evt) => {
        this.setState({
            visible: false
        });
        evt.nativeEvent.stopImmediatePropagation();
    };

    handleOk = (evt) => {
        let logout_action = logOutAction.bind(this);
        logout_action();
        evt.nativeEvent.stopImmediatePropagation();
    };

    loginOut = (evt) => {
        this.setState({
            visible: true
        });
        evt.nativeEvent.stopImmediatePropagation();
    };

    render() {
        const {children} = this.props;
        const {visible} = this.state;
        return (
            <main className="main-container">
                {/*左边栏路由tab*/}
                <div className="main-view">
                    <div className="main-sideBar">
                        <section className="sideBar-container">
                            <ul>
                                <li>
                                    <Link
                                        to="/applicationStatus"
                                        activeClassName="main-link-active"
                                    >
                                        申请状态
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/application"
                                        activeClassName="main-link-active"
                                    >
                                        申请表
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/messageCenter"
                                        activeClassName="main-link-active"
                                    >
                                        消息中心
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/pay"
                                        activeClassName="main-link-active"
                                    >
                                        支付
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/studentInfo"
                                        activeClassName="main-link-active"
                                    >
                                        个人信息
                                    </Link>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div className="main-information">
                        <div className="login-out">
                            <Button
                                size="large"
                                type="default"
                                onClick={this.loginOut.bind(this)}
                                className="login-out-button"
                            >
                                退出
                            </Button>
                        </div>
                        {children}
                    </div>
                    <Modal title="退出"
                           visible={visible}
                           onCancel={this.handleCancel.bind(this)}
                           onOk={this.handleOk.bind(this)}>
                        <p>是否退出?</p>
                    </Modal>
                </div>
            </main>
        )
    }
}

export default MainView;