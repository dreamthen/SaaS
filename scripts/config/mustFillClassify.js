/**
 * Created by yinwk on 2017/5/17.
 */
//根据必填、中文能力以及其他信息进行划分三块DIV结构模具
const mustFillClassify = [{
    key: "mast-fill",
    value: "formRowMustFill",
    navigation:"mustFill",
    position:"position",
    children: [
        "left",
        "right"
    ]
}, {
    key: "chinese-fluency",
    value: "formRowChineseFluency",
    navigation:"mustFill",
    position:"position",
    children: [
        "left",
        "right"
    ]
}, {
    key: "other-information",
    value: "formRowOtherInformation",
    navigation:"mustFill",
    position:"position",
    children: [
        "left",
        "right"
    ]
}];

module.exports = mustFillClassify;