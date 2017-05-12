/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Row, Col, Button, Card, Pagination, Modal, Input} from "antd";
import {getApplicationList} from "../actions/application_action";
import localStorageObject from "../config/localStorage";
import storageData from "../config/storageData";
import applicationColumn from "../config/applicationConfig";
import applicationFormIntegration from "../config/applicationFormIntegration";
import {Table} from "../components/Table/index";
import {NullComponent} from "../components/NullComponent/index";
import "../../stylesheets/application.css";
import "../../stylesheets/windowScrollBar.css"

//每页条数
const PAGE_SIZE = 20;
const applicationFormTitle = ["添加申请表", "修改申请表"];
//Select第一部分所有状态名
const applicationFormPartSelect = ["gender", "marriageStatus"];
//Select第二部分所有状态名
const applicationFormPartSelectAno = ["englishAbility", "chineseReading", "chineseSpeaking", "chineseListening", "chineseWriting", "otherLanguageAbility"];
//Select最后一部分所有状态名
const applicationFormPartSelectEnd = ["financialResource", "category", "applyStatus"];
//Input第一部分所有状态名
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
//Input第二部分所有状态名
const applicationFormPartInputAno = [{
    key: "dateOfBirth",
    maxLength: 25
}, {
    key: "placeOfBirth",
    maxLength: 25
}, {
    key: "passportNo",
    maxLength: 25
}, {
    key: "validUntil",
    maxLength: 25
}, {
    key: "religion",
    maxLength: 25
}];
//Input第三部分所有状态名
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
//Input最后一部分所有状态名
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
//DatePicker所有状态名
const applicationFormPartDatePicker = [
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
            //登录用户名
            account: "",
            //登录密码
            password: "",
            //分页页数
            current: 1,
            //申请单列表
            applicationList: [],
            //添加或者修改申请表单弹框是否弹出
            visible: false,
            //添加或者修改申请表单的标题
            title: "",
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
            dateOfBirth: "",
            //出生地
            placeOfBirth: "",
            //护照号
            passportNo: "",
            //护照有效期
            validUntil: "",
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
            category: "1",
            //申请单状态
            applyStatus: "N",
            //学习开始日期控制弹层是否展开
            durationOfStudyFromOpen: false,
            //学习结束日期控制弹层是否展开
            durationOfStudyToOpen: false
        }
    }

    componentWillMount() {
        //组件开始装载,获取用户数据
        this.fetchData();
    }

    componentDidMount() {
        const {id} = this.state;
        //发出获取申请单列表ajax请求
        let application_action = getApplicationList.bind(this);
        application_action(id);
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
        const {applicationList} = this.state;
        return (
            <Table
                columns={applicationColumn}
                dataSource={applicationList}
            />
        )
    }

    /**
     * 集成添加或修改申请表单所有状态、方法和长度限制
     * @returns {*}
     */
    renderFormMode() {
        return [
            applicationFormPartInput.map((inputItem, index) => {
                return {
                    content: this.state[inputItem["key"]],
                    func: this.onChangeInput.bind(this),
                    maxLength: inputItem["maxLength"]
                }
            }),
            {
                content: this.state[applicationFormPartSelect[0]],
                func: this.onChangeSelect.bind(this)
            },
            applicationFormPartInputAno.map((inputItem, index) => {
                return {
                    content: this.state[inputItem["key"]],
                    func: this.onChangeInput.bind(this),
                    maxLength: inputItem["maxLength"]
                }
            }),
            {
                content: this.state[applicationFormPartSelect[1]],
                func: this.onChangeSelect.bind(this)
            },
            applicationFormPartInputThen.map((inputItem, index) => {
                return {
                    content: this.state[inputItem["key"]],
                    func: this.onChangeInput.bind(this),
                    maxLength: inputItem["maxLength"]
                }
            }),
            applicationFormPartSelectAno.map((selectItem, selectIndex) => {
                return {
                    content: this.state[selectItem],
                    func: this.onChangeSelect.bind(this)
                }
            }),
            applicationFormPartInputEnd.map((inputItem, index) => {
                return {
                    content: this.state[inputItem["key"]],
                    func: this.onChangeInput.bind(this),
                    maxLength: inputItem["maxLength"]
                }
            }),
            applicationFormPartDatePicker.map((datePickerItem, datePickerIndex) => {
                return {
                    content: this.state[datePickerItem["key"]],
                    func: this.onChangeDatePicker.bind(this),
                    maxLength: 0,
                    open: this.state[datePickerItem["key"] + "Open"],
                    openFunc: this.onChangeDatePickerOpen.bind(this),
                    disabledFunc: this.onDisabledDatePicker.bind(this)
                }
            }),
            applicationFormPartSelectEnd.map((selectItem, selectIndex) => {
                return {
                    content: this.state[selectItem],
                    func: this.onChangeSelect.bind(this)
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
     * @param key
     * @param current
     */
    onDisabledDatePicker(key, current) {
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
        //分散添加或修改申请表单所有状态、方法和长度限制
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
        //集成添加或修改申请表单所有状态、方法和长度限制对象
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
                        integrationItem.main.bind(this)(formResult[integrationIndex]["content"], formResult[integrationIndex]["func"], formResult[integrationIndex]["maxLength"], formResult[integrationIndex]["open"], formResult[integrationIndex]["openFunc"], formResult[integrationIndex]["disabledFunc"])
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
        const {visible, title} = this.state;
        let formRow = this.renderFormRow();
        return (
            <Modal
                visible={visible}
                title={title}
                className="application-modal"
                width={960}
                okText="提交"
                cancelText="取消"
                onCancel={this.cancelApplication.bind(this)}
            >
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
     * render渲染分页结构
     * @returns {XML}
     */
    renderPagination() {
        const {current} = this.state;
        return (
            <Pagination
                current={current}
                showQuickJumper
                className="application-pagination"
                size="large"
                pageSize={PAGE_SIZE}
                total={13}
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
            title: applicationFormTitle[0]
        });
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
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 点击分页页码,页码样式变化且进行获取申请单列表的ajax请求
     * @param page
     * @param pageSize
     */
    changeApplicationPage = (page, pageSize) => {
        this.setState({
            current: page
        });
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
                        applicationList.length > 0 ? this.renderTable() : this.renderNull()
                    }
                    {
                        applicationList.length > 0 && this.renderPagination()
                    }
                    {this.renderForm()}
                </Card>
            </section>
        )
    }
}

export default ApplicationView;