/**
 * Created by yinwk on 2017/5/6.
 */
import fetchRequest from "../config/fetchRequestData";
import {URLSearchParamsConfig} from "../config/URLSearchParamsConfig";
import api from "../config/api";
import Success from "../prompt/success_prompt";
import {message} from "antd";
/**
 * 获取学生信息
 * @param id
 */
export function getInformation(id) {
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        api.GET_STUDENT_INFORMATION + "/" + id,
        "get",
        {},
        function done(response, status) {
            let body = response.body,
                code = response.head.code,
                msg = response.head.message;
            if (code === Success.STUDENT_SUCCESS_CODE) {
                let id = body.id,
                    sex = body.sex,
                    email = body.email,
                    avatar = body.avatar,
                    phone = body.phone,
                    visaStatus = body.visaStatus,
                    postalAddress = body.postalAddress;
                //判断在有id、sex(性别)不为null、phone(电话号码)不为null、email(邮箱)不为null、visaStatus(签证状态)不为null、postalAddress(邮件地址)不为null的情况下,进行setState改变状态
                if (id && sex && (phone !== null) && (email !== null) && (visaStatus !== null) && (postalAddress !== null) && (avatar !== null)) {
                    this.setState({
                        id,
                        sex,
                        avatar,
                        phone,
                        email,
                        visaStatus: visaStatus.toString(),
                        postalAddress
                    });
                }
            } else {
                message.warning(msg, 5);
            }
        }.bind(this)
    );
}

/**
 * 修改并保存学生个人信息
 * @param id
 * @param sex
 * @param email
 * @param phone
 * @param visaStatus
 * @param postalAddress
 */
export function saveInformation(id, sex, email, phone, visaStatus, postalAddress) {
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        api.SAVE_STUDENT_INFORMATION + "/" + id,
        "put",
        {
            sex,
            email,
            phone,
            visaStatus,
            postalAddress
        },
        function done(response, status) {
            let msg = response.head.message,
                code = response.head.code;
            if (code === Success.STUDENT_SUCCESS_CODE) {
                this.setPromptTrueOrFalse(false, false, true);
                this.setState({
                    successPrompt: Success.SAVE_STUDENT_INFORMATION_SUCCESS_MESSAGE
                }, () => {
                    //FIXME 这里设置一个时间控制器,在1s中之后错误、警告或者成功提示框消失
                    setTimeout(function timer() {
                        this.setPromptTrueOrFalse(false, false, false);
                    }.bind(this), 1000);
                });
            } else {
                this.setPromptTrueOrFalse(false, true, false);
                this.setState({
                    warnPrompt: msg
                });
            }
        }.bind(this)
    );
}

/**
 * 修改密码
 * @param oldPassword
 * @param newPassword
 */
export function changePasswordRecently(oldPassword, newPassword) {
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        api.CHANGE_PASSWORD,
        "put",
        {
            oldPassword,
            newPassword
        },
        function done(response, status) {
            let msg = response.head.message,
                code = response.head.code;
            if (code === Success.STUDENT_SUCCESS_CODE) {
                this.setPasswordPromptTrueOrFalse(false, false, true);
                this.setState({
                    successPasswordPrompt: Success.CHANGE_STUDENT_PASSWORD_SUCCESS_MESSAGE
                }, () => {
                    //FIXME 设置一个时间控制器,在1s中之后错误、警告或者成功提示框消失,弹出框也消失
                    setTimeout(function timer() {
                        this.setPasswordPromptTrueOrFalse(false, false, false);
                        this.setState({
                            visible: false
                        });
                    }.bind(this), 1000);
                });
            } else {
                this.setPasswordPromptTrueOrFalse(false, true, false);
                this.setState({
                    warnPasswordPrompt: msg
                });
            }
        }.bind(this)
    );
}

/**
 * 激活邮箱
 * @param id
 * @param email
 */
export function setVerifyRecently(id, email) {
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        URLSearchParamsConfig(api.SET_VERIFY + "/" + id + "/emails", {email}),
        "get",
        {},
        function done(response, status) {
            let msg = response.head.message,
                code = response.head.code;
            if (code === Success.STUDENT_SUCCESS_CODE) {
                message.success(Success.EMAIL_VERIFY_SUCCESS_MESSAGE);
                this.setPasswordPromptTrueOrFalse(false, false, false);
            } else {
                message.warning(msg, 5);
            }
        }.bind(this)
    );
}


