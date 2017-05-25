/**
 * Created by yinwk on 2017/5/25.
 */
import fetchRequest from "../config/fetchRequestData";
import api from "../config/api";
import Success from "../prompt/success_prompt";
import {URLSearchParamsConfig} from "../config/URLSearchParamsConfig";

/**
 * 获取消息状态列表
 * @param id
 * @param pageNum
 * @param pageSize
 */
export function getMessageStatusList(id, pageNum, pageSize) {
    fetchRequest.fetchRequestData(
        URLSearchParamsConfig(api.GET_MESSAGE_STATUS_LIST + "/" + id + "/notifications", {pageNum, pageSize}),
        "get",
        {},
        function done(response, status) {

        }.bind(this)
    );
}