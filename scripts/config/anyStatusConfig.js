/**
 * Created by yinwk on 2017/5/26.
 */
//在申请单tab页面下,申请单状态或者在消息状态tab页面下,消息阅读状态配置
const anyStatusConfig = {
    //在申请单tab页面下,申请单状态value
    applyStatus: [{key: "N", value: "未提交"}, {key: "Y", value: "提交"}],
    //在消息状态tab页面下,消息阅读状态value
    readStatus: [{key: "N", value: "未读"}, {key: "Y", value: "已读"}]
};

module.exports = anyStatusConfig;