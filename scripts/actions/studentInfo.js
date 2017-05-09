/**
 * Created by yinwk on 2017/5/6.
 */
import $ from "jquery";
import api from "../config/api";
import Success from "../prompt/success_prompt";
export function getInformation(id) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: api.GET_STUDENT_INFORMATION + "/" + id
    }).done(function (response, status) {
        if (response.head.code === Success.STUDENT_SUCCESS_CODE) {
            let body = response.body,
                id = body.id,
                sex = body.sex,
                email = body.email,
                phone = body.phone,
                visaStatus = body.visaStatus,
                postalAddress = body.postalAddress;
            if (id && sex && (email !== null) && (visaStatus !== null) && (postalAddress !== null)) {
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

export function saveInformation(id, sex, email, phone, visaStatus, postalAddress) {
    $.ajax({
        type: "post",
        dataType: "json",
        contentType: "application/json",
        url: api.SAVE_STUDENT_INFORMATION,
        data: JSON.stringify({
            id,
            sex,
            email,
            phone,
            visaStatus,
            postalAddress
        }),
        async: true
    }).done(function (response, status) {
        let message = response.head.message,
            code = response.head.code;
        if (code === Success.STUDENT_SUCCESS_CODE) {
            this.setState({
                isError: false,
                isWarn: false,
                isSuccess: true,
                successPrompt: "保存成功"
            }, () => {
                setTimeout(function timer() {
                    this.setState({
                        isError: false,
                        isWarn: false,
                        isSuccess: false
                    })
                }.bind(this), 1000);
            });
        } else {
            this.setState({
                isError: false,
                isWarn: true,
                isSuccess: false,
                warnPrompt: message
            });
        }
    }.bind(this));
}

export function changePassword(olderPassword, newPassword) {
    $.ajax({
        type: "put",
        dataType: "json",
        contentType: "application/json",
        url: api.CHANGE_PASSWORD,
        data: JSON.stringify({
            oldPassword: olderPassword,
            newPassword: newPassword
        }),
        async: true
    }).done(function (response, status) {
        let message = response.head.message,
            code = response.head.code;
        if (code === Success.STUDENT_SUCCESS_CODE) {
            this.setState({
                isPasswordError: false,
                isPasswordWarn: false,
                isPasswordSuccess: true,
                successPasswordPrompt: "修改密码成功"
            }, () => {
                setTimeout(function timer() {
                    this.setState({
                        visible: false,
                        isPasswordError: false,
                        isPasswordWarn: false,
                        isPasswordSuccess: false
                    });
                }.bind(this), 1000);
            });
        } else {
            this.setState({
                isPasswordError: false,
                isPasswordWarn: true,
                isPasswordSuccess: false,
                warnPasswordPrompt: message
            });
        }
    }.bind(this));
}

