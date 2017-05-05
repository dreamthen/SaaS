/**
 * Created by yinwk on 2017/5/5.
 */
import React from "react";
import {Input, Button, Alert} from "antd";
import loginAction from "../actions/login_action";
import Error from "../prompt/error_prompt";

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
            passwordClassName: "input-password-container SaaS-enter",
            //错误提示语
            errorPrompt: "",
            //判断是否校验出现错误,进行提示框显示
            isError: false
        }
    }

    /**
     * 校验用户名(空值和长度)
     * @returns {boolean}
     */
    onCheckAccount() {
        const {account} = this.state;
        if (account === "") {
            this.setState({
                isError: true,
                errorPrompt: Error.NULL_ACCOUNT_VALUE
            });
            return false;
        }
        if (account.length > 15) {
            this.setState({
                isError: true,
                errorPrompt: Error.EXCESS_ACCOUNT_LENGTH
            });
            return false;
        }
        return true;
    }

    /**
     * 校验密码(空值和长度)
     * @returns {boolean}
     */
    onCheckPassword() {
        const {password} = this.state;
        if (password === "") {
            this.setState({
                isError: true,
                errorPrompt: Error.NULL_PASSWORD_VALUE
            });
            return false;
        }
        if (password.length > 15) {
            this.setState({
                isError: true,
                errorPrompt: Error.EXCESS_PASSWORD_LENGTH
            });
            return false;
        }
        return true;
    }

    /**
     * 提示语
     * @returns {boolean|*|XML}
     */
    alert() {
        const {errorPrompt, isError} = this.state;
        return (
            isError && <Alert className="login-alert" type="error" message={errorPrompt} showIcon/>
        )
    }

    /**
     * 登录页面点击下一步
     * @param evt
     */
    nextStep = (evt) => {
        let checked = this.onCheckAccount();
        if (checked) {
            this.setState({
                accountClassName: "input-account-container SaaS-leave SaaS-leave-active",
                passwordClassName: "input-password-container SaaS-enter SaaS-enter-active",
                isError: false
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
            passwordClassName: "input-password-container SaaS-enter",
            isError: false,
            account: "",
            password: ""
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
     * 登录页面进行登录
     * @param evt
     */
    loginActionStatus = (evt) => {
        const checked = this.onCheckPassword();
        const {account, password} = this.state;
        if (checked) {
            //发出登录axios请求
            console.log("请求.....");
            let action_login = loginAction.bind(this);
            action_login(account, password);
        }
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
                    onClick={this.loginActionStatus.bind(this)}
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
                        {this.alert()}
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