/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Link} from "react-router";
import {Button, Modal} from "antd";
import {logOutAction} from "../actions/login_action";
import localStorageObject from "../config/localStorage";
import storageData from "../config/storageData";
import setLink from "../config/link";

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
        //删除localStorage中的学生数据信息
        localStorageObject.removeLocalStorage(storageData);
    }

    handleCancel = (evt) => {
        this.setState({
            visible: false
        });
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 集成路由节点组件
     */
    setLink() {
        return setLink.map((linkItem, linkIndex) => {
            return (
                <li key={linkIndex}>
                    <Link
                        to={"/" + linkItem.link}
                        activeClassName="main-link-active"
                    >
                        {linkItem.value}
                    </Link>
                </li>
            )
        });
    }

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
                                {this.setLink()}
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