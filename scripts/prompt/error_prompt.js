/**
 * Created by yinwk on 2017/5/5.
 */
const Error = {
    NULL_ACCOUNT_VALUE: "请输入用户名",
    EXCESS_ACCOUNT_LENGTH: "超出用户名长度限额",
    SESSION_EXPIRED: "会话过期,请重新登录",
    SERVER_ERROR: "服务器错误:",
    NULL_PASSWORD_VALUE: "请输入密码",
    EXCESS_PASSWORD_LENGTH: "密码只允许输入6位",
    NULL_PHONE_VALUE: "请输入您的手机号码",
    EXCESS_PHONE_LENGTH: "超出手机号码长度限额",
    NULL_EMAIL_VALUE: "请输入您的邮箱",
    EXCESS_EMAIL_LENGTH: "超出邮箱长度限额",
    NULL_POSTALADDRESS_VALUE: "请输入您的邮件地址",
    EXCESS_POSTALADDRESS_LENGTH: "超出邮件地址长度限额",
    NULL_FAMILYNAME_VALUE: "请输入您的姓",
    EXCESS_FAMILYNAME_LENGTH: "超出姓的长度限额",
    EXCESS_MIDDLENAME_LENGTH: "超出中间名长度限额",
    NULL_GIVENNAME_VALUE: "请输入您的名字",
    EXCESS_GIVENNAME_LENGTH: "超出名字的长度限额",
    EXCESS_CHINESENAME_LENGTH: "超出中国名长度限额",
    NULL_DATEOFBIRTH_VALUE: "请选择您的出生日期",
    NULL_VALIDUNTIL_VALUE: "请选择您的护照有效期",
    NULL_PLACEOFBIRTH_VALUE: "请输入您的出生地",
    EXCESS_PLACEOFBIRTH_LENGTH: "超出出生地长度限额",
    NULL_PASSPORTNO_VALUE: "请输入您的护照号",
    EXCESS_PASSPORTNO_LENGTH: "超出护照号长度限额",
    NULL_OCCUPATION_VALUE: "请输入您的职业",
    EXCESS_OCCUPATION_LENGTH: "超出职业长度限额",
    NULL_INSTITUTIONOREMPLOYER_VALUE: "请输入您的学校或工作单位",
    EXCESS_INSTITUTIONOREMPLOYER_LENGTH: "超出学校或工作单位长度限额",
    NULL_HOMECOUNTRYADDRESS_VALUE: "请输入您本国的住址",
    EXCESS_HOMECOUNTRYADDRESS_LENGTH: "超出本国住址长度限额",
    NULL_ZIPCODE_VALUE: "请输入邮编",
    EXCESS_ZIPCODE_LENGTH: "超出邮编长度限额",
    EXCESS_FAX_LENGTH: "超出传真长度限额",
    NULL_MAILINGADDRESS_VALUE: "请输入您的收件地址",
    EXCESS_MAILINGADDRESS_LENGTH: "超出收件地址限额",
    NULL_RECEIVER_VALUE: "请输入收件人",
    EXCESS_RECEIVER_LENGTH: "超出收件人长度限额",
    EXCESS_OTHERLANGUAGE_LENGTH: "超出其他语言长度限额",
    EXCESS_RECOMMENDEDBY_LENGTH: "超出推荐单位长度限额",
    EXCESS_CONTACTPERSON_LENGTH: "超出联系人长度限额",
    EXCESS_RECOMMENDADDRESS_LENGTH: "超出联系地址长度限额",
    EXCESS_CONTACTTEL_LENGTH: "超出联系人手机号码限额",
    NULL_MAJORORSTUDY_VALUE: "请输入您的专业(方向)",
    EXCESS_MAJORORSTUDY_LENGTH: "超出专业(方向)长度限额",
    EXCESS_CHINACONTACTNAME_LENGTH: "超出在华事务联系人长度限额",
    EXCESS_CHINACONTACTPHONE_LENGTH: "超出在华事务联系人手机号码长度限额",
    EXCESS_CHINACONTACTEMAIL_LENGTH: "超出在华事务联系人邮箱长度限额",
    EXCESS_CHINACONTACTADDRESS_LENGTH: "超出在华事务联系人地址长度限额",
    NULL_DURATIONOFSTUDYFROM_VALUE:"请选择您学习开始的日期",
    NULL_DURATIONOFSTUDYTO_VALUE:"请选择您学习结束的日期",
    NULL_FORMNAME_VALUE: "请输入您的申请单标识名",
    EXCESS_FORMNAME_LENGTH: "超出申请单标识名长度限额",
    NULL_APPLY_LIST_VALUE: "申请列表暂无数据,请在申请表页面添加一张申请表",
    INPUT_NULL_ONLY_OLD_PASSWORD: "请输入原密码",
    INPUT_EXCESS_ONLY_OLD_PASSWORD: "原密码只允许输入6位",
    INPUT_NULL_ONLY_NEW_PASSWORD: "请输入新密码",
    INPUT_EXCESS_ONLY_NEW_PASSWORD: "新密码只允许输入6位",
    INPUT_NULL_ONLY_ENSURE_PASSWORD: "请输入确认的新密码",
    INPUT_EXCESS_ONLY_ENSURE_PASSWORD: "确认密码只允许输入6位",
    INCONSISTENT_PASSWORD: "两次密码输入不相同"
};
module.exports = Error;