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
            this.setState({
                isError: false,
                isWarn: false,
                isSuccess: true,
                successPrompt: Success.LOGIN_SUCCESS_MESSAGE
            });
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
                successPrompt: Success.REGISTER_SUCCESS_MESSAGE
            });
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