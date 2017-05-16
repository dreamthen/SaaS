/**
 * Created by yinwk on 2017/5/11.
 */
import $ from "jquery";
import api from "../config/api";
import Success from "../prompt/success_prompt";
import requestError from "../config/requestError";
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
        },
        error: function (request, status, ThrowError) {
            let codeStatus = request.status;
            requestError.error(codeStatus, ThrowError);
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
 * 添加或者修改申请表单
 * @param forms
 * @param studentId
 * @param formId
 * @param pageNum
 * @param pageSize
 */
export function addOrChangeApplicationForms(forms, studentId, formId, pageNum, pageSize) {
    $.ajax({
        url: formId === 0 ? api.ADD_APPLICATION_FORMS : api.CHANGE_APPLICATION_FORMS + "/" + formId,
        type: formId === 0 ? "post" : "put",
        dataType: "json",
        async: true,
        contentType: "application/json",
        data: JSON.stringify(forms),
        error: function (request, status, ThrowError) {
            let codeStatus = request.status;
            requestError.error(codeStatus, ThrowError);
        }
    }).done(function ajaxDone(response, status) {
        let body = response.body,
            code = response.head.code,
            message = response.head.message;
        if (code === Success.APPLICATION_SUCCESS_CODE) {
            //初始化添加、查看或者修改的申请表单
            this.initApplication();
            //将添加、查看和修改申请单弹出框关闭
            this.setState({
                visible: false
            });
            //发出获取申请单列表ajax请求
            let application_action = getApplicationList.bind(this);
            application_action(studentId, pageNum, pageSize);
        } else {
            //设置错误、警告或者成功提示语状态
            this.setPromptTrueOrFalse(false, true, false);
            this.setState({
                warnPrompt: message
            });
        }
    }.bind(this));
}

/**
 * 获取申请表单
 * @param id
 */
export function getApplicationForms(id) {
    $.ajax({
        url: api.GET_APPLICATION_FORMS + "/" + id,
        type: "get",
        dataType: "json",
        async: true,
        error: function (request, status, ThrowError) {
            let codeStatus = request.status;
            requestError.error(codeStatus, ThrowError);
        }
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
 * 添加申请关系
 * @param studentId
 * @param formId
 * @param universityId
 * @param pageNum
 * @param pageSize
 */
export function addApplyRelations(studentId, formId, universityId, pageNum, pageSize) {
    $.ajax({
        url: api.ADD_APPLY_RELATIONS,
        type: "post",
        dataType: "json",
        data: JSON.stringify({
            studentId,
            applicationFormId: formId,
            universityId
        }),
        contentType: "application/json",
        async: true,
        error: function (request, status, ThrowError) {
            let codeStatus = request.status;
            requestError.error(codeStatus, ThrowError);
        }
    }).done(function ajaxDone(response, status) {
        let body = response.body,
            code = response.head.code,
            message = response.head.message;
        if (code === Success.APPLICATION_SUCCESS_CODE) {
            //初始化添加、查看或者修改的申请表单
            this.initApplication();
            //将添加、查看和修改申请单弹出框关闭
            this.setState({
                visible: false
            });
            //发出获取申请单列表ajax请求
            let application_action = getApplicationList.bind(this);
            application_action(studentId, pageNum, pageSize);
        } else {
            //设置错误、警告或者成功提示语状态
            this.setPromptTrueOrFalse(false, true, false);
            this.setState({
                warnPrompt: message
            });
        }
    }.bind(this));
}