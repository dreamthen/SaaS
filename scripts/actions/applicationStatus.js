/**
 * Created by yinwk on 2017/5/14.
 */
import fetchRequest from "../config/fetchRequestData";
import api from "../config/api";
import Success from "../prompt/success_prompt";

/**
 * 获取申请关系
 * @param id
 */
export function getApplyRelations(id) {
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        api.GET_APPLY_RELATIONS + "/" + id + "/applyRelations",
        "get",
        {},
        function done(response, status) {
            let body = response.body,
                code = response.head.code,
                message = response.head.message;
            if (code === Success.APPLICATION_STATUS_SUCCESS_CODE) {
                if (body !== null) {
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
                        } else if (relationItem === "id") {
                            this.setState({
                                relationId: body[relationItem]
                            });
                        } else {
                            this.setState({
                                [relationItem]: body[relationItem] === null ? "" : body[relationItem]
                            });
                        }
                    }
                }
            } else {

            }
        }.bind(this)
    );
}

/**
 * 添加申请关系
 * @param studentId
 * @param formId
 * @param universityId
 */
export function addApplyRelations(studentId, formId, universityId) {
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
        }.bind(this)
    );
}

/**
 * 获取申请快递状态
 * @param relationId
 */
export function getDeliveryStatus(relationId) {
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        api.GET_DELIVERY_STATUS + "/" + relationId + "/deliverystatus",
        "get",
        {},
        function done(response, status) {
            let body = response.body,
                code = response.head.code,
                message = response.head.message;
            if (code === Success.APPLICATION_STATUS_SUCCESS_CODE) {
                //弹出获取申请快递状态弹窗,并把申请快递状态的html段落赋给state状态deliveryStatus
                this.setState({
                    deliveryVisible: true,
                    deliveryStatus: body
                });
            } else {

            }
        }.bind(this)
    );
}