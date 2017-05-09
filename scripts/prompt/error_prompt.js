/**
 * Created by yinwk on 2017/5/5.
 */
const Error = {
    NULL_ACCOUNT_VALUE: "请输入用户名",
    EXCESS_ACCOUNT_LENGTH: "超出用户名长度限额",
    NULL_PASSWORD_VALUE: "请输入密码",
    EXCESS_PASSWORD_LENGTH: "密码只允许输入6位",
    NULL_PHONE_VALUE: "请输入电话号码",
    EXCESS_PHONE_LENGTH: "超出电话号码长度限额",
    NULL_EMAIL_VALUE: "请输入邮箱",
    EXCESS_EMAIL_LENGTH: "超出邮箱长度限额",
    NULL_POSTALADDRESS_VALUE: "请输入邮件地址",
    EXCESS_POSTALADDRESS_LENGTH: "超出邮件地址长度限额",
    INPUT_NULL_ONLY_OLD_PASSWORD: "请输入原密码",
    INPUT_EXCESS_ONLY_OLD_PASSWORD: "原密码只允许输入6位",
    INPUT_NULL_ONLY_NEW_PASSWORD: "请输入新密码",
    INPUT_EXCESS_ONLY_NEW_PASSWORD: "新密码只允许输入6位",
    INPUT_NULL_ONLY_ENSURE_PASSWORD: "请输入确认的新密码",
    INPUT_EXCESS_ONLY_ENSURE_PASSWORD: "确认密码只允许输入6位",
    INCONSISTENT_PASSWORD: "两次密码输入不相同"
};
module.exports = Error;