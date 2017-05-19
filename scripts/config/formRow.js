/**
 * Created by yinwk on 2017/5/8.
 */
import React from "react";
//性别所有展现值
const SEX = [{key: "M", value: "男"}, {key: "F", value: "女"}];
//签证状态所有展现值
const VISA_STATUS = [{key: "0", value: "未申请"}, {key: "1", value: "申请中"}, {key: "2", value: "已办理"}];

/**
 * 集成个人信息表单所有状态和长度限制等一些属性
 * @type {[*]}
 */
const formRow = [
    {
        classify: "content",
        key: "account",
        value: "用户名"
    }, {
        classify: "upload",
        key: "file",
        value: "Avatar"
    }, {
        classify: "select",
        key: "sex",
        value: "性别",
        options: SEX,
        className:"information-select"
    }, {
        classify: "input",
        key: "phone",
        value: "手机号码",
        maxLength: 20
    }, {
        classify: "input",
        key: "email",
        value: "邮箱",
        maxLength: 45
    }, {
        classify: "select",
        key: "visaStatus",
        value: "验证状态",
        options: VISA_STATUS,
        className:"information-select"
    }, {
        classify: "input",
        key: "postalAddress",
        value: "邮件地址",
        maxLength: 50
    }
];

export default formRow;