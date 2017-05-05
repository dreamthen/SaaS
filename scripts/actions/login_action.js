/**
 * Created by yinwk on 2017/5/6.
 */
// import axios from "axios";
import $ from "jquery";
import api from "../config/api";
import Success from "../prompt/success_prompt";
export default function loginAction(account, password) {
    $.ajax({
        type: "post",
        dataType: "json",
        url: api.LOGIN_ACTION,
        data: JSON.stringify({
            account,
            password
        }),
        async: true,
        contentType: "application/json"
    }).done(function (response, status) {
        if (response.head.code === Success.LOGIN_SUCCESS_CODE) {
            this.setState({
                isError: false
            });
        } else {
            this.setState({
                isError: true,
                errorPrompt: response.head.message
            })
        }
    });
}