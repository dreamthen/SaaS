/**
 * Created by yinwk on 2017/5/5.
 */
import React from "react";
import {Input, Button, Alert} from "antd";
import {loginAction, registerAction} from "../actions/login_action";
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
            isError: false,
            //警告提示语
            warnPrompt: "",
            //判断是否校验出现警告,进行提示框显示
            isWarn: false,
            //成功提示语
            successPrompt: "",
            //判断请求成功,进行提示框显示
            isSuccess: false,
            //登录区域离顶部高度
            loginActionTop: 0,
            //登录区域离左边距离
            loginActionLeft: 0,
            //注册区域离顶部高度
            registerActionTop: "-100%",
            //注册区域离左边距离
            registerActionLeft: "100%"
        }
    }

    componentWillMount() {
        //组件开始装载时,初始化提示语和输入框
        this.initState();
    }

    /**
     * 集成错误提示状态
     */
    showErrorPrompt(prompt) {
        this.setState({
            isError: true,
            errorPrompt: prompt
        });
    }

    setPromptTrueOrFalse(isError, isWarn, isSuccess) {
        this.setState({
            isError,
            isWarn,
            isSuccess
        });
    }

    /**
     * 初始化提示语和输入框
     */
    initState() {
        this.setPromptTrueOrFalse(false, false, false);
        this.setState({
            account: "",
            password: ""
        })
    }

    /**
     * 校验用户名(空值和长度)
     * @returns {boolean}
     */
    onCheckAccount() {
        const {account} = this.state;
        if (account === "") {
            this.showErrorPrompt(Error.NULL_ACCOUNT_VALUE);
            return false;
        }
        if (account.length > 15) {
            this.showErrorPrompt(Error.EXCESS_ACCOUNT_LENGTH);
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
            this.showErrorPrompt(Error.NULL_PASSWORD_VALUE);
            return false;
        }
        if (password.length !== 6) {
            this.showErrorPrompt(Error.EXCESS_PASSWORD_LENGTH);
            return false;
        }
        return true;
    }

    /**
     * 提示语
     * @returns {boolean|*|XML}
     */
    alert() {
        const {errorPrompt, isError, warnPrompt, isWarn, successPrompt, isSuccess} = this.state;
        //如果输入不符合校验,显示错误提示框
        if (isError) {
            return (<Alert className="action-alert" type="error" message={errorPrompt} showIcon/>);
        }
        //如果请求出现问题,显示异常提示框
        if (isWarn) {
            return (<Alert className="action-alert" type="warning" message={warnPrompt} showIcon/>);
        }
        //如果请求成功,显示成功提示框
        if (isSuccess) {
            return (<Alert className="action-alert" type="success" message={successPrompt} showIcon/>)
        }
    }

    /**
     * 登录页面点击下一步
     * @param evt
     */
    nextStep = (evt) => {
        let checked = this.onCheckAccount();
        if (checked) {
            this.setPromptTrueOrFalse(false, false, false);
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
        //取消冒泡
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 登录页面点击返回
     * @param evt
     */
    backStep = (evt) => {
        this.initState();
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
        //取消冒泡
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 登录页面进行登录
     * @param evt
     */
    loginActionStatus = (evt) => {
        const checked = this.onCheckPassword();
        const {account, password} = this.state;
        if (checked) {
            //发出登录ajax请求
            let action_login = loginAction.bind(this);
            action_login(account, password);
        }
        //取消冒泡
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 注册页面注册
     * @param evt
     */
    registerActionStatus = (evt) => {
        const accountChecked = this.onCheckAccount();
        const {account, password} = this.state;
        if (accountChecked) {
            const passwordChecked = this.onCheckPassword();
            if (passwordChecked) {
                //发出登录ajax请求
                let action_register = registerAction.bind(this);
                action_register(account, password);
            }
        }
        //取消冒泡
        evt.nativeEvent.stopImmediatePropagation();
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
                    placeholder="密码(只允许输入6位)"
                    size="large"
                    maxLength="6"
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
     * 注册页面输入区域
     * @returns {XML}
     */
    register() {
        const {account, password} = this.state;
        return (
            <div className="register-input-container">
                <Input
                    type="text"
                    className="register-input-account"
                    value={account}
                    placeholder="用户名"
                    size="large"
                    maxLength="15"
                    onChange={this.changeAccount.bind(this)}
                />
                <Input
                    type="password"
                    className="register-input-password"
                    value={password}
                    placeholder="密码(只允许输入6位)"
                    size="large"
                    maxLength="6"
                    onChange={this.changePassword.bind(this)}
                />
                <Button
                    type="primary"
                    size="large"
                    className="register-button-action"
                    onClick={this.registerActionStatus.bind(this)}
                >
                    注册
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

    /**
     * 过渡动画到注册页面
     * @param evt
     */
    toRegister = (evt) => {
        this.initState();
        this.setState({
            loginActionLeft: "-100%"
        }, () => {
            this.setState({
                registerActionLeft: 0
            })
        });
        evt.nativeEvent.stopPropagation();
    };

    /**
     * 过渡动画到登录页面
     * @param evt
     */
    toLogin = (evt) => {
        this.initState();
        this.setState({
            loginActionLeft: "0",
            accountClassName: "input-account-container SaaS-leave",
            passwordClassName: "input-password-container SaaS-enter"
        }, () => {
            this.setState({
                registerActionLeft: "100%",
                whetherNext: false
            })
        });
        evt.nativeEvent.stopPropagation();
    };

    render() {
        const {
            whetherNext,
            loginActionTop,
            loginActionLeft,
            registerActionTop,
            registerActionLeft
        } = this.state;
        return (
            <main className="main-container">
                <section className="login-section" style={{top: loginActionTop, left: loginActionLeft}}>
                    <div className="container-shadow">
                    </div>
                    <div className="login-nav">
                        <nav className="nav-container">
                            <Button type="default"
                                    className="nav-button"
                                    onClick={this.toRegister.bind(this)}
                            >
                                注册
                            </Button>
                        </nav>
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
                <section className="register-section" style={{top: registerActionTop, left: registerActionLeft}}>
                    <div className="container-shadow">
                    </div>
                    <div className="register-nav">
                        <nav className="nav-container">
                            <Button type="default"
                                    className="nav-button"
                                    onClick={this.toLogin.bind(this)}
                            >
                                登录
                            </Button>
                        </nav>
                    </div>
                    <div className="register-container">
                        <h1 className="register-title">注册</h1>
                        <span className="register-spin">Register</span>
                        <p></p>
                        {this.alert()}
                        {this.register()}
                    </div>
                </section>
            </main>
        )
    }
}

export default LoginView;