/**
 * Created by yinwk on 2017/5/6.
 */
import $ from "jquery";
import api from "../config/api";
import Success from "../prompt/success_prompt";
import {message} from "antd";
import requestError from "../config/requestError";
/**
 * 获取学生信息
 * @param id
 */
export function getInformation(id) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: api.GET_STUDENT_INFORMATION + "/" + id,
        async: true,
        error: function (request, status, ThrowError) {
            let codeStatus = request.status;
            requestError.error(codeStatus, ThrowError);
        }
    }).done(function (response, status) {
        if (response.head.code === Success.STUDENT_SUCCESS_CODE) {
            let body = response.body,
                id = body.id,
                sex = body.sex,
                email = body.email,
                phone = body.phone,
                visaStatus = body.visaStatus,
                postalAddress = body.postalAddress;
            //判断在有id、sex(性别)不为null、phone(电话号码)不为null、email(邮箱)不为null、visaStatus(签证状态)不为null、postalAddress(邮件地址)不为null的情况下,进行setState改变状态
            if (id && sex && (phone !== null) && (email !== null) && (visaStatus !== null) && (postalAddress !== null)) {
                this.setState({
                    id,
                    sex,
                    phone,
                    email,
                    visaStatus: visaStatus.toString(),
                    postalAddress
                });
            }
        }
    }.bind(this));
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
    $.ajax({
        type: "put",
        dataType: "json",
        contentType: "application/json",
        url: api.SAVE_STUDENT_INFORMATION + "/" + id,
        data: JSON.stringify({
            sex,
            email,
            phone,
            visaStatus,
            postalAddress
        }),
        async: true,
        error: function (request, status, ThrowError) {
            let codeStatus = request.status;
            requestError.error(codeStatus, ThrowError);
        }
    }).done(function (response, status) {
        let message = response.head.message,
            code = response.head.code;
        if (code === Success.STUDENT_SUCCESS_CODE) {
            this.setPromptTrueOrFalse(false, false, true);
            this.setState({
                successPrompt: Success.SAVE_STUDENT_INFORMATION_SUCCESS
            }, () => {
                //FIXME 这里设置一个时间控制器,在1s中之后错误、警告或者成功提示框消失
                setTimeout(function timer() {
                    this.setPromptTrueOrFalse(false, false, false);
                }.bind(this), 1000);
            });
        } else {
            this.setPromptTrueOrFalse(false, true, false);
            this.setState({
                warnPrompt: message
            });
        }
    }.bind(this));
}

/**
 * 修改密码
 * @param olderPassword
 * @param newPassword
 */
export function changePasswordRecently(olderPassword, newPassword) {
    $.ajax({
        type: "put",
        dataType: "json",
        contentType: "application/json",
        url: api.CHANGE_PASSWORD,
        data: JSON.stringify({
            oldPassword: olderPassword,
            newPassword: newPassword
        }),
        async: true,
        error: function (request, status, ThrowError) {
            let codeStatus = request.status;
            requestError.error(codeStatus, ThrowError);
        }
    }).done(function (response, status) {
        let message = response.head.message,
            code = response.head.code;
        if (code === Success.STUDENT_SUCCESS_CODE) {
            this.setPasswordPromptTrueOrFalse(false, false, true);
            this.setState({
                successPasswordPrompt: Success.CHANGE_STUDENT_PASSWORD_SUCCESS
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
                warnPasswordPrompt: message
            });
        }
    }.bind(this));
}

/**
 * 激活邮箱
 * @param id
 * @param email
 */
export function setVerifyRecently(id, email) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: api.SET_VERIFY + "/" + id + "/emails",
        data: {
            email
        },
        async: true,
        error: function (request, status, ThrowError) {
            let codeStatus = request.status;
            requestError.error(codeStatus, ThrowError);
        }
    }).done(function (response, status) {
        let msg = response.head.message,
            code = response.head.code;
        if (code === Success.STUDENT_SUCCESS_CODE) {
            message.success(Success.EMAIL_VERIFY_SUCCESS);
        } else {
            message.warning(msg);
        }
    }.bind(this));
}


