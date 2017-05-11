/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Button, Card, Pagination, Modal, Input} from "antd";
import {getApplicationList} from "../actions/application_action";
import localStorageObject from "../config/localStorage";
import storageData from "../config/storageData";
import applicationColumn from "../config/applicationConfig";
import {Table} from "../components/Table/index";
import {NullComponent} from "../components/NullComponent/index";
import "../../stylesheets/application.css";
import applicationFormMode from "../config/applicationFormMode";

const PAGE_SIZE = 20;
const applicationFormTitle = ["添加申请表", "修改申请表"];

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
            gender: "",
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
            marriageStatus: "",
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
            receiver: ""
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

    renderForm() {
        const {visible, title} = this.state;
        return (
            <Modal
                visible={visible}
                title={title}
                okText="提交"
                cancelText="取消"
                onCancel={this.cancelApplication.bind(this)}
            >

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