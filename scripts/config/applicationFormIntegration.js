/**
 * Created by yinwk on 2017/5/12.
 */
import React from "react";
import {Input, Select} from "antd";
const Option = Select.Option;

//性别展现所有值
const SEX = [{key: "M", value: "男"}, {key: "F", value: "女"}];
//Input第一部分所有状态名
const applicationFormPartInput = ["familyName", "middleName", "givenName", "chineseName", "countryOfCitizenship"];

//集成添加申请表单所有状态、方法和长度限制
const applicationFormIntegrationMode = [
    applicationFormPartInput.map((inputItem, index) => {
        return (content, func, maxLength) => {
            return (
                <Input
                    key={inputItem}
                    size="large"
                    value={content}
                    maxLength={maxLength}
                    onChange={func.bind(this, inputItem)}
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
            >
                {
                    SEX.map((sexItem, index) => {
                        return (
                            <Option
                                key={sexItem["key"]}
                                value={sexItem["key"]}
                            >
                                {sexItem["value"]}
                            </Option>
                        )
                    })
                }
            </Select>
        )
    }
];

