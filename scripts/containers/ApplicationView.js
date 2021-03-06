/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Row, Col, Button, Card, Pagination, Modal, Alert, Input, Select, DatePicker, Spin} from "antd";
//API接口统一调用对象
import api from "../config/api";
import {uploadImageProps, uploadFileProps} from "../actions/upload_action";
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
//申请单状态dataIndex
const APPLY_STATUS = "applyStatus";
//每页条数
const PAGE_SIZE = 20;
//日期格式规范
const dateFormat = 'YYYY-MM-DD';
//时间格式规范
const timeFormat = 'YYYY-MM-DD HH:mm:ss';
//申请表保存或者提交
const applicationFormSubmit = ["保存", "提交"];
//申请表单里面的组件分类
const applicationFormClassify = ["input", "select", "datePicker", "fileUpload", "toolTip"];
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
            //头像
            avatar: "",
            //头像地址
            avatarSrc: "",
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
            transitionLoading: "application-spin-container application-spin-enterOrLeave",
            //附件
            appendix: ""
        }
    }

    /**
     * 组件开始装载
     */
    componentWillMount() {
        //组件开始装载,获取用户数据
        this.fetchData();
    }

    /**
     * 组件结束装载
     */
    componentDidMount() {
        const {id, current} = this.state;
        //设置state avatarSrc状态--获取添加、查看或者修改申请单上传的头像的url地址
        this.setState({
            avatarSrc: api.GET_APPLICATION_UPLOAD_AVATARS
        });
        //发出获取申请单列表ajax请求
        let application_action = getApplicationList.bind(this);
        application_action(id, current, PAGE_SIZE);
    }

    /**
     * 组件在移除前执行
     */
    componentWillUnmount() {
        //组件移除后,初始化添加、查看或者修改的申请表单
        this.initApplication();
        //组件移除后,清空添加、查看或者修改的头像地址
        this.setState({
            avatarSrc: ""
        });
    }

    /**
     * 获取用户信息
     */
    fetchData() {
        //从localStorage中获取到登录之后传入的用户数据信息(登录用户id,登录用户名account,登录密码password)
        let storage_action = localStorageObject.getLocalStorage.bind(this);
        storage_action(storageData);
    }

    /**
     * 获取宗教和国籍的列表
     */
    fetchCountryOrReligionData() {
        //获取国籍列表
        let get_countries = getCountriesOrReligions.bind(this);
        //state状态countryId,还有请求获取国籍列表的url作参数传过去
        get_countries(countryOrReligion[0], api.GET_COUNTRIES);
        //获取宗教列表
        let get_religions = getCountriesOrReligions.bind(this);
        //state状态religionId,还有请求获取宗教列表的url作参数传过去
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
        //设置错误提示状态
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
            //头像
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
            formDisabled: false,
            //附件
            appendix: ""
        });
        //初始化提示语状态
        this.setPromptTrueOrFalse(false, false, false);
    }

    /**
     * 列表为空时,render内容结构
     * @returns {XML}
     */
    renderNull() {
        //空列表组件NullComponent
        return (
            <NullComponent />
        )
    }

    /**
     * render渲染申请单列表结构
     */
    renderTable() {
        const {applicationList, id, loading} = this.state;
        const {
            //点击申请表列表,通过id获取到某一个form表单的表单数据,并setState到表单的每一个state状态
            getApplicationFormsAlready,
            //显示正在载入loading......(包括loading动画、loading标识和loading遮罩层)
            showLoading
        } = this;
        return (
            <Table
                id={id}
                anyStatus={APPLY_STATUS}
                loading={loading}
                columns={applicationColumn}
                dataSource={applicationList}
                showLoading={showLoading.bind(this)}
                getApplicationFormsAlready={getApplicationFormsAlready.bind(this)}
            />
        )
    }

    /**
     * 显示正在载入loading......
     */
    showLoading() {
        //先将承载正在载入loading的container元素进行显示
        this.setState({
            loadingBlock: true
        }, () => {
            //FIXME 在这里设置一个时间处理器,在100毫秒之后,将loading动画、loading标识和loading过渡动画遮罩层进行显示
            setTimeout(function timerControl() {
                this.setState({
                    //将loading动画和loading标识进行显示
                    loading: true,
                    //添加loading过渡动画遮罩层className样式表
                    transitionLoading: "application-spin-container application-spin-enterOrLeave application-spin-enterOrLeave-active"
                })
            }.bind(this), 100);
        });
    }

    /**
     * render渲染Upload上传添加申请表附件组件
     * @returns {XML}
     */
    renderFileUpload(innerUpload) {
        return (
            <Upload {...uploadFileProps.bind(this)(api.UPLOAD_ADD_APPLICATION_FILES)}>
                {innerUpload}
            </Upload>
        )
    }

    /**
     * render渲染Upload上传添加申请表附件内部组件
     * @returns {XML}
     */
    renderInnerFileUpload() {
        return (
            <div className="application-appendix-upload">
                <i className="iconfontSaaS saas-uploadFile">

                </i>
                <span className="application-appendix-description">
                     Appendix
                </span>
            </div>
        )
    }

    /**
     * render渲染添加申请表附件组件
     * @returns {XML}
     */
    renderFile(innerFile) {
        const {appendix} = this.state;
        return (
            <div className="application-appendix-file">
                <span>
                    {appendix}
                </span>
                {innerFile}
            </div>
        )
    }

    /**
     * render渲染查看申请表附件内部组件
     * @returns {XML}
     */
    renderInnerNoUpdateFile() {
        return (
            <div>

            </div>
        )
    }

    /**
     * render渲染添加申请表附件内部组件
     * @returns {XML}
     */
    renderInnerFile() {
        return (
            <span className="application-appendix-reUpload">
                重新上传
            </span>
        )
    }

    /**
     * render渲染附件组件提示语
     * @param tipTitle
     * @returns {XML}
     */
    renderToolTip(tipTitle) {
        return (
            <div className="application-appendix-tipTitle">
                <div className="application-appendix-arrow">
                </div>
                <div className="application-appendix-shadow">

                </div>
                <div className="application-appendix-content">
                    {tipTitle}
                </div>
            </div>
        )
    }

    /**
     * 集成添加、查看和修改申请表单所有组件
     * @returns {*}
     */
    renderFormMode(classify, key, value, placeholder, maxLength, format, options, disabled, showTime, tipTitle) {
        const {formDisabled} = this.state;
        const {
            //Input框内容发生改变时,所调方法
            onChangeInput,
            //Select框内容发生改变时,所调方法
            onChangeSelect,
            //DatePicker框内容发生改变时,所调方法
            onChangeDatePicker,
            //DatePicker框控制是否弹出,所调方法
            onChangeDatePickerOpen,
            //设置不可点击的DatePicker时间
            onDisabledDatePicker,
            //设置所有的时间都可点击,以前、现在和未来都可点击
            onDisabledDatePickerNull,
            //Upload上传添加申请表附件组件
            renderFileUpload,
            //Upload上传添加申请表附件内部组件
            renderInnerFileUpload,
            //添加申请表附件组件
            renderFile,
            //添加申请表附件内部组件
            renderInnerFile,
            //查看申请表附件内部组件
            renderInnerNoUpdateFile,
            //附件组件提示语
            renderToolTip
        } = this;
        //国家或者国籍都保存在state中
        //判断options是否为空数组
        options = this.judgeOptions(key, options);
        //Upload上传添加申请表附件组件
        const fileUpload = renderFileUpload.bind(this);
        //添加申请表附件组件
        const file = renderFile.bind(this);
        //Upload上传添加申请表附件内部组件
        const innerFileUpload = renderInnerFileUpload.bind(this);
        //添加申请表附件内部组件
        const innerFile = renderInnerFile.bind(this);
        //查看申请表附件内部组件
        const innerNoUpdateFile = renderInnerNoUpdateFile.bind(this);
        //对表单内的组件进行分类处理,Input,Select,DatePicker
        switch (classify) {
            case applicationFormClassify[0]:
                //Input输入框组件
                return (
                    <Input
                        //Input输入框大小--大型号
                        size="large"
                        //Input输入框类型--文本类型
                        type="text"
                        //Input框内默认提示语
                        placeholder={placeholder}
                        //Input框禁用状态
                        disabled={formDisabled}
                        //Input框内容长度限制,最多可输入多少字符
                        maxLength={maxLength}
                        //Input框内容状态
                        value={this.state[key]}
                        //Input框内容发生改变时,调用onChange事件
                        onChange={onChangeInput.bind(this, key)}
                    />
                );
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
            case applicationFormClassify[3]:
                /*state状态file是否为空或者null,决定渲染Upload上传添加申请表附件组件或者渲染附件组件,再根据state状态formDisabled是否为true,渲染查看申请表附件组件或者可修改申请表附件组件*/
                return (this.state[key] === "" || this.state[key] === null) ? fileUpload(innerFileUpload()) : formDisabled ? file(innerNoUpdateFile()) : file(fileUpload(innerFile()));
            case applicationFormClassify[4]:
                //根据state状态formDisabled是否为true,来确定是否渲染附件组件提示语
                return !formDisabled && renderToolTip.bind(this)(tipTitle);
            default:
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
     * 设置所有的时间都可点击,以前、现在和未来都可点击
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
            if (integrationItem["inList"]) {
                //集成添加、查看和修改申请表单所有组件、方法、禁用状态、提示语、状态、框内默认提示语和长度限制的react结构
                let row = <Row
                    key={integrationItem["key"] + "_" + integrationItem["value"]}
                    className={integrationItem["expandClassName"] ? integrationItem["className"] : "application-row"}
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
                            integrationItem["showTime"],
                            integrationItem["tipTitle"]
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
                        <i className="iconfontSaaS saas-personalInformation">

                        </i>
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
     * render渲染Upload上传添加或者修改申请表头像内部组件
     * @returns {XML}
     */
    renderInnerImageUpload() {
        return (
            <section className="application-avatar-upload">
                {/*iconFont 加号*/}
                <i className="iconfontSaaS saas-add">

                </i>
                <span className="application-avatar-description">Avatar</span>
            </section>
        )
    }

    /**
     * render渲染Upload上传添加或者修改申请表头像组件
     * @returns {XML}
     */
    renderImageUpload(innerUpload) {
        return (
            <Upload
                {...uploadImageProps.bind(this)(api.UPLOAD_APPLICATION_AVATARS)}
            >
                {innerUpload}
            </Upload>
        )
    }

    /**
     * render渲染添加或者修改申请表头像内部组件
     * @returns {XML}
     */
    renderInnerImage() {
        return (
            <div className="application-avatar-filter">
                <div className="application-avatar-character">
                    <i
                        className="iconfontSaaS saas-updateImage"
                        title="change avatar"
                    >

                    </i>
                </div>
            </div>
        )
    }

    /**
     * render渲染查看申请表头像内部组件
     * @returns {XML}
     */
    renderInnerNoUpdateImage() {
        return (
            <div>
            </div>
        )
    }

    /**
     * render渲染头像组件
     * @returns {XML}
     */
    renderImage(innerImage) {
        const {avatarSrc, avatar} = this.state;
        return (
            <section className="application-avatar-image">
                {innerImage}
                {/*以背景图background-size:cover的形式来展现头像*/}
                <div
                    className="application-avatar-show-image"
                    style={
                        {
                            background: "url(" + avatarSrc + "/" + avatar + ") no-repeat center center / " +
                            "cover border-box content-box"
                        }
                    }
                    title={avatar}
                >

                </div>
            </section>
        )
    }

    /**
     * render渲染必填域渲染结构
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
     * render渲染中文能力渲染结构
     * @param chineseFluency
     */
    renderChineseFluency(chineseFluency) {
        return (
            <div className="application-chinese-fluency">
                <div className="application-common-container">
                    <div className="chinese-fluency-title">
                    </div>
                    <div className="chinese-fluency-title-font">
                        <i className="iconfontSaaS saas-education">

                        </i>
                        Education
                    </div>
                </div>
                {this.renderFormCommon(chineseFluency)}
            </div>
        )
    }

    /**
     * render渲染其他信息渲染结构
     * @param otherInformation
     */
    renderOtherInformation(otherInformation) {
        return (
            <div className="application-other-information">
                <div className="application-common-container">
                    <div className="other-information-title">
                    </div>
                    <div className="other-information-title-font">
                        <i className="iconfontSaaS saas-otherInformation">

                        </i>
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
        const {visible, title, submit, saveOrSubmit, avatar, formDisabled} = this.state;
        const {
            //提交查看或者修改的申请表,添加申请关系
            submitApplication,
            //保存添加或者修改申请表的数据
            saveApplication,
            //按取消按钮或者右上角叉叉关闭添加、查看或者修改弹窗
            cancelApplication,
            //错误、警告和成功状态提示语部分
            renderAlert,
            //头部Focus图标和蓝色placeholder背景图
            renderFocusPlace,
            //表单内容顶部申请单标识名以及第一部分标题Including Person Information(must fill)
            renderFormName,
            //Upload上传添加或者修改申请表头像组件
            renderImageUpload,
            //Upload上传添加或者修改申请表头像内部组件
            renderInnerImageUpload,
            //添加或者修改申请表头像组件
            renderImage,
            //添加或者修改申请表头像内部组件
            renderInnerImage,
            //查看申请表头像内部组件
            renderInnerNoUpdateImage,
            //第一部分必填域
            renderMustFill,
            //第二部分中文能力
            renderChineseFluency,
            //第三部分其他信息
            renderOtherInformation,
            renderFormRow
        } = this;
        let formRow = renderFormRow.bind(this)();
        //Upload上传添加或者修改申请表头像内部组件
        const innerImageUpload = renderInnerImageUpload.bind(this);
        //添加或者修改申请表头像内部组件
        const innerImage = renderInnerImage.bind(this);
        //查看申请表头像内部组件
        const innerNoUpdateImage = renderInnerNoUpdateImage.bind(this);
        //当第一次上传完毕后,想要重新上传时,头像内部Upload上传添加或者修改申请表头像组件
        const uploadImage = renderImageUpload.bind(this, innerImage());
        return (
            <Modal
                visible={visible}
                title={title}
                className="application-modal"
                wrapClassName="application-modal-wrapper"
                width={960}
                okText={submit}
                cancelText="取消"
                onOk={saveOrSubmit ? submitApplication.bind(this) : saveApplication.bind(this)}
                onCancel={cancelApplication.bind(this)}
            >
                {/*错误、警告和成功状态提示语部分*/}
                {renderAlert.bind(this)()}
                {/*头部Focus图标和蓝色placeholder背景图*/}
                {renderFocusPlace.bind(this)()}
                {/*表单内容顶部申请单标识名以及第一部分标题Including Person Information(must fill)*/}
                {renderFormName.bind(this)()}
                {/*state状态avatar是否为空或者null,决定渲染Upload上传添加或者修改申请表头像组件或者渲染头像组件,再根据state状态formDisabled是否为true,渲染查看申请表头像或者可修改申请表头像*/}
                {(avatar === "" || avatar === null) ? renderImageUpload.bind(this)(innerImageUpload()) : formDisabled ? renderImage.bind(this)(innerNoUpdateImage()) : renderImage.bind(this)(uploadImage())}
                {/*第一部分必填域*/}
                {renderMustFill.bind(this)(formRow["formRowMustFill"])}
                {/*第二部分中文能力*/}
                {renderChineseFluency.bind(this)(formRow["formRowChineseFluency"])}
                {/*第三部分其他信息*/}
                {renderOtherInformation.bind(this)(formRow["formRowOtherInformation"])}
            </Modal>
        )
    }

    /**
     * render渲染分页结构
     * @returns {XML}
     */
    renderPagination() {
        const {current, applicationList} = this.state;
        const {changeApplicationPage} = this;
        return (
            <Pagination
                current={current}
                showQuickJumper
                className="application-pagination"
                size="large"
                pageSize={PAGE_SIZE}
                total={applicationList.length}
                showTotal={total => "共" + total + "条"}
                onChange={changeApplicationPage}
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
     * 隐藏正在载入loading......
     */
    loadingDisappear() {
        //隐藏正在载入loading......(包括loading动画、loading标识和loading遮罩层)
        this.setState({
            //隐藏loading动画和标识
            loading: false,
            //消除loading遮罩层
            loadingBlock: false,
            //动态过渡隐藏loading
            transitionLoading: "application-spin-container application-spin-enterOrLeave"
        });
    }

    /**
     * 点击申请表列表某一行数据,通过id获取到某一个form表单的表单数据,并setState到表单的每一个state状态
     * @param formObject
     */
    getApplicationFormsAlready(formObject) {
        const {fetchCountryOrReligionData, loadingDisappear} = this;
        //获取国籍和宗教列表
        fetchCountryOrReligionData.bind(this)();
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
            saveOrSubmit: true
        });
        //隐藏正在载入loading......(包括loading动画、loading标识和loading遮罩层)
        loadingDisappear.bind(this)();
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
     * 点击分页页码,页码内容和样式变化且进行获取申请单列表的ajax请求
     * @param page
     * @param pageSize
     */
    changeApplicationPage = (page, pageSize) => {
        const {id} = this.state;
        //页码内容和样式变化
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
                <Card title="Application"
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
                        (applicationList && applicationList.length > 0) && this.renderPagination()
                    }
                    {this.renderForm()}
                </Card>
                {this.renderSpin()}
            </section>
        )
    }
}

export default ApplicationView;