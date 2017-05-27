/**
 * Created by yinwk on 2017/5/25.
 */
import fetchRequest from "../config/fetchRequestData";
import api from "../config/api";
import Success from "../prompt/success_prompt";
import {URLSearchParamsConfig} from "../config/URLSearchParamsConfig";
import {message} from "antd";

/**
 * 获取消息状态列表
 * @param id
 * @param pageNum
 * @param pageSize
 */
export function getMessageStatusList(id, pageNum, pageSize) {
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        URLSearchParamsConfig(api.GET_MESSAGE_STATUS_LIST + "/" + id + "/notifications", {pageNum, pageSize}),
        "get",
        {},
        function done(response, status) {
            let body = response.body,
                code = response.head.code,
                msg = response.head.message;
            if (code === Success.MESSAGE_STATUS_SUCCESS_CODE) {
                this.setState({
                    messageCenterList: body
                });
            } else {
                message.warning(msg, 5);
            }
        }.bind(this)
    );
}