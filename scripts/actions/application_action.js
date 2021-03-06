/**
 * Created by yinwk on 2017/5/11.
 */
import fetchRequest from "../config/fetchRequestData";
import {URLSearchParamsConfig} from "../config/URLSearchParamsConfig";
import api from "../config/api";
import Success from "../prompt/success_prompt";
import {message} from "antd";
/**
 * 获取申请列表
 * @param id
 * @param pageNum
 * @param pageSize
 */
export function getApplicationList(id, pageNum, pageSize) {
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        URLSearchParamsConfig(api.GET_APPLICATION_LIST + "/" + id, {pageNum, pageSize}),
        "get",
        {},
        function done(response, status) {
            let body = response.body,
                code = response.head.code,
                msg = response.head.message;
            if (code === Success.APPLICATION_SUCCESS_CODE) {
                this.setState({
                    applicationList: body
                });
            } else {
                message.warning(msg, 5);
            }
        }.bind(this)
    );
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
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        formId === 0 ? api.ADD_APPLICATION_FORMS : api.CHANGE_APPLICATION_FORMS + "/" + formId,
        formId === 0 ? "post" : "put",
        forms,
        function done(response, status) {
            let body = response.body,
                code = response.head.code,
                msg = response.head.message;
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
                    warnPrompt: msg
                });
            }
        }.bind(this)
    );
}

/**
 * 获取申请表单
 * @param id
 */
export function getApplicationForms(id) {
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        api.GET_APPLICATION_FORMS + "/" + id,
        "get",
        {},
        function done(response, status) {
            let body = response.body,
                code = response.head.code,
                msg = response.head.message;
            if (code === Success.APPLICATION_SUCCESS_CODE) {
                this.props.getApplicationFormsAlready(body);
            } else {
                //隐藏正在载入loading......(包括loading动画、loading标识和loading遮罩层)
                this.loadingDisappear();
                message.warning(msg, 5);
            }
        }.bind(this)
    );
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
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        api.ADD_APPLY_RELATIONS,
        "post",
        {
            studentId,
            applicationFormId: formId,
            universityId
        },
        function done(response, status) {
            let body = response.body,
                code = response.head.code,
                msg = response.head.message;
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
                    warnPrompt: msg
                });
            }
        }.bind(this)
    );
}

/**
 * 获取国家或者宗教列表
 * @param key
 * @param url
 */
export function getCountriesOrReligions(key, url) {
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        url,
        "get",
        {},
        function done(response, status) {
            //返回的主体内容
            let body = response.body,
                //返回的头部code码
                code = response.head.code,
                //返回的头部message消息
                msg = response.head.message;
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
                //将添加、查看和修改申请单弹出框关闭
                this.setState({
                    visible: false
                });
                //隐藏正在载入loading......(包括loading动画、loading标识和loading遮罩层)
                this.loadingDisappear();
                message.warning(msg, 5);
            }
        }.bind(this)
    );
}