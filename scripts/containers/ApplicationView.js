/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Row, Col, Button, Card, Pagination, Modal, Alert} from "antd";
import {getApplicationList, addOrChangeApplicationForms} from "../actions/application_action";
import localStorageObject from "../config/localStorage";
import storageData from "../config/storageData";
import applicationFormTitle from "../config/applicationFormTitle";
import applicationColumn from "../config/applicationConfig";
import applicationFormIntegration from "../config/applicationFormIntegration";
import applicationFormMode from "../config/applicationFormMode";
import Error from "../prompt/error_prompt";
import {Table} from "../components/Table/index";
import {NullComponent} from "../components/NullComponent/index";
import moment from "moment";
import "../../stylesheets/application.css";
import "../../stylesheets/windowScrollBar.css"

/**
 * 查看申请表
 * @type {string}
 */
const lookOverTitle = "查看申请表";
//每页条数
const PAGE_SIZE = 20;
//日期格式规范
const dateFormat = 'YYYY-MM-DD';
//时间格式规范
const timeFormat = 'YYYY-MM-DD HH:mm:ss';
//申请表保存或者提交
const applicationFormSubmit = ["保存", "提交"];
//Select第一部分所有状态名
const applicationFormPartSelect = ["gender", "marriageStatus"];
//Select第二部分所有状态名
const applicationFormPartSelectAno = ["englishAbility", "chineseReading", "chineseSpeaking", "chineseListening", "chineseWriting", "otherLanguageAbility"];
//Select最后一部分所有状态名
const applicationFormPartSelectEnd = ["financialResource", "category"];
//Input所有状态名+限制长度
const applicationFormPartAll = [{
    key: "familyName",
    maxLength: 20
}, {
    key: "middleName",
    maxLength: 20
}, {
    key: "givenName",
    maxLength: 20
}, {
    key: "chineseName",
    maxLength: 10
}, {
    key: "countryOfCitizenship",
    maxLength: 25
}, {
    key: "placeOfBirth",
    maxLength: 25
}, {
    key: "passportNo",
    maxLength: 25
}, {
    key: "religion",
    maxLength: 25
}, {
    key: "occupation",
    maxLength: 25
}, {
    key: "institutionOrEmployer",
    maxLength: 25
}, {
    key: "phone",
    maxLength: 20
}, {
    key: "email",
    maxLength: 45
}, {
    key: "homeCountryAddress",
    maxLength: 45
}, {
    key: "zipCode",
    maxLength: 25
}, {
    key: "fax",
    maxLength: 25
}, {
    key: "mailingAddress",
    maxLength: 45
}, {
    key: "receiver",
    maxLength: 15
}, {
    key: "otherLanguage",
    maxLength: 45
}, {
    key: "recommendedBy",
    maxLength: 45
}, {
    key: "contactPerson",
    maxLength: 15
}, {
    key: "recommendAddress",
    maxLength: 45
}, {
    key: "contactTel",
    maxLength: 20
}, {
    key: "majorOrStudy",
    maxLength: 45
}, {
    key: "chinaContactName",
    maxLength: 15
}, {
    key: "chinaContactPhone",
    maxLength: 20
}, {
    key: "chinaContactEmail",
    maxLength: 45
}, {
    key: "chinaContactAddress",
    maxLength: 45
}, {
    key: "formName",
    maxLength: 45
}];
//Input第一部分所有状态名+限制长度
const applicationFormPartInput = [{
    key: "familyName",
    maxLength: 20
}, {
    key: "middleName",
    maxLength: 20
}, {
    key: "givenName",
    maxLength: 20
}, {
    key: "chineseName",
    maxLength: 10
}, {
    key: "countryOfCitizenship",
    maxLength: 25
}];
//Input第二部分所有状态名+限制长度
const applicationFormPartInputAno = [{
    key: "placeOfBirth",
    maxLength: 25
}, {
    key: "passportNo",
    maxLength: 25
}, {
    key: "religion",
    maxLength: 25
}];
//Input第三部分所有状态名+限制长度
const applicationFormPartInputThen = [{
    key: "occupation",
    maxLength: 25
}, {
    key: "institutionOrEmployer",
    maxLength: 25
}, {
    key: "phone",
    maxLength: 20
}, {
    key: "email",
    maxLength: 45
}, {
    key: "homeCountryAddress",
    maxLength: 45
}, {
    key: "zipCode",
    maxLength: 25
}, {
    key: "fax",
    maxLength: 25
}, {
    key: "mailingAddress",
    maxLength: 45
}, {
    key: "receiver",
    maxLength: 15
}];
//Input最后一部分所有状态名+限制长度
const applicationFormPartInputEnd = [{
    key: "otherLanguage",
    maxLength: 45
}, {
    key: "recommendedBy",
    maxLength: 45
}, {
    key: "contactPerson",
    maxLength: 15
}, {
    key: "recommendAddress",
    maxLength: 45
}, {
    key: "contactTel",
    maxLength: 20
}, {
    key: "majorOrStudy",
    maxLength: 45
}, {
    key: "chinaContactName",
    maxLength: 15
}, {
    key: "chinaContactPhone",
    maxLength: 20
}, {
    key: "chinaContactEmail",
    maxLength: 45
}, {
    key: "chinaContactAddress",
    maxLength: 45
}, {
    key: "formName",
    maxLength: 45
}];
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

class ApplicationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //登录用户id
            id: 0,
            //申请单id
            formId: 0,
            //登录用户名
            account: "",
            //登录密码
            password: "",
            //分页页数
            current: 1,
            //申请单列表
            applicationList: [],
            //添加、查看或者修改申请表单弹框是否弹出
            visible: false,
            //添加、查看或者修改申请表单的标题
            title: "",
            //添加、查看或者修改申请表单的保存、提交
            submit: "",
            //保存或者提交
            saveOrSubmit: false,
            //姓
            familyName: "",
            //中间名
            middleName: "",
            //名
            givenName: "",
            //中国名
            chineseName: "",
            //国籍
            countryOfCitizenship: "",
            //头像url
            avatar: "",
            //性别
            gender: "M",
            //出生日期
            dateOfBirth: null,
            //出生地
            placeOfBirth: "",
            //护照号
            passportNo: "",
            //护照有效期
            validUntil: null,
            //宗教
            religion: "",
            //婚姻状况
            marriageStatus: "N",
            //职业
            occupation: "",
            //学校或工作单位
            institutionOrEmployer: "",
            //手机号码
            phone: "",
            //邮箱
            email: "",
            //本国住址
            homeCountryAddress: "",
            //邮编
            zipCode: "",
            //传真
            fax: "",
            //收件地址
            mailingAddress: "",
            //收件人
            receiver: "",
            //英语能力
            englishAbility: "A",
            //汉语阅读
            chineseReading: "A",
            //口语
            chineseSpeaking: "A",
            //听
            chineseListening: "A",
            //写
            chineseWriting: "A",
            //其他语言能力
            otherLanguageAbility: "A",
            //其他语言
            otherLanguage: "",
            //推荐单位（人）
            recommendedBy: "",
            //联系人
            contactPerson: "",
            //联系地址
            recommendAddress: "",
            //联系人手机
            contactTel: "",
            //专业(方向)
            majorOrStudy: "",
            //经费来源
            financialResource: "A",
            //在华事务联系人
            chinaContactName: "",
            //在华事务联系人手机
            chinaContactPhone: "",
            //在华事务联系人邮箱
            chinaContactEmail: "",
            //在华事务联系人地址
            chinaContactAddress: "",
            //申请单标识名
            formName: "",
            //学习开始日期
            durationOfStudyFrom: null,
            //学习结束日期
            durationOfStudyTo: null,
            //申请类别
            category: "A",
            //学习开始日期控制弹层是否展开
            durationOfStudyFromOpen: false,
            //学习结束日期控制弹层是否展开
            durationOfStudyToOpen: false,
            //出生日期控制弹层是否展开
            dateOfBirthOpen: false,
            //护照有效期控制弹层是否展开
            validUntilOpen: false,
            //是否弹出错误提示框
            isError: false,
            //是否弹出警告提示框
            isWarn: false,
            //是否弹出成功提示框
            isSuccess: false,
            //错误提示语
            errorPrompt: "",
            //警告提示语
            warnPrompt: "",
            //成功提示语
            successPrompt: "",
            //表单是否可编辑
            formDisabled: false
        }
    }

    componentWillMount() {
        //组件开始装载,获取用户数据
        this.fetchData();
    }

    componentDidMount() {
        const {id, current} = this.state;
        //发出获取申请单列表ajax请求
        let application_action = getApplicationList.bind(this);
        application_action(id, current, PAGE_SIZE);
    }

    /**
     * 获取用户信息
     */
    fetchData() {
        //从localStorage中获取到登录之后传入的用户数据信息
        let storage_action = localStorageObject.getLocalStorage.bind(this);
        storage_action(storageData);
    }

    /**
     * 校验申请表中所有字段
     */
    onCheck(keyArray) {
        for (let i = 0; i < keyArray.length; i++) {
            if (this.state[keyArray[i]["key"]] === "") {
                this.showErrorPrompt(Error["NULL_" + keyArray[i]["key"].toUpperCase() + "_VALUE"]);
                return false;
            }
            if (this.state[keyArray[i]["key"]].length > keyArray[i]["maxLength"]) {
                this.showErrorPrompt(Error["EXCESS_" + keyArray[i]["key"].toUpperCase() + "_LENGTH"]);
                return false;
            }
        }
        return true;
    }

    /**
     * 设置错误、警告或者成功提示语状态
     * @param isError
     * @param isWarn
     * @param isSuccess
     */
    setPromptTrueOrFalse(isError, isWarn, isSuccess) {
        this.setState({
            isError,
            isWarn,
            isSuccess
        });
    }

    /**
     * 集成表单提示状态
     * @param prompt
     */
    showErrorPrompt(prompt) {
        this.setPromptTrueOrFalse(true, false, false);
        this.setState({
            errorPrompt: prompt
        });
    }

    /**
     * 初始化添加、查看或者修改的申请表单
     */
    initApplication() {
        this.setState({
            //申请单id
            formId: 0,
            //姓
            familyName: "",
            //中间名
            middleName: "",
            //名
            givenName: "",
            //中国名
            chineseName: "",
            //国籍
            countryOfCitizenship: "",
            //头像url
            avatar: "",
            //性别
            gender: "M",
            //出生日期
            dateOfBirth: null,
            //出生地
            placeOfBirth: "",
            //护照号
            passportNo: "",
            //护照有效期
            validUntil: null,
            //宗教
            religion: "",
            //婚姻状况
            marriageStatus: "N",
            //职业
            occupation: "",
            //学校或工作单位
            institutionOrEmployer: "",
            //手机号码
            phone: "",
            //邮箱
            email: "",
            //本国住址
            homeCountryAddress: "",
            //邮编
            zipCode: "",
            //传真
            fax: "",
            //收件地址
            mailingAddress: "",
            //收件人
            receiver: "",
            //英语能力
            englishAbility: "A",
            //汉语阅读
            chineseReading: "A",
            //口语
            chineseSpeaking: "A",
            //听
            chineseListening: "A",
            //写
            chineseWriting: "A",
            //其他语言能力
            otherLanguageAbility: "A",
            //其他语言
            otherLanguage: "",
            //推荐单位（人）
            recommendedBy: "",
            //联系人
            contactPerson: "",
            //联系地址
            recommendAddress: "",
            //联系人手机
            contactTel: "",
            //专业(方向)
            majorOrStudy: "",
            //经费来源
            financialResource: "A",
            //在华事务联系人
            chinaContactName: "",
            //在华事务联系人手机
            chinaContactPhone: "",
            //在华事务联系人邮箱
            chinaContactEmail: "",
            //在华事务联系人地址
            chinaContactAddress: "",
            //申请单标识名
            formName: "",
            //学习开始日期
            durationOfStudyFrom: null,
            //学习结束日期
            durationOfStudyTo: null,
            //申请类别
            category: "A",
            //学习开始日期控制弹层是否展开
            durationOfStudyFromOpen: false,
            //学习结束日期控制弹层是否展开
            durationOfStudyToOpen: false,
            //出生日期控制弹层是否展开
            dateOfBirthOpen: false,
            //护照有效期控制弹层是否展开
            validUntilOpen: false,
            //表单是否可编辑
            formDisabled: false
        });
        //初始化提示语状态
        this.setPromptTrueOrFalse(false, false, false);
    }

    /**
     * 表格为空时,render内容结构
     * @returns {XML}
     */
    renderNull() {
        return (
            <NullComponent />
        )
    }

    /**
     * render渲染申请单表格结构
     */
    renderTable() {
        const {applicationList, id} = this.state;
        const {getApplicationFormsAlready} = this;
        return (
            <Table
                id={id}
                columns={applicationColumn}
                dataSource={applicationList}
                getApplicationFormsAlready={getApplicationFormsAlready.bind(this)}
            />
        )
    }

    /**
     * 集成添加或修改申请表单所有状态、方法和长度限制
     * @returns {*}
     */
    renderFormMode() {
        const {formDisabled} = this.state;
        return [
            applicationFormPartInput.map((inputItem, index) => {
                return {
                    content: this.state[inputItem["key"]],
                    func: this.onChangeInput.bind(this),
                    disabled: formDisabled,
                    maxLength: inputItem["maxLength"]
                }
            }),
            {
                content: this.state[applicationFormPartSelect[0]],
                func: this.onChangeSelect.bind(this),
                disabled: formDisabled
            },
            applicationFormPartDatePicker.map((datePickerItem, datePickerIndex) => {
                return {
                    content: this.state[datePickerItem["key"]] ? moment(this.state[datePickerItem["key"]], dateFormat) : this.state[datePickerItem["key"]],
                    func: this.onChangeDatePicker.bind(this),
                    disabled: formDisabled,
                    maxLength: 0,
                    open: this.state[datePickerItem["key"] + "Open"],
                    openFunc: this.onChangeDatePickerOpen.bind(this)
                }
            }),
            applicationFormPartInputAno.map((inputItem, index) => {
                return {
                    content: this.state[inputItem["key"]],
                    func: this.onChangeInput.bind(this),
                    disabled: formDisabled,
                    maxLength: inputItem["maxLength"]
                }
            }),
            {
                content: this.state[applicationFormPartSelect[1]],
                func: this.onChangeSelect.bind(this),
                disabled: formDisabled
            },
            applicationFormPartInputThen.map((inputItem, index) => {
                return {
                    content: this.state[inputItem["key"]],
                    func: this.onChangeInput.bind(this),
                    disabled: formDisabled,
                    maxLength: inputItem["maxLength"]
                }
            }),
            applicationFormPartSelectAno.map((selectItem, selectIndex) => {
                return {
                    content: this.state[selectItem],
                    func: this.onChangeSelect.bind(this),
                    disabled: formDisabled
                }
            }),
            applicationFormPartInputEnd.map((inputItem, index) => {
                return {
                    content: this.state[inputItem["key"]],
                    func: this.onChangeInput.bind(this),
                    disabled: formDisabled,
                    maxLength: inputItem["maxLength"]
                }
            }),
            applicationFormPartDatePickerEnd.map((datePickerItem, datePickerIndex) => {
                return {
                    content: this.state[datePickerItem["key"]] ? moment(this.state[datePickerItem["key"]], timeFormat) : this.state[datePickerItem["key"]],
                    func: this.onChangeDatePicker.bind(this),
                    disabled: formDisabled,
                    maxLength: 0,
                    open: this.state[datePickerItem["key"] + "Open"],
                    openFunc: this.onChangeDatePickerOpen.bind(this),
                    disabledFunc: this.onDisabledDatePicker.bind(this)
                }
            }),
            applicationFormPartSelectEnd.map((selectItem, selectIndex) => {
                return {
                    content: this.state[selectItem],
                    func: this.onChangeSelect.bind(this),
                    disabled: formDisabled
                }
            })
        ]
    }

    /**
     * Input框内容发生改变时,所调方法
     * @param key
     * @param evt
     */
    onChangeInput(key, evt) {
        this.setState({
            [key]: evt.target.value
        });
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * Select框内容发生改变时,所调方法
     * @param key
     * @param value
     */
    onChangeSelect(key, value) {
        this.setState({
            [key]: value
        });
    };

    /**
     * DatePicker框内容发生改变时,所调方法
     * @param key
     * @param value
     */
    onChangeDatePicker(key, value) {
        this.setState({
            [key]: value
        });
    }

    /**
     * DatePicker框控制是否弹出,所调方法
     * @param key
     * @param open
     */
    onChangeDatePickerOpen(key, open) {
        this.setState({
            [key]: open
        });
    }

    /**
     * 设置不可点击的DatePicker时间
     * @param current
     */
    onDisabledDatePicker(current) {
        return current && current.valueOf() < Date.now();
    }

    /**
     * 申请表单分栏
     * @returns {{formRowSingle: Array, formRowDouble: Array}}
     */
    renderFormRow() {
        let formMode = this.renderFormMode();
        let formResult = [];
        let formRow = {
            //左边列
            formRowSingle: [],
            //右边列
            formRowDouble: []
        };
        //分散添加、查看或者修改申请表单所有状态、方法和长度限制
        formMode.map((modeItem, modeIndex) => {
            if (Object.prototype.toString.call(modeItem) === "[object Object]") {
                formResult.push(modeItem);
            }
            if (Object.prototype.toString.call(modeItem) === "[object Array]") {
                modeItem.forEach((item, index) => {
                    formResult.push(item);
                });
            }
        });
        //集成添加、查看或者修改申请表单所有状态、方法和长度限制对象
        applicationFormIntegration.map((integrationItem, integrationIndex) => {
            let row = <Row
                key={integrationItem["name"] + "_" + integrationIndex}
                className="application-row"
            >
                <Col span="11" className="application-col">
                    {integrationItem["name"]}
                </Col>
                <Col span="1">

                </Col>
                <Col span="12">
                    {
                        integrationItem.main.bind(this)(formResult[integrationIndex]["content"], formResult[integrationIndex]["func"], formResult[integrationIndex]["disabled"], formResult[integrationIndex]["maxLength"], formResult[integrationIndex]["open"], formResult[integrationIndex]["openFunc"], formResult[integrationIndex]["disabledFunc"])
                    }
                </Col>
            </Row>;
            if (integrationIndex % 2 === 0) {
                formRow["formRowSingle"].push(row)
            } else {
                formRow["formRowDouble"].push(row);
            }
        });
        return formRow;
    }


    /**
     * render渲染申请单表单结构
     * @returns {XML}
     */
    renderForm() {
        const {visible, title, submit, saveOrSubmit} = this.state;
        let formRow = this.renderFormRow();
        return (
            <Modal
                visible={visible}
                title={title}
                className="application-modal"
                wrapClassName="application-modal-wrapper"
                width={960}
                okText={submit}
                cancelText="取消"
                onOk={saveOrSubmit ? this.submitApplication.bind(this) : this.saveApplication.bind(this)}
                onCancel={this.cancelApplication.bind(this)}
            >
                {this.renderAlert()}
                <Row>
                    <Col span="11">
                        {
                            formRow["formRowSingle"].map((singleItem, singleIndex) => {
                                return singleItem;
                            })
                        }
                    </Col>
                    <Col span="13">
                        {
                            formRow["formRowDouble"].map((doubleItem, doubleIndex) => {
                                return doubleItem;
                            })
                        }
                    </Col>
                </Row>
            </Modal>
        )
    }

    /**
     * render渲染提示语
     */
    renderAlert() {
        const {isError, isWarn, isSuccess, errorPrompt, warnPrompt, successPrompt} = this.state;
        return (
            <div className="application-alert">
                {
                    isError && <Alert type="error" message={errorPrompt} showIcon/>
                }
                {
                    isWarn && <Alert type="warning" message={warnPrompt} showIcon/>
                }
                {
                    isSuccess && <Alert type="success" message={successPrompt} showIcon/>
                }
            </div>
        )
    }

    /**
     * render渲染分页结构
     * @returns {XML}
     */
    renderPagination() {
        const {current, applicationList} = this.state;
        return (
            <Pagination
                current={current}
                showQuickJumper
                className="application-pagination"
                size="large"
                pageSize={PAGE_SIZE}
                total={applicationList.length}
                showTotal={total => "共" + total + "条"}
                onChange={this.changeApplicationPage.bind(this)}
            />
        )
    }

    /**
     * 添加申请表单
     * @param evt
     */
    addApplication = (evt) => {
        this.setState({
            visible: true,
            title: applicationFormTitle[0],
            submit: applicationFormSubmit[0],
            saveOrSubmit: false
        });
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 点击申请表列表,通过id获取到某一个form表单的表单数据
     * @param formObject
     * @param formId
     */
    getApplicationFormsAlready(formObject) {
        this.setState({
            visible: true,
            title: applicationFormTitle[1] === lookOverTitle &&
            <div className="application-look-over">
                查看申请表
                <Button
                    size="large"
                    type="primary"
                    className="application-edit-button"
                    onClick={this.editApplication.bind(this)}
                >
                    编辑
                </Button>
            </div>,
            submit: applicationFormSubmit[1],
            formDisabled: true,
            saveOrSubmit: true
        });
        for (let objectItemKey in formObject) {
            if (objectItemKey === "id") {
                this.setState({
                    formId: formObject[objectItemKey]
                });
            } else if (objectItemKey === "studentId") {
                this.setState({
                    id: formObject[objectItemKey]
                });
            } else {
                this.setState({
                    [objectItemKey]: formObject[objectItemKey]
                });
            }
        }
    }

    /**
     * 点击编辑按钮,编辑修改申请单
     * @param evt
     */
    editApplication = (evt) => {
        this.setState({
            title: applicationFormTitle[2],
            submit: applicationFormSubmit[0],
            formDisabled: false,
            saveOrSubmit: false
        });
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 返回集成的表单对象
     * @returns {{}}
     */
    returnFormsObject() {
        const {id} = this.state;
        let forms = {};
        let mode = applicationFormMode;
        for (let i = 0; i < mode.length; i++) {
            if (mode[i]["key"] === "dateOfBirth" || mode[i]["key"] === "validUntil") {
                forms[mode[i]["key"]] = moment(this.state[mode[i]["key"]]).format('YYYY-MM-DD');
            } else if (mode[i]["key"] === "durationOfStudyFrom" || mode[i]["key"] === "durationOfStudyTo") {
                forms[mode[i]["key"]] = moment(this.state[mode[i]["key"]]).format('YYYY-MM-DD HH:mm:ss');
            } else {
                forms[mode[i]["key"]] = this.state[mode[i]["key"]];
            }
        }
        forms["studentId"] = id;
        return forms;
    }

    /**
     * 点击保存按钮,发出添加申请表单的ajax请求
     * @param evt
     */
    saveApplication = (evt) => {
        const {id, current, formId} = this.state;
        let checked = this.onCheck(applicationFormPartAll);
        if (checked) {
            let forms = this.returnFormsObject();
            //添加或者修改申请表单发出ajax请求
            let add_application = addOrChangeApplicationForms.bind(this);
            add_application(forms, id, formId, current, PAGE_SIZE);
        }
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 点击提交按钮,发出
     * @param evt
     */
    submitApplication = (evt) => {
        let checked = this.onCheck(applicationFormPartAll);
        if (checked) {
            let forms = this.returnFormsObject();
        }
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 点击取消或者右上角的叉叉按钮,关闭弹窗
     * @param evt
     */
    cancelApplication = (evt) => {
        this.setState({
            visible: false
        });
        //初始化整个申请表单
        this.initApplication();
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 点击分页页码,页码样式变化且进行获取申请单列表的ajax请求
     * @param page
     * @param pageSize
     */
    changeApplicationPage = (page, pageSize) => {
        const {id} = this.state;
        this.setState({
            current: page
        });
        //发出获取申请单列表ajax请求
        let application_action = getApplicationList.bind(this);
        application_action(id, page, PAGE_SIZE);
    };

    /**
     * render最终渲染结构
     * @returns {XML}
     */
    render() {
        const {applicationList} = this.state;
        return (
            <section className="application-container">
                <Card title="申请表"
                      extra={
                          <Button
                              size="large"
                              className="application-add"
                              onClick={this.addApplication.bind(this)}
                          >
                              添加申请表
                          </Button>
                      }
                      className="application-card">
                    {
                        (applicationList && applicationList.length > 0) ? this.renderTable() : this.renderNull()
                    }
                    {
                        (applicationList && applicationList.length > 0) > 0 && this.renderPagination()
                    }
                    {this.renderForm()}
                </Card>
            </section>
        )
    }
}

export default ApplicationView;