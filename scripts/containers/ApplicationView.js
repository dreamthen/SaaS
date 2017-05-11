/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Card} from "antd";
import {getApplicationList} from "../actions/application_action";
import localStorageObject from "../config/localStorage";
import storageData from "../config/storageData";
import applicationColumn from "../config/applicationConfig";
import {Table} from "../components/Table";
import "../../stylesheets/application.css";

class ApplicationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            account: "",
            password: "",
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

    render() {
        const {applicationList} = this.state;
        return (
            <section className="application-container">
                <Card title="申请表" className="application-card">
                    <Table
                        columns={applicationColumn}
                        dataSource={applicationList}
                    />
                </Card>
            </section>
        )
    }
}

export default ApplicationView;