/**
 * Created by yinwk on 2017/5/5.
 */
import React from "react";
import {Input, Button} from "antd";

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //判断用户名和密码消失动画的时间
            whetherNext: false,
            //用户名
            account: "",
            //填写用户名区域className,SaaS-enter SaaS-enter-active是指动画已经加载到opacity:1
            accountClassName: "input-account-container SaaS-leave",
            //密码
            password: "",
            //填写密码区域className,SaaS-leave是指动画即将执行加载离开
            passwordClassName: "input-password-container SaaS-enter"
        }
    }

    onCheck() {
        const {account, password} = this.state;
        if (account === "") {
            return false;
        }
        if (account.length > 15) {
            return false;
        }
        if (password === "") {
            return false;
        }
        if (password.length > 15) {
            return false;
        }
        return true;
    }

    /**
     * 登录页面点击下一步
     * @param evt
     */
    nextStep = (evt) => {
        let checked = this.onCheck();
        if(checked){
            this.setState({
                accountClassName: "input-account-container SaaS-leave SaaS-leave-active",
                passwordClassName: "input-password-container SaaS-enter SaaS-enter-active"
            }, () => {
                // FIXME 这里需要等待transition过渡动画渲染完之后，再去执行display:none和block的操作
                setTimeout(() => {
                    this.setState({
                        whetherNext: true
                    });
                }, 500);
            });
        }
        evt.nativeEvent.stopPropagation();
    };

    /**
     * 登录页面点击返回
     * @param evt
     */
    backStep = (evt) => {
        this.setState({
            accountClassName: "input-account-container SaaS-leave",
            passwordClassName: "input-password-container SaaS-enter"
        }, () => {
            // FIXME 这里需要等待transition过渡动画渲染完之后，再去执行display:none和block的操作
            setTimeout(() => {
                this.setState({
                    whetherNext: false
                });
            }, 500);
        });
        evt.nativeEvent.stopPropagation();
    };

    /**
     * account用户名输入区域
     * @returns {XML}
     */
    account() {
        const {
            accountClassName,
            account
        } = this.state;
        return (
            <div className={accountClassName}>
                <Input
                    type="text"
                    className="login-input-account"
                    value={account}
                    placeholder="用户名"
                    size="large"
                    maxLength="15"
                    onChange={this.changeAccount.bind(this)}
                />
                <Button
                    type="primary"
                    size="large"
                    className="login-button-next"
                    onClick={this.nextStep.bind(this)}
                >
                    下一步
                </Button>
            </div>
        )
    }

    /**
     * 用户名输入框内容发生改变时，调用的方法
     * @param evt
     */
    changeAccount = (evt) => {
        this.setState({
            account: evt.target.value
        });
    };

    /**
     * password密码输入区域
     * @returns {XML}
     */
    password() {
        const {
            passwordClassName,
            password
        } = this.state;
        return (
            <div className={passwordClassName}>
                <Input
                    type="password"
                    className="login-input-password"
                    value={password}
                    placeholder="密码"
                    size="large"
                    maxLength="15"
                    onChange={this.changePassword.bind(this)}
                />
                <Button
                    type="primary"
                    size="large"
                    className="login-button-action"
                >
                    登录
                </Button>
                <Button
                    type="default"
                    size="large"
                    className="login-button-back"
                    onClick={this.backStep.bind(this)}
                >
                    返回
                </Button>
            </div>
        )
    }

    /**
     * 密码输入框内容发生改变时，调用的方法
     * @param evt
     */
    changePassword = (evt) => {
        this.setState({
            password: evt.target.value
        });
    };

    render() {
        const {
            whetherNext
        } = this.state;
        return (
            <main className="main-container">
                <section className="login-section">
                    <div className="container-shadow">
                    </div>
                    <div className="login-container">
                        <h1 className="login-title">登录</h1>
                        <span className="login-spin">Login</span>
                        <p></p>
                        {
                            !whetherNext ? this.account() : this.password()
                        }
                    </div>
                </section>
                <section className="register-section">
                    <div className="container-shadow">
                    </div>
                </section>
            </main>
        )
    }
}

export default LoginView;