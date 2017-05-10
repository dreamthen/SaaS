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
            //退出弹窗,是否弹出state
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

    /**
     * 退出弹窗,按取消将弹窗消失
     * @param evt
     */
    handleCancel = (evt) => {
        this.setState({
            visible: false
        });
        //取消冒泡
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

    /**
     *  退出弹窗,按确定发出退出ajax请求
     *  @param evt
     */
    handleOk = (evt) => {
        //发出ajax退出请求
        let logout_action = logOutAction.bind(this);
        logout_action();
        //取消冒泡
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     *  按退出按钮弹出退出弹窗
     *  @param evt
     */
    loginOut = (evt) => {
        this.setState({
            visible: true
        });
        //取消冒泡
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     *  弹窗组件
     */
    renderModal() {
        const {visible} = this.state;
        return (
            <Modal title="退出"
                   visible={visible}
                   onCancel={this.handleCancel.bind(this)}
                   onOk={this.handleOk.bind(this)}>
                <p>是否退出?</p>
            </Modal>
        )
    }

    render() {
        const {children} = this.props;
        return (
            <main className="main-container">
                {/*左边栏路由tab*/}
                <div className="main-view">
                    <div className="main-logo">

                    </div>
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
                </div>
                {/*退出弹窗组件*/}
                {this.renderModal()}
            </main>
        )
    }
}

export default MainView;