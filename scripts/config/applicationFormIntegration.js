/**
 * Created by yinwk on 2017/5/12.
 */
import React from "react";
import {Input, Select, DatePicker} from "antd";
import applicationFormMode from "./applicationFormMode";
const Option = Select.Option;

//性别展现所有值
const SEX = [{key: "M", value: "男"}, {key: "F", value: "女"}];
//婚姻状态展现所有值
const MARRIAGE_STATUS = [{key: "N", value: "未婚"}, {key: "Y", value: "已婚"}];
//英语能力、汉语阅读、口语、听、写、其他语言能力展现所有值
const CHINESE_OR_ENGLISH_ABILITY = [{key: "A", value: "好"}, {key: "B", value: "一般"}, {key: "C", value: "不好"}];
//Select第一部分所有状态名
const applicationFormPartSelect = ["gender", "marriageStatus"];
//Select第二部分所有状态名
const applicationFormPartSelectAno = ["englishAbility", "chineseReading", "chineseSpeaking", "chineseListening", "chineseWriting", "otherLanguageAbility"];
//Select最后一部分所有状态名(经费来源、申请单状态和申请类别)
const applicationFormPartSelectEnd = [{
    key: "financialResource",
    value: [{
        key: "A",
        value: "个人储蓄"
    }, {
        key: "B",
        value: "父母供给"
    }, {
        key: "C",
        value: "奖学金"
    }, {
        key: "D",
        value: "其他"
    }]
}, {
    key: "category",
    value: [{
        key: "A",
        value: "本科生"
    }, {
        key: "B",
        value: "本科交换生"
    }, {
        key: "C",
        value: "汉语言生"
    }, {
        key: "D",
        value: "硕士生"
    }, {
        key: "E",
        value: "博士生"
    }]
}];
//Input第一部分所有状态名
const applicationFormPartInput = ["familyName", "middleName", "givenName", "chineseName", "countryOfCitizenship"];
//Input第二部分所有状态名
const applicationFormPartInputAno = ["placeOfBirth", "passportNo", "religion"];
//Input第三部分所有状态名
const applicationFormPartInputThen = ["occupation", "institutionOrEmployer", "phone", "email", "homeCountryAddress", "zipCode", "fax", "mailingAddress", "receiver"];
//Input最后一部分所有状态名
const applicationFormPartInputEnd = ["otherLanguage", "recommendedBy", "contactPerson", "recommendAddress", "contactTel", "majorOrStudy", "chinaContactName", "chinaContactPhone", "chinaContactEmail", "chinaContactAddress"];
const applicationFormPartDatePicker = [
    {
        key: "dateOfBirth",
        value: "出生日期"
    },
    {
        key: "validUntil",
        value: "护照有效期"
    }
];
//DatePicker最后一部分状态名
const applicationFormPartDatePickerEnd = [
    {
        key: "durationOfStudyFrom",
        value: "学习开始日期"
    },
    {
        key: "durationOfStudyTo",
        value: "学习结束日期"
    }
];

