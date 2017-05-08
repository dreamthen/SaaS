/**
 * Created by yinwk on 2017/5/6.
 */
import $ from "jquery";
import api from "../config/api";
import Success from "../prompt/success_prompt";
import localStorageObject from "../config/localStorage";
import storageData from "../config/storageData";

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
            code = response.head.code,
            localStorageArray = [];
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
            localStorageArray.push(pushIntoLocalStorage("userInfo", body));
            localStorageArray.push(pushIntoLocalStorage("account", {account}));
            localStorageArray.push(pushIntoLocalStorage("password", {password}));
            if (id || email || sex || phone) {
                //向localStorage中设置登录成功后的学生数据信息
                localStorageObject.setLocalStorage(localStorageArray);
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
 * 向localStorage数组中push key属性和值以及value属性和值
 * @param key
 * @param value
 * @returns {{key: *, value}}
 */
function pushIntoLocalStorage(key, value) {
    return {
        key,
        value: JSON.stringify(value)
    }
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

/**
 * 退出功能get ajax请求
 */
export function logOutAction() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: api.LOGOUT_ACTION,
        async: true
    }).done(function (response, status) {
        //删除localStorage中的学生数据信息
        localStorageObject.removeLocalStorage(storageData);
        window.location = "./login.html";
    }.bind(this));
}