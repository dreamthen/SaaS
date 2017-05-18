/**
 * Created by yinwk on 2017/5/11.
 */
import PlaceHolder from "../prompt/placeholder_prompt";
//性别展现所有值
const SEX = [{key: "M", value: "男"}, {key: "F", value: "女"}];
//婚姻状态展现所有值
const MARRIAGE_STATUS = [{key: "N", value: "未婚"}, {key: "Y", value: "已婚"}];
//英语能力、汉语阅读、口语、听、写、其他语言能力展现所有值
const CHINESE_OR_ENGLISH_ABILITY = [{key: "A", value: "好"}, {key: "B", value: "一般"}, {key: "C", value: "不好"}];
//经费来源展现所有值
const FINANCIAL_RESOURCE = [{
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
}];
//申请类别展现所有值
const CATEGORY = [{
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
}];
//日期格式规范
const dateFormat = 'YYYY-MM-DD';
//时间格式规范
const timeFormat = 'YYYY-MM-DD HH:mm:ss';

//集成添加、查看和修改申请表单所有提示语、状态、框内默认提示语和长度限制等一些属性
const applicationFormIntegration = [{
    classify: "input",
    key: "formName",
    value: "申请表标识名",
    maxLength: 45,
    placeholder: PlaceHolder.PLACEHOLDER_FORM_NAME_VALUE,
    isRequired: true
}, {
    classify: "input",
    key: "familyName",
    value: "姓",
    maxLength: 20,
    placeholder: PlaceHolder.PLACEHOLDER_FAMILY_NAME_VALUE,
    mustFill: "mast-fill",
    position: "left",
    isRequired: true
}, {
    classify: "input",
    key: "middleName",
    value: "中间名",
    maxLength: 20,
    placeholder: PlaceHolder.PLACEHOLDER_MIDDLE_NAME_VALUE,
    mustFill: "mast-fill",
    position: "right"
}, {
    classify: "input",
    key: "givenName",
    value: "名",
    maxLength: 20,
    placeholder: PlaceHolder.PLACEHOLDER_GIVEN_NAME_VALUE,
    mustFill: "mast-fill",
    position: "left",
    isRequired: true
}, {
    classify: "input",
    key: "chineseName",
    value: "中国名",
    maxLength: 10,
    placeholder: PlaceHolder.PLACEHOLDER_CHINESE_NAME_VALUE,
    mustFill: "mast-fill",
    position: "right"
}, {
    classify: "select",
    key: "countryOfCitizenship",
    value: "国籍",
    options: [],
    mustFill: "mast-fill",
    position: "left"
}, {
    classify: "select",
    key: "gender",
    value: "性别",
    options: SEX,
    mustFill: "mast-fill",
    position: "right"
}, {
    classify: "datePicker",
    key: "dateOfBirth",
    value: "出生日期",
    format: dateFormat,
    disabled: true,
    mustFill: "mast-fill",
    position: "left",
    showTime: false,
    isRequired: true
}, {
    classify: "datePicker",
    key: "validUntil",
    value: "护照有效至",
    format: dateFormat,
    disabled: true,
    mustFill: "mast-fill",
    position: "right",
    showTime: false,
    isRequired: true
}, {
    classify: "input",
    key: "placeOfBirth",
    value: "出生地",
    maxLength: 25,
    placeholder: PlaceHolder.PLACEHOLDER_PLACE_OF_BIRTH_VALUE,
    mustFill: "mast-fill",
    position: "left",
    isRequired: true
}, {
    classify: "input",
    key: "passportNo",
    value: "护照号",
    maxLength: 25,
    placeholder: PlaceHolder.PLACEHOLDER_PASSPORT_NO_VALUE,
    mustFill: "mast-fill",
    position: "right",
    isRequired: true
}, {
    classify: "select",
    key: "religion",
    value: "宗教",
    options: [],
    mustFill: "mast-fill",
    position: "left"
}, {
    classify: "select",
    key: "marriageStatus",
    value: "婚姻状况",
    options: MARRIAGE_STATUS,
    mustFill: "mast-fill",
    position: "right"
}, {
    classify: "input",
    key: "occupation",
    value: "职业",
    maxLength: 25,
    placeholder: PlaceHolder.PLACEHOLDER_OCCUPATION_VALUE,
    mustFill: "mast-fill",
    position: "left",
    isRequired: true
}, {
    classify: "input",
    key: "institutionOrEmployer",
    value: "学校或工作单位",
    maxLength: 25,
    placeholder: PlaceHolder.PLACEHOLDER_INSTITUTION_OR_EMPLOYER_VALUE,
    mustFill: "mast-fill",
    position: "right",
    isRequired: true
}, {
    classify: "input",
    key: "phone",
    value: "手机号码",
    maxLength: 20,
    placeholder: PlaceHolder.PLACEHOLDER_PHONE_VALUE,
    mustFill: "mast-fill",
    position: "left",
    isRequired: true
}, {
    classify: "input",
    key: "email",
    value: "邮箱",
    maxLength: 45,
    placeholder: PlaceHolder.PLACEHOLDER_EMAIL_VALUE,
    mustFill: "mast-fill",
    position: "right",
    isRequired: true
}, {
    classify: "input",
    key: "homeCountryAddress",
    value: "本国住址",
    maxLength: 45,
    placeholder: PlaceHolder.PLACEHOLDER_HOME_COUNTRY_ADDRESS_VALUE,
    mustFill: "mast-fill",
    position: "left",
    isRequired: true
}, {
    classify: "input",
    key: "zipCode",
    value: "邮编",
    maxLength: 25,
    placeholder: PlaceHolder.PLACEHOLDER_ZIP_CODE_VALUE,
    mustFill: "mast-fill",
    position: "right",
    isRequired: true
}, {
    classify: "input",
    key: "fax",
    value: "传真",
    maxLength: 25,
    placeholder: PlaceHolder.PLACEHOLDER_FAX_VALUE,
    mustFill: "mast-fill",
    position: "left"
}, {
    classify: "input",
    key: "mailingAddress",
    value: "收件地址",
    maxLength: 45,
    placeholder: PlaceHolder.PLACEHOLDER_MAILING_ADDRESS_VALUE,
    mustFill: "mast-fill",
    position: "right",
    isRequired: true
}, {
    classify: "input",
    key: "receiver",
    value: "收件人",
    maxLength: 15,
    placeholder: PlaceHolder.PLACEHOLDER_RECEIVER_VALUE,
    mustFill: "mast-fill",
    position: "left",
    isRequired: true
}, {
    classify: "select",
    key: "englishAbility",
    value: "英语能力",
    options: CHINESE_OR_ENGLISH_ABILITY,
    mustFill: "chinese-fluency",
    position: "left"
}, {
    classify: "select",
    key: "chineseAbility",
    value: "汉语能力",
    options: CHINESE_OR_ENGLISH_ABILITY,
    mustFill: "chinese-fluency",
    position: "right"
}, {
    classify: "select",
    key: "otherLanguageAbility",
    value: "其他语言能力",
    options: CHINESE_OR_ENGLISH_ABILITY,
    mustFill: "chinese-fluency",
    position: "left"
}, {
    classify: "input",
    key: "otherLanguage",
    value: "其他语言",
    maxLength: 45,
    placeholder: PlaceHolder.PLACEHOLDER_OTHER_LANGUAGE_VALUE,
    mustFill: "chinese-fluency",
    position: "right"
}, {
    classify: "input",
    key: "recommendedBy",
    value: "推荐单位（人）",
    maxLength: 45,
    placeholder: PlaceHolder.PLACEHOLDER_RECOMMENDED_BY_VALUE,
    mustFill: "other-information",
    position: "left"
}, {
    classify: "input",
    key: "contactPerson",
    value: "联系人",
    maxLength: 15,
    placeholder: PlaceHolder.PLACEHOLDER_CONTACT_PERSON_VALUE,
    mustFill: "other-information",
    position: "right"
}, {
    classify: "input",
    key: "recommendAddress",
    value: "联系地址",
    maxLength: 45,
    placeholder: PlaceHolder.PLACEHOLDER_RECOMMEND_ADDRESS_VALUE,
    mustFill: "other-information",
    position: "left"
}, {
    classify: "input",
    key: "contactTel",
    value: "联系人手机",
    maxLength: 20,
    placeholder: PlaceHolder.PLACEHOLDER_CONTACT_TEL_VALUE,
    mustFill: "other-information",
    position: "right"
}, {
    classify: "input",
    key: "majorOrStudy",
    value: "专业(方向)",
    maxLength: 45,
    placeholder: PlaceHolder.PLACEHOLDER_MAJOR_OR_STUDY_VALUE,
    mustFill: "chinese-fluency",
    position: "left",
    isRequired: true
}, {
    classify: "input",
    key: "chinaContactName",
    value: "在华事务联系人",
    maxLength: 15,
    placeholder: PlaceHolder.PLACEHOLDER_CHINA_CONTACT_NAME_VALUE,
    mustFill: "other-information",
    position: "left"
}, {
    classify: "input",
    key: "chinaContactPhone",
    value: "在华事务联系人手机",
    maxLength: 20,
    placeholder: PlaceHolder.PLACEHOLDER_CHINA_CONTACT_PHONE_VALUE,
    mustFill: "other-information",
    position: "right"
}, {
    classify: "input",
    key: "chinaContactEmail",
    value: "在华事务联系人邮箱",
    maxLength: 45,
    placeholder: PlaceHolder.PLACEHOLDER_CHINA_CONTACT_EMAIL_VALUE,
    mustFill: "other-information",
    position: "left"
}, {
    classify: "input",
    key: "chinaContactAddress",
    value: "在华事务联系人地址",
    maxLength: 45,
    placeholder: PlaceHolder.PLACEHOLDER_CHINA_CONTACT_ADDRESS_VALUE,
    mustFill: "other-information",
    position: "right"
}, {
    classify: "datePicker",
    key: "durationOfStudyFrom",
    value: "学习开始日期",
    disabled: false,
    format: timeFormat,
    mustFill: "chinese-fluency",
    position: "right",
    showTime: true,
    isRequired: true
}, {
    classify: "datePicker",
    key: "durationOfStudyTo",
    value: "学习结束日期",
    disabled: false,
    format: timeFormat,
    mustFill: "chinese-fluency",
    position: "left",
    showTime: true,
    isRequired: true
}, {
    classify: "select",
    key: "financialResource",
    value: "经费来源",
    options: FINANCIAL_RESOURCE,
    mustFill: "other-information",
    position: "left"

}, {
    classify: "select",
    key: "category",
    value: "申请类别",
    options: CATEGORY,
    mustFill: "chinese-fluency",
    position: "right"
}];

export default applicationFormIntegration;