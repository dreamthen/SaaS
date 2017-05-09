/**
 * Created by yinwk on 2017/5/9.
 */
import React from "react";
import {Input} from "antd";
//密码弹出框数据模板
const passwordItem = [
    {
        key: "oldPassword",
        value: "原密码"
    },
    {
        key: "newPassword",
        value: "新密码"
    },
    {
        key: "checkedPassword",
        value: "确认密码"
    }
];
//承接分散的密码弹出框所有元素
const passwordResult = [];

/**
 * 集成密码弹出框函数对象
 */
const passwordCol = [
    passwordItem.map((item, index) => {
        return (content, func) => {
            return (
                <Input
                    key={index}
                    size="large"
                    type="password"
                    value={content}
                    placeholder={item["value"]}
                    maxLength="6"
                    onChange={func.bind(this, item["key"])}
                />
            )
        }
    })
];

/**
 *  分散密码弹出框所有元素
 */
passwordCol.map((colItem, index) => {
    for (let i = 0; i < colItem.length; i++) {
        passwordResult.push(colItem[i]);
    }
});

/**
 * 密码弹出框内容
 * @type {Array}
 */
const integrationPasswordItem = passwordResult.map((resultItem, index) => {
    return {
        name: passwordItem[index]["value"],
        main: function (content, func) {
            return resultItem.bind(this)(content, func);
        }
    }
});

export default integrationPasswordItem;

