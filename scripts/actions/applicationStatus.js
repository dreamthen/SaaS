/**
 * Created by yinwk on 2017/5/14.
 */
import $ from "jquery";
import api from "../config/api";
import Success from "../prompt/success_prompt";

/**
 * 获取申请关系
 * @param id
 */
export function getApplyRelations(id) {
    $.ajax({
        url: api.GET_APPLY_RELATIONS + "/" + id + "/applyRelations",
        type: "get",
        dataType: "json",
        async: true,
    }).done(function ajaxDone(response, status) {
        let body = response.body,
            code = response.head.code,
            message = response.head.message;
        if (code === Success.APPLICATION_STATUS_SUCCESS_CODE) {
            //通过id获取到某一个已经提交的申请关系,并setState到申请表状态的每一个state
            for (let relationItem in body) {
                if (relationItem === "studentId") {
                    this.setState({
                        id: body[relationItem]
                    });
                } else if (relationItem === "applicationFormId") {
                    this.setState({
                        formId: body[relationItem]
                    });
                } else {
                    this.setState({
                        [relationItem]: body[relationItem] === null ? "" : body[relationItem]
                    });
                }
            }
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
        async: true
    }).done(function ajaxDone(response, status) {
        let body = response.body,
            code = response.head.code,
            message = response.head.message;
        if (code === Success.APPLICATION_STATUS_SUCCESS_CODE) {
            //关闭获取申请列表弹窗
            this.setState({
                visible: false
            });
            let apply_status = getApplyRelations.bind(this);
            apply_status(studentId);
        } else {

        }
    }.bind(this));
}