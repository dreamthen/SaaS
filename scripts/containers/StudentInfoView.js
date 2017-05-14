/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {getInformation, saveInformation, changePasswordRecently, setVerifyRecently} from "../actions/studentInfo";
import {Row, Col, Card, Input, Button, Modal, Alert} from "antd";
import storageData from "../config/storageData";
import localStorageObject from "../config/localStorage";
import formRow from "../config/formItem";
import integrationPasswordItem from "../config/passwordItem";
import Error from "../prompt/error_prompt";
import "../../stylesheets/studentInfo.css";

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
//password Input框数据模板
const passwordItem = ["oldPassword", "newPassword", "checkedPassword"];
//email邮箱激活
const email = "邮箱";

class StudentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //登录用户id
            id: 0,
            //登录用户名
            account: "",
            //登录密码
            password: "",
            //性别
            sex: SEX,
            //电话号码
            phone: "",
            //邮箱
            email: "",
            //签证状态
            visaStatus: VISA_STATUS,
            //邮件地址
            postalAddress: "",
            //修改密码弹框状态,是否弹出
            visible: false,
            //原密码
            oldPassword: "",
            //新密码
            newPassword: "",
            //确认密码
            checkedPassword: "",
            //错误提示框状态
            isError: false,
            //警告提示框状态
            isWarn: false,
            //成功提示框状态
            isSuccess: false,
            //修改密码错误提示框状态
            isPasswordError: false,
            //修改密码警告提示框状态
            isPasswordWarn: false,
            //修改密码成功提示框状态
            isPasswordSuccess: false,
            //错误提示语
            errorPrompt: "",
            //警告提示语
            warnPrompt: "",
            //成功提示语
            successPrompt: "",
            //修改密码错误提示语
            errorPasswordPrompt: "",
            //修改密码警告提示语
            warnPasswordPrompt: "",
            //修改密码成功提示语
            successPasswordPrompt: ""
        }
    }

    componentWillMount() {
        //组件开始装载,获取用户数据
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
     * 获取用户信息
     */
    fetchData() {
        //从localStorage中获取到登录之后传入的用户数据信息
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
                        {/*如果是邮箱那一行就添加一个激活按钮*/}
                        {
                            (rowItem["name"] === email) &&
                            <Button
                                size="large"
                                type="primary"
                                className="information-verify-button"
                                onClick={this.setVerify.bind(this)}
                            >
                                Verify
                            </Button>
                        }
                    </Col>
                </Row>
            )
        })
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
     * 集成密码错误提示状态
     * @param prompt
     */
    showPasswordErrorPrompt(prompt) {
        this.setPasswordPromptTrueOrFalse(true, false, false);
        this.setState({
            errorPasswordPrompt: prompt
        });
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
     * 设置密码错误、警告或者成功提示语状态
     * @param isPasswordError
     * @param isPasswordWarn
     * @param isPasswordSuccess
     */
    setPasswordPromptTrueOrFalse(isPasswordError, isPasswordWarn, isPasswordSuccess) {
        this.setState({
            isPasswordError,
            isPasswordWarn,
            isPasswordSuccess
        });
    }

    /**
     * 校验表单中的输入框(phone,email,postalAddress空值和长度限额)
     * @returns {boolean}
     */
    onCheck() {
        const {phone, email, postalAddress} = this.state;
        if (phone === "") {
            this.showErrorPrompt(Error.NULL_PHONE_VALUE);
            return false;
        }
        if (phone.length > 20) {
            this.showErrorPrompt(Error.EXCESS_PHONE_LENGTH);
            return false;
        }
        if (email === "") {
            this.showErrorPrompt(Error.NULL_EMAIL_VALUE);
            return false;
        }
        if (email.length > 45) {
            this.showErrorPrompt(Error.EXCESS_EMAIL_LENGTH);
            return false;
        }
        if (postalAddress === "") {
            this.showErrorPrompt(Error.NULL_POSTALADDRESS_VALUE);
            return false;
        }
        if (postalAddress.length > 50) {
            this.showErrorPrompt(Error.EXCESS_POSTALADDRESS_LENGTH);
            return false;
        }
        return true;
    }

    /**
     * 校验表单中的email空值和长度限额
     * @returns {boolean}
     */
    onCheckEmail() {
        const {email} = this.state;
        if (email === "") {
            this.showErrorPrompt(Error.NULL_EMAIL_VALUE);
            return false;
        }
        if (email.length > 45) {
            this.showErrorPrompt(Error.EXCESS_EMAIL_LENGTH);
            return false;
        }
        return true;
    }

    /**
     * 校验密码输入框(原密码，新密码，确认密码)
     * @returns {boolean}
     */
    onPasswordCheck() {
        const {oldPassword, newPassword, checkedPassword} = this.state;
        if (oldPassword === "") {
            this.showPasswordErrorPrompt(Error.INPUT_NULL_ONLY_OLD_PASSWORD);
            return false;
        }
        if (oldPassword.length !== 6) {
            this.showPasswordErrorPrompt(Error.INPUT_EXCESS_ONLY_OLD_PASSWORD);
            return false;
        }
        if (newPassword === "") {
            this.showPasswordErrorPrompt(Error.INPUT_NULL_ONLY_NEW_PASSWORD);
            return false;
        }
        if (newPassword.length !== 6) {
            this.showPasswordErrorPrompt(Error.INPUT_EXCESS_ONLY_NEW_PASSWORD);
            return false;
        }
        if (checkedPassword === "") {
            this.showPasswordErrorPrompt(Error.INPUT_NULL_ONLY_ENSURE_PASSWORD);
            return false;
        }
        if (checkedPassword.length !== 6) {
            this.showPasswordErrorPrompt(Error.INPUT_EXCESS_ONLY_ENSURE_PASSWORD);
            return false;
        }
        if (newPassword !== checkedPassword) {
            this.showPasswordErrorPrompt(Error.INCONSISTENT_PASSWORD);
            return false;
        }
        return true;
    }

    /**
     * 点击保存修改用户个人信息
     */
    toSave = () => {
        const {id, sex, email, phone, visaStatus, postalAddress} = this.state;
        const checked = this.onCheck();
        if (checked) {
            //修改用户个人信息ajax put请求
            let save_action = saveInformation.bind(this);
            save_action(id, sex, email, phone, visaStatus, postalAddress);
        }
    };

    /**
     * 点击修改密码按钮,弹出修改密码弹出框
     */
    changePassword = () => {
        this.setState({
            visible: true,
            oldPassword: "",
            newPassword: "",
            checkedPassword: ""
        })
    };

    /**
     * 点击修改密码弹出框的取消按钮或者右上角的小叉叉键,默认所有的密码框里面没有值且没有错误、警告和成功提示框
     */
    handleCancel = () => {
        this.setState({
            visible: false,
            oldPassword: "",
            newPassword: "",
            checkedPassword: "",
            isPasswordError: false,
            isPasswordWarn: false
        });
    };

    /**
     * 点击修改密码弹出框的确认键,发起ajax put修改密码请求
     */
    handleOk = () => {
        const {oldPassword, newPassword} = this.state;
        const checked = this.onPasswordCheck();
        if (checked) {
            //校验之后,发起ajax put请求修改密码
            let password_action = changePasswordRecently.bind(this);
            password_action(oldPassword, newPassword);
        }
    };

    /**
     * 集成密码弹出框中每一行的数据和方法
     * @constructor
     */
    passwordData() {
        const {changeAllPassword} = this;
        return [
            passwordItem.map((item, index) => {
                return {
                    content: this.state[item],
                    func: changeAllPassword.bind(this)
                }
            })
        ]
    }

    /**
     * 返回弹出框中的所有内容(PasswordRow)
     */
    renderPasswordRow() {
        const password = this.passwordData();
        const passwordResult = [];
        //分散密码弹出框每一行的数据和方法
        password.map((passwordItem, index) => {
            for (let i = 0; i < passwordItem.length; i++) {
                passwordResult.push(passwordItem[i]);
            }
        });
        //集成密码弹出框内容构成
        return integrationPasswordItem.map((integrationItem, index) => {
            return (
                <Row
                    key={index}
                    className={"information-row information-"+ passwordItem[index] +"-row"}
                >
                    <Col span="7" className="information-col">
                        {integrationItem["name"]}
                    </Col>
                    <Col span="1">

                    </Col>
                    <Col span="16">
                        {
                            integrationItem.main.bind(this)(passwordResult[index]["content"], passwordResult[index]["func"])
                        }
                    </Col>
                </Row>
            )
        });
    }

    /**
     * 修改密码弹出框里面的所有Input框内容(原密码、新密码和确认密码)
     * @param key
     * @param evt
     */
    changeAllPassword(key, evt){
        this.setState({
            [key]: evt.target.value
        });
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 点击Verify按钮激活邮箱
     * @param evt
     */
    setVerify(evt) {
        let checkedEmail = this.onCheckEmail();
        const {id, email} = this.state;
        if (checkedEmail) {
            //发起激活邮箱ajax请求
            let set_verify = setVerifyRecently.bind(this);
            set_verify(id, email);
        }
        evt.nativeEvent.stopImmediatePropagation();
    }

    render() {
        const {
            visible,
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
                        {this.renderPasswordRow()}
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