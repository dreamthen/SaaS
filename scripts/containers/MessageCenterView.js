/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Card} from "antd";
import {getMessageStatusList} from "../actions/messageCenter";
import messageCenterConfig from "../config/messageCenterConfig";
import {NullComponent} from "../components/NullComponent/index";
import {Table} from "../components/Table/index";
import localStorageObject from "../config/localStorage";
import storageData from "../config/storageData";
import "../../stylesheets/messageCenter.css";

//每页条数
const PAGE_SIZE = 20;

class MessageCenterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //登录用户id
            id: 0,
            //登录用户名
            account: "",
            //登录密码
            password: "",
            //消息状态列表
            messageCenterList: [],
            //分页页数
            current: 1
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
        //发起获取消息状态列表ajax请求
        let message_center = getMessageStatusList.bind(this);
        message_center(id, current, PAGE_SIZE);
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
     * 列表为空时,render内容结构
     * @returns {XML}
     */
    renderNull() {
        //空列表组件NullComponent
        return (
            <NullComponent/>
        )
    }

    /**
     * render渲染消息状态列表结构
     * @returns {XML}
     */
    renderTable() {
        const {messageCenterList} = this.state;
        return (
            <Table
                columns={messageCenterConfig}
                dataSource={messageCenterList}
            />
        )
    }

    /**
     * render渲染最终react结构
     * @returns {XML}
     */
    render() {
        const {renderNull, renderTable} = this;
        const {messageCenterList, current} = this.state;
        return (
            <section className="messageCenter-container">
                <Card
                    title="Message Status"
                    className="messageCenter-card">
                    {messageCenterList && messageCenterList.length > 0 ? renderTable() : renderNull()}
                </Card>
            </section>
        )
    }
}

export default MessageCenterView;