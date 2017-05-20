/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Row, Col, Button, Card, Pagination, Modal, Alert, Input, Select, DatePicker, Spin} from "antd";
//API接口统一调用对象
import api from "../config/api";
import {uploadProps} from "../actions/upload_action";
import {
    getApplicationList,
    addOrChangeApplicationForms,
    addApplyRelations,
    getCountriesOrReligions
} from "../actions/application_action";
import Upload from "rc-upload";
//封装的可设置、可获取、可删除本地数据和抛出异常状态的localStorage对象
import localStorageObject from "../config/localStorage";
//获取本地存储数据的对象属性模板
import storageData from "../config/storageData";
//申请表标题
import applicationFormTitle from "../config/applicationFormTitle";
//申请列表列描述数据对象
import applicationColumn from "../config/applicationConfig";
//集成添加、查看和修改申请表单所有提示语、状态、框内默认提示语和长度限制等一些属性
import applicationFormIntegration from "../config/applicationFormIntegration";
//根据必填、中文能力以及其他信息进行划分三块DIV结构模具
import mustFillClassify from "../config/mustFillClassify";
//错误提示语统一调用对象
import Error from "../prompt/error_prompt";
//申请列表,React结构组件
import {Table} from "../components/Table/index";
//申请列表为空时,React结构组件
import {NullComponent} from "../components/NullComponent/index";
//moment时间处理对象
import moment from "moment";
//引入申请表Tab页样式表
import "../../stylesheets/application.css";
//引入chrome谷歌浏览器美化滚动条样式表
import "../../stylesheets/windowScrollBar.css";

const Option = Select.Option;
//查看申请表
const lookOverTitle = "查看申请表";
//每页条数
const PAGE_SIZE = 20;
//日期格式规范
const dateFormat = 'YYYY-MM-DD';
//时间格式规范
const timeFormat = 'YYYY-MM-DD HH:mm:ss';
//申请表保存或者提交
const applicationFormSubmit = ["保存", "提交"];
//申请表单里面的组件分类
const applicationFormClassify = ["input", "select", "datePicker"];
//国籍或者宗教
const countryOrReligion = ["countryId", "religionId"];

class ApplicationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //登录用户id
            id: 0,
            //申请单id
            formId: 0,
            //学校id
            universityId: 0,
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
            countryId: "2",
            //国籍列表
            countryIdList: [],
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
            religionId: "1",
            //宗教列表
            religionIdList: [],
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
            //汉语能力
            chineseAbility: "A",
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
            formDisabled: false,
            //是否显示正在载入loading
            loading: false,
            //是否将承载正在载入loading的container元素进行显示
            loadingBlock: false,
            //动画过渡是否载入loading
            transitionLoading: "application-spin-container application-spin-enterOrLeave"
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
     * 获取宗教和国籍的列表
     */
    fetchCountryOrReligionData() {
        //获取国籍列表
        let get_countries = getCountriesOrReligions.bind(this);
        get_countries(countryOrReligion[0], api.GET_COUNTRIES);
        //获取宗教列表
        let get_religions = getCountriesOrReligions.bind(this);
        get_religions(countryOrReligion[1], api.GET_RELIGIONS);
    }

    /**
     * 校验集成添加、查看和修改申请表单所有提示语、状态、框内默认提示语和长度限制等一些属性中所有isRequired为true字段是否为空,校验所有的字段的长度限制
     */
    onCheck(keyArray) {
        for (let i = 0; i < keyArray.length; i++) {
            //在Input,DatePicker框中如果内容为空或者为null,
            //且集成添加、查看和修改申请表单所有提示语、状态、框内默认提示语和长度限制等一些属性中isRequired属性为true时,
            // 显示错误提示状态和错误提示语
            if ((this.state[keyArray[i]["key"]] === "" || this.state[keyArray[i]["key"]] === null) && keyArray[i]["isRequired"]) {
                this.showErrorPrompt(Error["NULL_" + keyArray[i]["key"].toUpperCase() + "_VALUE"]);
                return false;
            }
            //在Input,DatePicker,Select框中,
            //如果超出集成添加、查看和修改申请表单所有提示语、状态、框内默认提示语和长度限制等一些属性中maxLength属性长度限制,
            //显示错误提示状态和错误提示语
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
            //错误提示状态
            isError,
            //警告提示状态
            isWarn,
            //成功提示状态
            isSuccess
        });
    }

    /**
     * 集成表单错误提示状态和提示语
     * @param prompt
     */
    showErrorPrompt(prompt) {
        this.setPromptTrueOrFalse(true, false, false);
        //设置错误提示语
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
            countryId: "2",
            //国籍列表
            countryIdList: [],
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
            religionId: "1",
            //宗教列表
            religionIdList: [],
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
        const {applicationList, id, loading} = this.state;
        const {getApplicationFormsAlready} = this;
        return (
            <Table
                id={id}
                loading={loading}
                columns={applicationColumn}
                dataSource={applicationList}
                showLoading={this.showLoading.bind(this)}
                getApplicationFormsAlready={getApplicationFormsAlready.bind(this)}
            />
        )
    }

    /**
     * 显示正在载入loading......
     */
    showLoading() {
        this.setState({
            loadingBlock: true
        }, () => {
            setTimeout(function timerControl() {
                this.setState({
                    loading: true,
                    transitionLoading: "application-spin-container application-spin-enterOrLeave application-spin-enterOrLeave-active"
                })
            }.bind(this), 100);
        });
    }

    /**
     * 集成添加、查看和修改申请表单所有组件
     * @returns {*}
     */
    renderFormMode(classify, key, value, placeholder, maxLength, format, options, disabled, showTime) {
        const {formDisabled} = this.state;
        const {
            onChangeInput,
            onChangeSelect,
            onChangeDatePicker,
            onChangeDatePickerOpen,
            onDisabledDatePicker,
            onDisabledDatePickerNull
        } = this;
        //国家或者国籍都保存在state中
        //判断options是否为空数组
        options = this.judgeOptions(key, options);
        //对表单内的组件进行分类处理,Input,Select,DatePicker
        switch (classify) {
            case applicationFormClassify[0]:
                //Input输入框组件
                return (
                    <Input
                        size="large"
                        type="text"
                        placeholder={placeholder}
                        disabled={formDisabled}
                        maxLength={maxLength}
                        value={this.state[key]}
                        onChange={onChangeInput.bind(this, key)}
                    />
                );
                break;
            case applicationFormClassify[1]:
                //Select选择框组件
                return (
                    <Select
                        size="large"
                        disabled={formDisabled}
                        value={this.state[key]}
                        onChange={onChangeSelect.bind(this, key)}
                    >
                        {
                            options.map((optionItem, index) => {
                                return (
                                    <Option
                                        key={key + "-" + optionItem["key"]}
                                        value={optionItem["key"]}>
                                        {optionItem["value"]}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                );
                break;
            case applicationFormClassify[2]:
                //DatePicker时间框组件
                return (
                    <DatePicker
                        disabledDate={disabled ? onDisabledDatePickerNull.bind(this) : onDisabledDatePicker.bind(this)}
                        placeholder={value}
                        size="large"
                        disabled={formDisabled}
                        showTime={showTime ? true : false}
                        format={showTime ? timeFormat : dateFormat}
                        value={this.state[key] ? moment(this.state[key], format) : this.state[key]}
                        onChange={onChangeDatePicker.bind(this, key)}
                        open={this.state[key + "Open"]}
                        onOpenChange={onChangeDatePickerOpen.bind(this, key + "Open")}
                    />
                );
                break;
        }
    }

    /**
     * 国家或者国籍都保存在state中
     * 判断options是否为空数组
     * @param key
     * @param options
     */
    judgeOptions(key, options) {
        return options && options.length > 0 ? options : this.state[key + "List"];
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
     * 设置所有的时间都可点击,以前、现在和未来
     * @param current
     */
    onDisabledDatePickerNull(current) {
        return false;
    }

    /**
     * 申请表单分栏
     * @returns {{formRowSingle: Array, formRowDouble: Array}}
     */
    renderFormRow() {
        //集成添加、查看和修改申请表单所有组件、方法和禁用状态
        let {renderFormMode} = this;
        //集成添加、查看和修改申请表单所有提示语、状态、框内默认提示语和长度限制等一些属性
        let integration = applicationFormIntegration;
        ///集成添加、查看和修改申请表单最终渲染数据结构
        let formRow = {
            //第一部分必填域
            formRowMustFill: {
                left: [],
                right: []
            },
            //第二部分中文能力
            formRowChineseFluency: {
                left: [],
                right: []
            },
            //第三部分其他信息
            formRowOtherInformation: {
                left: [],
                right: []
            }
        };
        //实现添加、查看或者修改申请表单所有组件、状态、方法和长度限制对象
        integration.forEach((integrationItem, integrationIndex) => {
            if (integrationIndex !== 0) {
                //集成添加、查看和修改申请表单所有组件、方法、禁用状态、提示语、状态、框内默认提示语和长度限制的react结构
                let row = <Row
                    key={integrationItem["key"] + "_" + integrationItem["value"]}
                    className="application-row"
                >
                    <Col span="11" className="application-col">
                        {integrationItem["value"]}
                    </Col>
                    <Col span="1">

                    </Col>
                    <Col span="12">
                        {renderFormMode.bind(this)(
                            integrationItem["classify"],
                            integrationItem["key"],
                            integrationItem["value"],
                            integrationItem["placeholder"],
                            integrationItem["maxLength"],
                            integrationItem["format"],
                            integrationItem["options"],
                            integrationItem["disabled"],
                            integrationItem["showTime"]
                        )}
                    </Col>
                </Row>;
                //集成添加、查看和修改申请表单最终渲染react结构
                mustFillClassify.forEach((mustFillItem, mustFillIndex) => {
                    if (integrationItem[mustFillItem["navigation"]] === mustFillItem["key"]) {
                        if (integrationItem[mustFillItem["position"]] === mustFillItem["children"][0]) {
                            formRow[mustFillItem["value"]][mustFillItem["children"][0]].push(row);
                        } else {
                            formRow[mustFillItem["value"]][mustFillItem["children"][1]].push(row);
                        }
                    }
                });
            }
        });
        return formRow;
    }

    /**
     * 渲染结构
     * @param formArea
     * @returns {XML}
     */
    renderFormCommon(formArea) {
        return (
            <Row>
                <Col span="11">
                    {
                        formArea["left"].map((singleItem, singleIndex) => {
                            return singleItem;
                        })
                    }
                </Col>
                <Col span="13">
                    {
                        formArea["right"].map((doubleItem, doubleIndex) => {
                            return doubleItem;
                        })
                    }
                </Col>
            </Row>
        )
    }

    /**
     * render渲染提示语
     * @returns {XML}
     */
    renderAlert() {
        const {isError, isWarn, isSuccess, errorPrompt, warnPrompt, successPrompt} = this.state;
        return (
            <div className="application-alert">
                {/*错误提示语*/}
                {
                    isError && <Alert type="error" message={errorPrompt} showIcon/>
                }
                {/*警告提示语*/}
                {
                    isWarn && <Alert type="warning" message={warnPrompt} showIcon/>
                }
                {/*成功提示语*/}
                {
                    isSuccess && <Alert type="success" message={successPrompt} showIcon/>
                }
            </div>
        )
    }

    /**
     * render渲染添加色彩区域
     * @returns {XML}
     */
    renderFocusPlace() {
        return (
            <section className="application-section">
                <div className="application-section-img">
                    <img src="../../images/application_focus.png" title="留学focus" alt="留学focus"/>
                </div>
                <p className="application-section-declaration">
                    form apply
                </p>
            </section>
        )
    }

    /**
     * render渲染首行表单标识名
     * @returns {XML}
     */
    renderFormName() {
        //集成添加、查看和修改申请表单所有提示语、状态、框内默认提示语和长度限制等一些属性
        let integration = applicationFormIntegration;
        return (
            <div className="application-common">
                <div className="application-common-container">
                    <div className="must-fill-title">
                    </div>
                    <div className="must-fill-title-font">
                        Including Person Information
                    </div>
                </div>
                <Row className="application-row">
                    <Col span="12" className="application-col">
                        <span className="application-header-title">{integration[0]["value"]}</span>
                    </Col>
                    <Col span="12" className="application-col-formName">
                        {
                            this.renderFormMode(integration[0]["classify"], integration[0]["key"], integration[0]["maxLength"], integration[0]["placeholder"])
                        }
                    </Col>
                </Row>
            </div>
        )
    }

    /**
     * Upload上传头像组件
     * @returns {XML}
     */
    renderUpload() {
        return (
            <Upload
                {...uploadProps.bind(this)(api.UPLOAD_AVATARS)}
            >
                <section className="application-avatar-upload">
                    {/*iconFont 加号*/}
                    <i className="iconfontSaaS saas-add">

                    </i>
                    <span className="application-avatar-description">Avatar</span>
                </section>
            </Upload>
        )
    }

    /**
     * 头像组件
     * @returns {XML}
     */
    renderImage() {
        const {avatar} = this.state;
        return (
            <section className="application-avatar-image">
                <img src={avatar} alt={avatar}/>
            </section>
        )
    }

    /**
     * render必填域渲染结构
     * @param mustFill
     * @returns {XML}
     */
    renderMustFill(mustFill) {
        return (
            <div className="application-must-fill">
                {this.renderFormCommon(mustFill)}
            </div>
        )
    }

    /**
     * render中文能力渲染结构
     * @param chineseFluency
     */
    renderChineseFluency(chineseFluency) {
        return (
            <div className="application-chinese-fluency">
                <div className="application-common-container">
                    <div className="chinese-fluency-title">
                    </div>
                    <div className="chinese-fluency-title-font">
                        Education
                    </div>
                </div>
                {this.renderFormCommon(chineseFluency)}
            </div>
        )
    }

    /**
     * render其他信息渲染结构
     * @param otherInformation
     */
    renderOtherInformation(otherInformation) {
        return (
            <div className="application-other-information">
                <div className="application-common-container other-information-title">
                    <div className="other-information-title">
                    </div>
                    <div className="other-information-title-font">
                        Other Information
                    </div>
                </div>
                {this.renderFormCommon(otherInformation)}
            </div>
        )
    }


    /**
     * render渲染弹出框申请表单结构
     * @returns {XML}
     */
    renderForm() {
        const {visible, title, submit, saveOrSubmit, avatar} = this.state;
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
                {/*错误、警告和成功状态提示语部分*/}
                {this.renderAlert()}
                {/*头部Focus图标和蓝色placeholder背景图*/}
                {this.renderFocusPlace()}
                {/*表单内容顶部申请单标识名以及第一部分标题Including Person Information(must fill)*/}
                {this.renderFormName()}
                {/*state状态avatar是否为空,决定渲染Upload上传头像组件或者渲染头像组件*/}
                {avatar === "" ? this.renderUpload() : this.renderImage()}
                {/*第一部分必填域*/}
                {this.renderMustFill(formRow["formRowMustFill"])}
                {/*第一部分中文能力*/}
                {this.renderChineseFluency(formRow["formRowChineseFluency"])}
                {/*第一部分其他信息*/}
                {this.renderOtherInformation(formRow["formRowOtherInformation"])}
            </Modal>
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
     * 渲染正在载入loading
     * @returns {XML}
     */
    renderSpin() {
        const {loading, loadingBlock, transitionLoading} = this.state;
        return (
            <div className={transitionLoading} style={{display: loadingBlock ? "block" : "none"}}>
                <Spin
                    tip="loading......"
                    size="large"
                    spinning={loading}
                />
                <div className="application-spin-filter">
                </div>
            </div>
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
        this.fetchCountryOrReligionData.bind(this)();
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 点击申请表列表,通过id获取到某一个form表单的表单数据,并setState到表单的每一个state状态
     * @param formObject
     */
    getApplicationFormsAlready(formObject) {
        //获取国籍和宗教列表
        this.fetchCountryOrReligionData.bind(this)();
        this.setState({
            visible: true,
            title: applicationFormTitle[1] === lookOverTitle &&
            <div className="application-look-over">
                查看申请表
                <span
                    className="application-edit-button"
                    onClick={this.editApplication.bind(this)}
                >
                    <i className="iconfontSaaS saas-edit">

                    </i>
                    编辑
                </span>
            </div>,
            submit: applicationFormSubmit[1],
            formDisabled: true,
            saveOrSubmit: true,
            loading: false,
            loadingBlock: false,
            transitionLoading: "application-spin-container application-spin-enterOrLeave"
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
            } else if (objectItemKey === countryOrReligion[0] || objectItemKey === countryOrReligion[1]) {
                this.setState({
                    [objectItemKey]: formObject[objectItemKey].toString()
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
        let mode = applicationFormIntegration;
        for (let i = 0; i < mode.length; i++) {
            if (mode[i]["key"] === "dateOfBirth" || mode[i]["key"] === "validUntil") {
                forms[mode[i]["key"]] = moment(this.state[mode[i]["key"]]).format(dateFormat);
            } else if (mode[i]["key"] === "durationOfStudyFrom" || mode[i]["key"] === "durationOfStudyTo") {
                forms[mode[i]["key"]] = moment(this.state[mode[i]["key"]]).format(timeFormat);
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
        let checked = this.onCheck(applicationFormIntegration);
        if (checked) {
            let forms = this.returnFormsObject();
            //添加或者修改申请表单发出ajax请求
            let add_application = addOrChangeApplicationForms.bind(this);
            add_application(forms, id, formId, current, PAGE_SIZE);
        }
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 点击提交按钮,发出添加申请ajax请求
     * @param evt
     */
    submitApplication = (evt) => {
        const {id, formId, universityId, current} = this.state;
        //发出添加申请关系ajax请求
        let add_apply_relation_action = addApplyRelations.bind(this);
        add_apply_relation_action(id, formId, universityId, current, PAGE_SIZE);
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
     * render渲染最终react结构
     * @returns {XML}
     */
    render() {
        const {applicationList, loading} = this.state;
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
                {this.renderSpin()}
            </section>
        )
    }
}

export default ApplicationView;