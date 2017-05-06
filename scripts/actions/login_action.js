/**
 * Created by yinwk on 2017/5/6.
 */
// import axios from "axios";
import $ from "jquery";
import api from "../config/api";
import Success from "../prompt/success_prompt";
/**
 * 登录功能post ajax请求
 * @param account
 * @param password
 */
export function loginAction(account, password) {
    $.ajax({
        type: "post",
        dataType: "json",
        url: api.LOGIN_ACTION,
        data: JSON.stringify({
            account,
            password
        }),
        async: true,
        contentType: "application/json"
    }).done(function (response, status) {
        let message = response.head.message,
            code = response.head.code;
        if (code === Success.LOGIN_SUCCESS_CODE) {
            let id = response.body.id,
                email = response.body.email,
                sex = response.body.sex,
                phone = response.body.phone,
                body = response.body;
            this.setState({
                isError: false,
                isWarn: false,
                isSuccess: true,
                successPrompt: Success.LOGIN_SUCCESS_MESSAGE
            });
            if(id || email || sex || phone) {
                localStorage.setItem("userInfo", JSON.stringify(body));
                localStorage.setItem("account", JSON.stringify({account}));
                localStorage.setItem("password", JSON.stringify({password}));
            }
            window.location = "./app.html";
        } else {
            this.setState({
                isError: false,
                isSuccess: false,
                isWarn: true,
                warnPrompt: message
            })
        }
    }.bind(this));
}

/**
 * 注册功能post ajax请求
 * @param account
 * @param password
 */
export function registerAction(account, password) {
    $.ajax({
        type: "post",
        dataType: "json",
        url: api.REGISTER_ACTION,
        data: JSON.stringify({
            account,
            password
        }),
        async: true,
        contentType: "application/json"
    }).done(function (response, status) {
        let message = response.head.message,
            code = response.head.code;
        if (code === Success.REGISTER_SUCCESS_CODE) {
            this.setState({
                isError: false,
                isWarn: false,
                isSuccess: true,
                successPrompt: Success.REGISTER_SUCCESS_MESSAGE,
                whetherNext: false,
                accountClassName: "input-account-container SaaS-leave",
                passwordClassName: "input-password-container SaaS-enter"
            });
            //FIXME 这里需要设置一个时间控制器，需要使用setTimeout
            let timer = setTimeout(function timerControl() {
                this.setState({
                    account: "",
                    password: "",
                    isSuccess: false,
                    loginActionLeft: 0,
                    registerActionLeft: "100%"
                }, () => {
                    clearTimeout(timer);
                });
            }.bind(this), 1500);
        } else {
            this.setState({
                isError: false,
                isSuccess: false,
                isWarn: true,
                warnPrompt: message
            })
        }
    }.bind(this));
}