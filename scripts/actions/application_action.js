/**
 * Created by yinwk on 2017/5/11.
 */
import $ from "jquery";
import api from "../config/api";
import Success from "../prompt/success_prompt";
/**
 * 获取申请单内容
 * @param id
 */
export function getApplicationList(id) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: api.GET_APPLICATION_LIST + "/" + id,
        async: true
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