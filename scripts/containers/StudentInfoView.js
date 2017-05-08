/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {getInformation, saveInformation, changePassword} from "../actions/studentInfo";
import {Row, Col, Card, Select, Input, Button, Modal, Alert} from "antd";
import storageData from "../config/storageData";
import localStorageObject from "../config/localStorage";

const Option = Select.Option;

//性别所有展现值
const SEX = ["M", "F"];
//签证状态所有展现值
const VISA_STATUS = ["0", "1", "2"];

class StudentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            account: "",
            password: "",
            sex: SEX[0],
            phone: "",
            email: "",
            visaStatus: VISA_STATUS[0],
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

    componentWillUnmount() {

    }

    /**
     * 获取学生信息
     */
    fetchData() {
        //从localStorage中获取到登录之后传入的学生数据信息
        let storage_action = localStorageObject.getLocalStorage.bind(this);
        storage_action(storageData);
        const {id} = this.state;
        //发出获取学生信息ajax请求
        let student_info = getInformation.bind(this);
        student_info(id);
    }

    /**
     * 修改性别
     * @param value
     */
    changeSex = (value) => {
        this.setState({
            sex: value
        });
    };

    changeVisaStatus = (value) => {
        this.setState({
            visaStatus: value
        });
    };

    /**
     * 修改电话号码
     */
    changePhone = (evt) => {
        this.setState({
            phone: evt.target.value
        });
    };

    /**
     * 修改邮箱
     */
    changeEmail = (evt) => {
        this.setState({
            email: evt.target.value
        });
    };

    changePostalAddress = (evt) => {
        this.setState({
            postalAddress: evt.target.value
        })
    };

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
        if (email === "") {
            this.setState({
                isError: true,
                isWarn: false,
                isSuccess: false,
                errorPrompt: "请输入邮箱"
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
        if (newPassword === "") {
            this.setState({
                isPasswordError: true,
                isPasswordWarn: false,
                isPasswordSuccess: false,
                errorPasswordPrompt: "请输入新密码"
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
        if (newPassword !== checkedPassword) {
            this.setState({
                isPasswordError: true,
                isPasswordWarn: false,
                isPasswordSuccess: false,
                errorPasswordPrompt: "两次密码输入不相同"
            });
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
            account,
            sex,
            phone,
            email,
            visaStatus,
            postalAddress,
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
                    <Row className="information-row">
                        <Col span="11" className="information-col">
                            <span className="information-spin">*</span>用户名
                        </Col>
                        <Col span="1">

                        </Col>
                        <Col span="12">
                            {account}
                        </Col>
                    </Row>
                    <Row className="information-row">
                        <Col span="11" className="information-col">
                            <span className="information-spin">*</span>性别
                        </Col>
                        <Col span="1">

                        </Col>
                        <Col span="12">
                            <Select
                                size="large"
                                value={sex ? sex : SEX[0]}
                                onChange={this.changeSex.bind(this)} className="information-select">
                                <Option value={SEX[0]}>男</Option>
                                <Option value={SEX[1]}>女</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row className="information-row">
                        <Col span="11" className="information-col">
                            <span className="information-spin">*</span>电话号码
                        </Col>
                        <Col span="1">

                        </Col>
                        <Col span="12">
                            <Input
                                size="large"
                                value={phone}
                                maxLength="20"
                                onChange={this.changePhone.bind(this)}
                            />
                        </Col>
                    </Row>
                    <Row className="information-row">
                        <Col span="11" className="information-col">
                            <span className="information-spin">*</span>邮箱
                        </Col>
                        <Col span="1">

                        </Col>
                        <Col span="12">
                            <Input
                                size="large"
                                value={email}
                                maxLength="45"
                                onChange={this.changeEmail.bind(this)}
                            />
                        </Col>
                    </Row>
                    <Row className="information-row">
                        <Col span="11" className="information-col">
                            <span className="information-spin">*</span>签证状态
                        </Col>
                        <Col span="1">

                        </Col>
                        <Col span="12">
                            <Select
                                size="large"
                                value={visaStatus}
                                onChange={this.changeVisaStatus.bind(this)} className="information-select">
                                <Option value={VISA_STATUS[0]}>未申请</Option>
                                <Option value={VISA_STATUS[1]}>申请中</Option>
                                <Option value={VISA_STATUS[2]}>已办理</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row className="information-row">
                        <Col span="11" className="information-col">
                            <span className="information-spin">*</span>邮件地址
                        </Col>
                        <Col span="1">

                        </Col>
                        <Col span="12">
                            <Input
                                size="large"
                                value={postalAddress}
                                maxLength="50"
                                onChange={this.changePostalAddress.bind(this)}
                            />
                        </Col>
                    </Row>
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