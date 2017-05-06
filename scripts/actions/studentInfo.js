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
        async: true
    }).done(function (response, status) {
        if (response.head.code === Success.STUDENT_SUCCESS_CODE) {
            alert("保存成功");
            let student_info = getInformation.bind(this);
            student_info(id);
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
        if (response.head.code === Success.STUDENT_SUCCESS_CODE) {
            alert("修改密码成功");
        }
        this.setState({
            visible: false
        });
    }.bind(this));
}

