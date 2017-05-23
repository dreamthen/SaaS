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
            message = response.head.message;
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
            //设置成功状态和提示语
            this.setPromptTrueOrFalse(false, false, true);
            this.setState({
                successPrompt: formId === 0 ? Success.ADD_APPLICATION_FORMS_SUCCESS_MESSAGE : Success.CHANGE_APPLICATION_FORMS_SUCCESS_MESSAGE
            });
            // FIXME 这里需要设置一个时间控制器,需要使用setTimeout延迟时间,延迟1.5s将添加、查看和修改申请单弹出框和提示语状态关闭并发出获取申请单列表ajax请求
            setTimeout(function timerControl() {
                //设置提示语状态取消
                this.setPromptTrueOrFalse(false, false, false);
                //将添加、查看和修改申请单弹出框关闭
                this.setState({
                    visible: false
                });
                //发出获取申请单列表ajax请求
                let application_action = getApplicationList.bind(this);
                application_action(studentId, pageNum, pageSize);
            }.bind(this), 1500);
        } else {
            //设置警告状态和提示语
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
            //设置成功状态和提示语
            this.setPromptTrueOrFalse(false, false, true);
            this.setState({
                successPrompt: Success.ADD_APPLY_RELATIONS_SUCCESS_MESSAGE
            });
            // FIXME 这里需要设置一个时间控制器,需要使用setTimeout延迟时间,延迟1.5s将添加、查看和修改申请单弹出框关闭并发出获取申请单列表ajax请求
            setTimeout(function timerControl() {
                //将添加、查看和修改申请单弹出框关闭
                this.setState({
                    visible: false
                });
                //发出获取申请单列表ajax请求
                let application_action = getApplicationList.bind(this);
                application_action(studentId, pageNum, pageSize);
            }.bind(this), 1500);
        } else {
            //设置警告状态和提示语
            this.setPromptTrueOrFalse(false, true, false);
            this.setState({
                warnPrompt: message
            });
        }
    }.bind(this));
}

/**
 * 获取国家或者宗教列表
 * @param key
 * @param url
 */
export function getCountriesOrReligions(key, url) {
    $.ajax({
        url,
        type: "get",
        dataType: "json",
        async: true,
        error: function (request, status, ThrowError) {
            let codeStatus = request.status;
            requestError.error(codeStatus, ThrowError);
        }
    }).done(function ajaxDone(response, status) {
        //返回的主体内容
        let body = response.body,
            //返回的头部code码
            code = response.head.code,
            //返回的头部message消息
            message = response.head.message;
        //如果返回的头部code码等于申请表tab页面成功码
        if (code === Success.APPLICATION_SUCCESS_CODE) {
            let result = [];
            //定义一个数组,将返回的主体对象数组中的每个数组对象元素进行解析,以{key:id,value:enName}的形式重构,用于Select Option组件
            body.forEach((bodyItem, bodyIndex) => {
                let resultObj = {key: bodyItem["id"].toString(), value: bodyItem["enName"]};
                result.push(resultObj);
            });
            //result数组用来赋予国籍列表和宗教列表state状态countryIdList,religionIdList
            this.setState({
                [key + "List"]: result
            });
        } else {

        }
    }.bind(this));
}