//集成添加、查看或者修改申请表单所有组件
const applicationFormIntegrationMode = [
    applicationFormPartInput.map((inputItem, index) => {
        return (content, func, formDisabled, maxLength) => {
            return (
                <Input
                    disabled={formDisabled}
                    key={inputItem}
                    size="large"
                    type="text"
                    value={content}
                    maxLength={maxLength}
                    onChange={func.bind(this, inputItem)}
                />
            )
        }
    }),
    (content, func, formDisabled) => {
        return (
            <Select
                disabled={formDisabled}
                size="large"
                value={content}
                onChange={func.bind(this, applicationFormPartSelect[0])}
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
    },
    applicationFormPartDatePicker.map((datePickerItem, index) => {
        return (content, func, formDisabled, maxLength, open, openFunc, disabledFunc) => {
            return (
                <DatePicker
                    disabled={formDisabled}
                    size="large"
                    showTime={false}
                    format="YYYY-MM-DD"
                    value={content}
                    onChange={func.bind(this, datePickerItem["key"])}
                    placeholder={datePickerItem["value"]}
                    open={open}
                    onOpenChange={openFunc.bind(this, datePickerItem["key"] + "Open")}
                />
            )
        }
    }),
    applicationFormPartInputAno.map((inputItem, index) => {
        return (content, func, formDisabled, maxLength) => {
            return (
                <Input
                    key={inputItem}
                    disabled={formDisabled}
                    size="large"
                    type="text"
                    value={content}
                    maxLength={maxLength}
                    onChange={func.bind(this, inputItem)}
                />
            )
        }
    }),
    (content, func, formDisabled) => {
        return (
            <Select
                disabled={formDisabled}
                size="large"
                value={content}
                onChange={func.bind(this, applicationFormPartSelect[1])}
            >
                {
                    MARRIAGE_STATUS.map((marriageItem, index) => {
                        return (
                            <Option
                                key={applicationFormPartSelect[1] + "-" + marriageItem["key"]}
                                value={marriageItem["key"]}>
                                {marriageItem["value"]}
                            </Option>
                        )
                    })
                }
            </Select>
        )
    },
    applicationFormPartInputThen.map((inputItem, index) => {
        return (content, func, formDisabled, maxLength) => {
            return (
                <Input
                    size="large"
                    disabled={formDisabled}
                    type="text"
                    value={content}
                    maxLength={maxLength}
                    onChange={func.bind(this, inputItem)}
                />
            )
        }
    }),
    applicationFormPartSelectAno.map((selectItem, index) => {
        return (content, func, formDisabled) => {
            return (
                <Select
                    key={selectItem}
                    disabled={formDisabled}
                    value={content}
                    onChange={func.bind(this, selectItem)}
                >
                    {
                        CHINESE_OR_ENGLISH_ABILITY.map((abilityItem, abilityIndex) => {
                            return (
                                <Option
                                    key={selectItem + "-" + abilityItem["key"]}
                                    value={abilityItem["key"]}
                                >
                                    {
                                        abilityItem["value"]
                                    }
                                </Option>
                            )
                        })
                    }
                </Select>
            )
        }
    }),
    applicationFormPartInputEnd.map((inputItem, index) => {
        return (content, func, formDisabled, maxLength) => {
            return (
                <Input
                    size="large"
                    disabled={formDisabled}
                    type="text"
                    value={content}
                    maxLength={maxLength}
                    onChange={func.bind(this, inputItem)}
                />
            )
        }
    }),
    applicationFormPartDatePickerEnd.map((datePickerItem, index) => {
        return (content, func, formDisabled, maxLength, open, openFunc, disabledFunc) => {
            return (
                <DatePicker
                    size="large"
                    disabled={formDisabled}
                    disabledDate={disabledFunc}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={content}
                    onChange={func.bind(this, datePickerItem["key"])}
                    placeholder={datePickerItem["value"]}
                    open={open}
                    onOpenChange={openFunc.bind(this, datePickerItem["key"] + "Open")}
                />
            )
        }
    }),
    applicationFormPartSelectEnd.map((selectItem, selectIndex) => {
        return (content, func, formDisabled) => {
            return (
                <Select
                    size="large"
                    disabled={formDisabled}
                    value={content}
                    onChange={func.bind(this, selectItem["key"])}
                >
                    {
                        selectItem["value"].map((valueItem, valueIndex) => {
                            return (
                                <Option
                                    key={selectItem["key"] + "-" + valueItem["key"]}
                                    value={valueItem["key"]}
                                >
                                    {valueItem["value"]}
                                </Option>
                            )
                        })
                    }
                </Select>
            )
        }
    })
];

//分散添加、修改或者修改申请表单所有组件
let applicationFormIntegrationArray = [];
applicationFormIntegrationMode.map((modeItem, modeIndex) => {
    if (Object.prototype.toString.call(modeItem) === "[object Function]") {
        applicationFormIntegrationArray.push(modeItem);
    }
    if (Object.prototype.toString.call(modeItem) === "[object Array]") {
        modeItem.forEach((item, index) => {
            applicationFormIntegrationArray.push(item);
        })
    }
});

//集成添加、查看或者修改申请表单所有组件对象
const applicationFormIntegration = applicationFormIntegrationArray.map((integrationItem, integrationIndex) => {
    return {
        name: applicationFormMode[integrationIndex]["value"],
        main: function (content, func, formDisabled, maxLength, open, openFunc, disabledFunc) {
            return integrationItem.bind(this)(content, func, formDisabled, maxLength, open, openFunc, disabledFunc);
        }
    }
});

export default applicationFormIntegration;
