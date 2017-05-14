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
                    })
                } else{
                    this.setState({
                        [relationItem] : body[relationItem]
                    });
                }
            }
        } else {

        }
    }.bind(this));
}