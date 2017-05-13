/**
 * Created by yinwk on 2017/5/11.
 */
import $ from "jquery";
import api from "../config/api";
import Success from "../prompt/success_prompt";
/**
 * 获取申请列表
 * @param id
 * @param pageNum
 * @param pageSize
 */
export function getApplicationList(id, pageNum, pageSize) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: api.GET_APPLICATION_LIST + "/" + id,
        async: true,
        data: {
            pageNum,
            pageSize
        }
    }).done(function ajaxDone(response, status) {
        let body = response.body,
            code = response.head.code,
            msg = response.head.msg;
        if (code === Success.APPLICATION_SUCCESS_CODE) {
            this.setState({
                applicationList: body
            });
        } else {

        }
    }.bind(this));
}

/**
 * 添加申请表单
 * @param forms
 * @param id
 * @param pageNum
 * @param pageSize
 */
export function addApplicationForms(forms, id, pageNum, pageSize) {
    $.ajax({
        url: api.ADD_APPLICATION_FORMS,
        type: "post",
        dataType: "json",
        async: true,
        contentType: "application/json",
        data: JSON.stringify(forms)
    }).done(function ajaxDone(response, status) {
        let body = response.body,
            code = response.head.code,
            message = response.head.message;
        if (code === Success.APPLICATION_SUCCESS_CODE) {
            this.initApplication();
            this.setState({
                visible: false
            });
            //发出获取申请单列表ajax请求
            let application_action = getApplicationList.bind(this);
            application_action(id, pageNum, pageSize);
        } else {
            this.setPromptTrueOrFalse(false, true, false);
            this.setState({
                warnPrompt: message
            });
        }
    }.bind(this));
}

/**
 * 获取申请表单
 */
export function getApplicationForms(id) {
    $.ajax({
        url: api.GET_APPLICATION_FORMS + "/" + id,
        type: "get",
        dataType: "json",
        async: true
    }).done(function ajaxDone(response, status) {
        let body = response.body,
            code = response.head.code,
            message = response.head.message;
        if (code === Success.APPLICATION_SUCCESS_CODE) {
            this.props.getApplicationFormsAlready(body);
        } else {

        }
    }.bind(this));
}

/**
 * 修改申请表单
 */
export function changeApplicationForms(forms, id) {
    $.ajax({
        url: api.CHANGE_APPLICATION_FORMS + "/" + id,
        type: "put",
        dataType: "json",
        async: true,
        data: JSON.stringify(forms)
    }).done(function ajaxDone(response, status) {
        let body = response.body,
            code = response.head.code,
            message = response.head.message;
        if (code === Success.APPLICATION_SUCCESS_CODE) {

        } else {

        }
    }.bind(this));
}