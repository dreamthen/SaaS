/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {getInformation, saveInformation, changePassword} from "../actions/studentInfo";
import {Row, Col, Card, Input, Button, Modal, Alert} from "antd";
import storageData from "../config/storageData";
import localStorageObject from "../config/localStorage";
import formRow from "../config/formItem";

//性别所有展现值
const SEX = "M";
//签证状态所有展现值
const VISA_STATUS = "0";
//表单所有Input框内容数据模板
const FORM_ITEM = [
    {
        value: "phone",
        maxLength: 20
    },
    {
        value: "email",
        maxLength: 45
    },
    {
        value: "postalAddress",
        maxLength: 50
    }
];
//用来返回resultRow
const rowArray = ["accountRow", "sexRow", "phoneRow", "emailRow", "postalAddressRow", "visaStatusRow"];

class StudentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            account: "",
            password: "",
            sex: SEX,
            phone: "",
            email: "",
            visaStatus: VISA_STATUS,
            postalAddress: "",
            visible: false,
            olderPassword: "",
            newPassword: "",
            checkedPassword: "",
            isError: false,
            isWarn: false,
            isSuccess: false,
            isPasswordError: false,
            isPasswordWarn: false,
            isPasswordSuccess: false,
            errorPrompt: "",
            warnPrompt: "",
            successPrompt: "",
            errorPasswordPrompt: "",
            warnPasswordPrompt: "",
            successPasswordPrompt: ""
        }
    }

    componentWillMount() {
        //组件开始装载,获取数据
        this.fetchData();
    }

    componentDidMount() {
        const {id} = this.state;
        //发出获取学生信息ajax请求
        let student_info = getInformation.bind(this);
        student_info(id);
    }

    componentWillUnmount() {

    }

    /**
     * 获取学生信息
     */
    fetchData() {
        //从localStorage中获取到登录之后传入的学生数据信息
        let storage_action = localStorageObject.getLocalStorage.bind(this);
        storage_action(storageData);
    }

    /**
     * 修改表单里面的所有Select框内容(性别和签证状态)
     * @param key
     * @param value
     */
    changeFormSelectItem = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    /**
     * 修改表单里面的所有Input框内容(电话号码、邮箱和邮件地址)
     * @param key
     * @param evt
     */
    changeFormInputItem = (key, evt) => {
        this.setState({
            [key]: evt.target.value
        });
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 集成表单中每一行的数据和方法
     * @constructor
     */
    RowData() {
        const {account, sex, visaStatus} = this.state;
        const {changeFormInputItem, changeFormSelectItem} = this;
        return [
            {
                content: account
            },
            {
                content: sex,
                func: changeFormSelectItem
            },
            FORM_ITEM.map((formItem, index) => {
                return {
                    content: this.state[formItem.value],
                    func: changeFormInputItem,
                    maxLength: formItem.maxLength
                }
            }),
            {
                content: visaStatus,
                func: changeFormSelectItem
            }
        ]
    }

    /**
     * 返回表单中的所有内容(FormRow)
     */
    renderFormRow() {
        const row = this.RowData();
        //分散表单中每一行的数据和方法
        let resultRow = [];
        rowArray.map((colItem, colIndex) => {
            if (Object.prototype.toString.call(row[colIndex]) === "[object Object]") {
                resultRow.push(row[colIndex]);
            }
            if (Object.prototype.toString.call(row[colIndex]) === "[object Array]") {
                for (let i = 0; i < row[colIndex].length; i++) {
                    resultRow.push(row[colIndex][i])
                }
            }
        });
        //集成个人信息表单内容构成
        return formRow.map((rowItem, index) => {
            return (
                <Row key={index}
                     className="information-row">
                    <Col span="11" className="information-col">
                        <span className="information-spin">*</span>
                        {rowItem.name}
                    </Col>
                    <Col span="1">

                    </Col>
                    <Col span="12">
                        {
                            rowItem.main.bind(this)(resultRow[index].content, resultRow[index].func, resultRow[index].maxLength)
                        }
                    </Col>
                </Row>
            )
        })
    }

    onCheck() {
        const {phone, email, postalAddress} = this.state;
        if (phone === "") {
            this.setState({
                isError: true,
                isWarn: false,
                isSuccess: false,
                errorPrompt: "请输入电话号码"
            });
            return false;
        }
        if (phone.length > 20) {
            this.setState({
                isError: true,
                isWarn: false,
                isSuccess: false,
                errorPrompt: "超出电话号码长度限额"
            });
            return false;
        }
        if (email === "") {
            this.setState({
                isError: true,
                isWarn: false,
                isSuccess: false,
                errorPrompt: "请输入邮箱"
            });
            return false;
        }
        if (email.length > 45) {
            this.setState({
                isError: true,
                isWarn: false,
                isSuccess: false,
                errorPrompt: "超出邮箱长度限额"
            });
            return false;
        }
        if (postalAddress === "") {
            this.setState({
                isError: true,
                isWarn: false,
                isSuccess: false,
                errorPrompt: "请输入邮件地址"
            });
            return false;
        }
        if (postalAddress.length > 50) {
            this.setState({
                isError: true,
                isWarn: false,
                isSuccess: false,
                errorPrompt: "超出邮箱长度限额"
            });
            return false;
        }
        return true;
    }

    onPasswordCheck() {
        const {olderPassword, newPassword, checkedPassword} = this.state;
        if (olderPassword === "") {
            this.setState({
                isPasswordError: true,
                isPasswordWarn: false,
                isPasswordSuccess: false,
                errorPasswordPrompt: "请输入原密码"
            });
            return false;
        }
        if (olderPassword.length !== 6) {
            this.setState({
                isPasswordError: true,
                isPasswordWarn: false,
                isPasswordSuccess: false,
                errorPasswordPrompt: "原密码只允许输入6位"
            });
            return false;
        }
        if (newPassword === "") {
            this.setState({
                isPasswordError: true,
                isPasswordWarn: false,
                isPasswordSuccess: false,
                errorPasswordPrompt: "请输入新密码"
            });
            return false;
        }
        if (newPassword.length !== 6) {
            this.setState({
                isPasswordError: true,
                isPasswordWarn: false,
                isPasswordSuccess: false,
                errorPasswordPrompt: "新密码只允许输入6位"
            });
            return false;
        }
        if (checkedPassword === "") {
            this.setState({
                isPasswordError: true,
                isPasswordWarn: false,
                isPasswordSuccess: false,
                errorPasswordPrompt: "请输入确认的新密码"
            });
            return false;
        }
        if (checkedPassword.length !== 6) {
            this.setState({
                isPasswordError: true,
                isPasswordWarn: false,
                isPasswordSuccess: false,
                errorPasswordPrompt: "确认密码只允许输入6位"
            });
            return false;
        }
        if (newPassword !== checkedPassword) {
            this.setState({
                isPasswordError: true,
                isPasswordWarn: false,
                isPasswordSuccess: false,
                errorPasswordPrompt: "两次密码输入不相同"
            });
            return false;
        }
        return true;
    }

    toSave = () => {
        const {id, sex, email, phone, visaStatus, postalAddress} = this.state;
        const checked = this.onCheck();
        if (checked) {
            let save_action = saveInformation.bind(this);
            save_action(id, sex, email, phone, visaStatus, postalAddress);
        }
    };

    changePassword = () => {
        this.setState({
            visible: true,
            olderPassword: "",
            newPassword: "",
            checkedPassword: ""
        })
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            olderPassword: "",
            newPassword: "",
            checkedPassword: "",
            isPasswordError: false,
            isPasswordWarn: false
        });
    };

    handleOk = () => {
        const {olderPassword, newPassword} = this.state;
        const checked = this.onPasswordCheck();
        if (checked) {
            let password_action = changePassword.bind(this);
            password_action(olderPassword, newPassword);
        }
    };

    changeOlderPassword = (evt) => {
        this.setState({
            olderPassword: evt.target.value
        })
    };

    changeNewPassword = (evt) => {
        this.setState({
            newPassword: evt.target.value
        })
    };

    changeCheckedPassword = (evt) => {
        this.setState({
            checkedPassword: evt.target.value
        })
    };

    render() {
        const {
            visible,
            olderPassword,
            newPassword,
            checkedPassword,
            isError,
            isWarn,
            isSuccess,
            isPasswordError,
            isPasswordWarn,
            isPasswordSuccess,
            errorPrompt,
            warnPrompt,
            successPrompt,
            errorPasswordPrompt,
            warnPasswordPrompt,
            successPasswordPrompt
        } = this.state;
        return (
            <section className="information-container">
                <Card title="个人信息" className="information-card">
                    {this.renderFormRow()}
                    {isError && <Alert type="error" className="information-alert" message={errorPrompt} showIcon/>}
                    {isWarn && <Alert type="warning" className="information-alert" message={warnPrompt} showIcon/>}
                    {isSuccess &&
                    <Alert type="success" className="information-alert" message={successPrompt} showIcon/>}
                    <div className="information-save-button">
                        <Button type="default"
                                className="information-button"
                                onClick={this.toSave.bind(this)}
                        >
                            保存
                        </Button>
                    </div>
                    <div className="information-change-password">
                        <Button type="default"
                                className="information-button"
                                onClick={this.changePassword.bind(this)}
                        >
                            修改密码
                        </Button>
                    </div>
                    <Modal title="修改密码"
                           visible={visible}
                           className="information-modal"
                           onOk={this.handleOk}
                           onCancel={this.handleCancel}
                    >
                        <Row className="information-row information-oldPassword-row">
                            <Col span="7" className="information-col">
                                原密码
                            </Col>
                            <Col span="1">

                            </Col>
                            <Col span="16">
                                <Input
                                    size="large"
                                    type="password"
                                    value={olderPassword}
                                    placeholder="原密码"
                                    maxLength="6"
                                    onChange={this.changeOlderPassword.bind(this)}
                                />
                            </Col>
                        </Row>
                        <Row className="information-row information-newPassword-row">
                            <Col span="7" className="information-col">
                                新密码
                            </Col>
                            <Col span="1">

                            </Col>
                            <Col span="16">
                                <Input
                                    size="large"
                                    type="password"
                                    value={newPassword}
                                    placeholder="新密码"
                                    maxLength="6"
                                    onChange={this.changeNewPassword.bind(this)}
                                />
                            </Col>
                        </Row>
                        <Row className="information-row information-newPassword-row">
                            <Col span="7" className="information-col">
                                确认密码
                            </Col>
                            <Col span="1">

                            </Col>
                            <Col span="16">
                                <Input
                                    size="large"
                                    type="password"
                                    value={checkedPassword}
                                    placeholder="确认密码"
                                    maxLength="6"
                                    onChange={this.changeCheckedPassword.bind(this)}
                                />
                            </Col>
                        </Row>
                        {isPasswordError &&
                        <Alert type="error" className="information-alert" message={errorPasswordPrompt} showIcon/>}
                        {isPasswordWarn &&
                        <Alert type="warning" className="information-alert" message={warnPasswordPrompt} showIcon/>}
                        {isPasswordSuccess &&
                        <Alert type="success" className="information-alert" message={successPasswordPrompt} showIcon/>}
                    </Modal>
                </Card>
            </section>
        )
    }
}

export default StudentView;