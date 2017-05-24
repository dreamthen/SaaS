/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Button, Card, Modal, Alert, Pagination} from "antd";
import Error from "../prompt/error_prompt";
import storageData from "../config/storageData";
import localStorageObject from "../config/localStorage";
import relations from "../config/applicationStatusRelation";
import applicationStatusColumn from "../config/applicationStatusConfig";
import {getApplicationList} from "../actions/application_action";
import {getApplyRelations, addApplyRelations, getDeliveryStatus} from "../actions/applicationStatus";
import {RadioTable} from "../components/RadioTable/index";
import {NullComponent} from "../components/NullComponent/index";
import "../../stylesheets/applicationStatus.css";

//每页条数
const PAGE_SIZE = 20;
//已录取后显示快递状态按钮
const endRelation = {
    key: "D",
    value: "delivery status"
};

class ApplicationStatusView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //登录用户id
            id: 0,
            //申请表id
            formId: 0,
            //申请状态id
            relationId: 0,
            //学校id
            universityId: 0,
            //用户名
            account: "",
            //密码
            password: "",
            //申请状态
            relationStatus: "",
            //备注
            checkReason: "",
            //申请单列表
            applicationList: [],
            //是否弹出获取申请列表弹窗
            visible: false,
            //是否弹出获取申请快递状态弹窗
            deliveryVisible: false,
            //申请快递状态内容
            deliveryStatus: "",
            //分页页数
            current: 1,
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
        }
    }

    componentWillMount() {
        //组件开始装载,获取用户数据
        this.fetchData();
    }

    componentDidMount() {
        const {id} = this.state;
        //发出获取申请关系的ajax请求
        let apply_status = getApplyRelations.bind(this);
        apply_status(id);
    }

    /**
     * 初始化申请单列表弹出框
     */
    initApplicationStatus() {
        this.setState({
            //申请表id
            formId: 0
        });
        //初始化提示语状态
        this.setPromptTrueOrFalse(false, false, false);
    }

    /**
     * 获取用户数据
     */
    fetchData() {
        //从localStorage中获取到登录之后传入的用户数据信息
        let storage_action = localStorageObject.getLocalStorage.bind(this);
        storage_action(storageData);
    }

    /**
     * 当申请表没有添加申请关系时,render渲染结构
     * @returns {XML}
     */
    renderRelationsNull() {
        return (
            <div
                className="applicationStatus-showRelationsNull">
                <i className="iconfontSaaS saas-apply">

                </i>
                <p>
                    Please choose an application form and submit your application ~
                </p>
                <Button
                    size="large"
                    type="primary"
                    className="applicationStatus-apply-button"
                    onClick={this.chooseApplicationStatus.bind(this)}
                >
                    submit application
                </Button>
            </div>
        )
    }

    /**
     * render渲染提示语
     * @returns {XML}
     */
    renderAlert() {
        const {isError, isWarn, isSuccess, errorPrompt, warnPrompt, successPrompt} = this.state;
        return (
            <div className="applicationStatus-alert">
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
     * 集成申请列表错误提示状态
     * @param prompt
     */
    showErrorPrompt(prompt) {
        this.setPromptTrueOrFalse(true, false, false);
        this.setState({
            errorPrompt: prompt
        });
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
    renderRadioTable() {
        const {visible, applicationList} = this.state;
        const {getApplicationForms} = this;
        return (
            <RadioTable
                modalVisible={visible}
                columns={applicationStatusColumn}
                dataSource={applicationList}
                getApplicationForms={getApplicationForms.bind(this)}
            />
        )
    }

    /**
     * 获取表格组件内的FormId,并进行设置状态setState
     * @param formId
     */
    getApplicationForms(formId) {
        this.setState({
            formId
        });
    }

    /**
     * 点击提交申请,弹出获取申请列表弹窗
     * @param evt
     */
    chooseApplicationStatus = (evt) => {
        const {id, current} = this.state;
        //弹出获取申请列表弹窗
        this.setState({
            visible: true
        });
        //发出获取申请列表ajax请求
        let application_action = getApplicationList.bind(this);
        application_action(id, current, PAGE_SIZE);
        //取消冒泡
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 获取申请快递状态
     * @param evt
     */
    getDeliveryStatusModal = (evt) => {
        const {relationId} = this.state;
        //发起获取申请快递状态ajax请求
        let delivery_action = getDeliveryStatus.bind(this);
        delivery_action(relationId);
        //取消冒泡
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 当申请表已经提交成功添加申请关系时,render渲染结构
     * @returns {XML}
     */
    renderRelations() {
        const {relationStatus, checkReason} = this.state;
        const {getDeliveryStatusModal} = this;
        return (
            <div className="applicationStatus-relations-container">
                {
                    relations.map((relationItem, relationIndex) => {
                        if (relationItem["key"] === relationStatus) {
                            return (
                                <div
                                    key={relationItem["key"]}
                                    className="applicationStatus-showRelations">
                                    <i className={"iconfontSaaS " + relationItem["className"]}>

                                    </i>
                                    <p>
                                        {relationItem["value"]}
                                    </p>
                                    <p>
                                        {checkReason}
                                    </p>
                                    {
                                        relationStatus === endRelation["key"] &&
                                        <Button
                                            size="large"
                                            type="primary"
                                            className="applicationStatus-email-button"
                                            onClick={getDeliveryStatusModal}
                                        >
                                            {endRelation["value"]}
                                        </Button>
                                    }
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }

    /**
     * 点击分页页码,页码内容和样式变化且进行获取申请单列表的ajax请求
     * @param page
     * @param pageSize
     */
    changeApplicationStatusPage = (page, pageSize) => {
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
     * render渲染分页结构
     * @returns {XML}
     */
    renderPagination() {
        const {current, applicationList} = this.state;
        const {changeApplicationStatusPage} = this;
        return (
            <Pagination
                current={current}
                showQuickJumper
                className="applicationStatus-pagination"
                size="large"
                pageSize={PAGE_SIZE}
                total={applicationList.length}
                showTotal={total => '共' + total + '页'}
                onChange={changeApplicationStatusPage}
            />
        )
    }

    /**
     * 选择一张申请表提交申请,弹出选择申请表弹窗
     * @returns {XML}
     */
    renderModal() {
        const {visible, applicationList} = this.state;
        return (
            <Modal
                title="申请表"
                visible={visible}
                width={960}
                wrapClassName="applicationStatus-modal-wrapper"
                className="applicationStatus-modal"
                okText="确认提交"
                onOk={this.submitApplication}
                onCancel={this.cancelApplicationStatus}
            >
                {this.renderAlert()}
                {(applicationList && applicationList.length > 0) ? this.renderRadioTable() : this.renderNull()}
                {(applicationList && applicationList.length > 0) && this.renderPagination()}
            </Modal>
        )
    }

    /**
     * 渲染后台返回的申请快递状态的html片段,使其可查看
     * @param htmlContent
     * @returns {XML}
     */
    renderHtmlPart(htmlContent) {
        return (
            <div dangerouslySetInnerHTML={{__html: htmlContent}}>
            </div>
        )
    }

    /**
     * 点击快递状态按钮,弹出查看申请快递状态弹窗
     * @returns {XML}
     */
    renderDeliveryModal() {
        const {deliveryVisible, deliveryStatus} = this.state;
        return (
            <Modal
                title="查看申请快递状态"
                visible={deliveryVisible}
                width={960}
                wrapClassName="applicationStatus-modal-wrapper"
                className="applicationStatus-delivery-modal"
                onCancel={this.cancelApplicationStatusDelivery}
                footer={null}
            >
                <div className="applicationStatus-common-container">
                    <div className="delivery-status-title">
                    </div>
                    <div className="delivery-status-title-font">
                        <i className="iconfontSaaS saas-delivery">

                        </i>
                        Delivery Status
                    </div>
                </div>
                {this.renderHtmlPart(deliveryStatus)}
            </Modal>
        )
    }

    /**
     * 校验申请列表中是否有数据
     */
    onCheck() {
        const {applicationList} = this.state;
        const {showErrorPrompt} = this;
        if (applicationList.length <= 0) {
            showErrorPrompt.bind(this)(Error.NULL_APPLY_LIST_VALUE);
            return false;
        }
        return true;
    }

    /**
     * 点击确认提交按钮,发出添加申请ajax请求
     * @param evt
     */
    submitApplication = (evt) => {
        const {id, formId, universityId} = this.state;
        let checked = this.onCheck();
        if (checked) {
            //发出添加申请关系ajax请求
            let add_apply_relation_action = addApplyRelations.bind(this);
            add_apply_relation_action(id, formId, universityId);
            //取消冒泡
            evt.nativeEvent.stopImmediatePropagation();
        }
    };

    /**
     * 点击取消或者右上角叉叉按钮,关闭获取申请列表弹窗
     * @param evt
     */
    cancelApplicationStatus = (evt) => {
        this.setState({
            visible: false
        });
        //初始化申请状态tab页
        this.initApplicationStatus();
        //取消冒泡
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * 点击右上角叉叉按钮,关闭获取申请快递状态弹窗
     * @param evt
     */
    cancelApplicationStatusDelivery = (evt) => {
        this.setState({
            deliveryVisible: false
        });
        //初始化申请状态tab页
        this.initApplicationStatus();
        //取消冒泡
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * render最终渲染结构
     * @returns {XML}
     */
    render() {
        const {relationStatus} = this.state;
        return (
            <section className="applicationStatus-container">
                <Card
                    title="申请状态"
                    className="applicationStatus-card"
                >
                    {relationStatus !== "" ? this.renderRelations() : this.renderRelationsNull()}
                    <div className="applicationStatus-relations-img">
                    </div>
                    {this.renderModal()}
                    {this.renderDeliveryModal()}
                </Card>
            </section>
        )
    }
}

export default ApplicationStatusView;