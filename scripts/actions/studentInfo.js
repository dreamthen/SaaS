/**
 * Created by yinwk on 2017/5/6.
 */
import $ from "jquery";
import api from "../config/api";
export function getInformation(id) {
    $.ajax({
        type: "get",
        dataType: "json",
        url: api.GET_STUDENT_INFORMATION + "/" + id
    }).done(function (response, status) {
        console.log(response);
    });
}