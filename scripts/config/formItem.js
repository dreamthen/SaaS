/**
 * Created by yinwk on 2017/5/8.
 */
import React from "react";
import {Select, Input} from "antd";
const Option = Select.Option;

//性别所有展现值
const SEX = [{key: "M", value: "男"}, {key: "F", value: "女"}];
//个人信息表单名称字段数组
const nameArray = ["用户名", "性别", "电话号码", "邮箱", "邮件地址", "签证状态"];
//用来返回formRow
const rowArray = ["accountRow", "sexRow", "phoneRow", "emailRow", "postalAddressRow", "visaStatusRow"];
//表单所有Input框内容
const FORM_ITEM = ["phone", "email", "postalAddress"];
//签证状态所有展现值
const VISA_STATUS = [{key: "0", value: "未申请"}, {key: "1", value: "申请中"}, {key: "2", value: "已办理"}];

/**
 * 集成的个人信息表单所有元素
 * @type {[*]}
 */
const contentArray = [
    (content) => {
        return (
            content
        )
    },
    (content, func) => {
        return (
            <Select
                size="large"
                value={content ? content : SEX[0]}
                onChange={func.bind(this)}
                className="information-select"
            >
                {
                    SEX.map((sexItem, index) => {
                        return (
                            <Option
                                key={index}
                                value={sexItem["key"]}
                            >
                                {sexItem["value"]}
                            </Option>
                        )
                    })
                }
            </Select>
        )
    },
    FORM_ITEM.map((formItem, index) => {
        return (content, func, maxLength) => {
            return (
                <Input
                    key={index}
                    size="large"
                    value={content}
                    maxLength={maxLength}
                    onChange={func.bind(this, formItem)}
                />
            )
        }
    }),
    (content, func) => {
        return (
            <Select
                size="large"
                value={content}
                onChange={func.bind(this)}
                className="information-select"
            >
                {
                    VISA_STATUS.map((visaItem, index) => {
                        return (
                            <Option
                                key={index}
                                value={visaItem["key"]}
                            >
                                {visaItem["value"]}
                            </Option>
                        )
                    })
                }
            </Select>
        )
    }
];

/**
 * 分散的个人信息表单所有元素
 * @type {Array}
 */
let contentResult = [];
rowArray.map((rowItem, index) => {
    console.log(contentArray[index]);
    if (Object.prototype.toString.call(contentArray[index]) === "[object Function]") {
        contentResult.push(contentArray[index]);
    }
    if (Object.prototype.toString.call(contentArray[index]) === "[object Array]") {
        for (let i = 0; i < contentArray[index].length; i++) {
            contentResult.push(contentArray[index][i]);
        }
    }
});

/**
 * 个人信息表单内容
 * @type {Array}
 */
const formRow = [];

rowArray.map((rowItem, index) => {
    formRow.push({
        name: nameArray[index],
        main: function (content, func, maxLength) {
            return contentResult[index].bind(this)(content, func, maxLength);
        }
    })
});

export default formRow;