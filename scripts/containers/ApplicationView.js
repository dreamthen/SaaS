/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Button, Card, Pagination} from "antd";
import {getApplicationList} from "../actions/application_action";
import localStorageObject from "../config/localStorage";
import storageData from "../config/storageData";
import applicationColumn from "../config/applicationConfig";
import {Table} from "../components/Table/index";
import {NullComponent} from "../components/NullComponent/index";
import "../../stylesheets/application.css";

const PAGE_SIZE = 20;

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
            applicationList: []
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
     *
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
                </Card>
            </section>
        )
    }
}

export default ApplicationView;