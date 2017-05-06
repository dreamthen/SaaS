/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {getInformation} from "../actions/studentInfo";
import {Card} from "antd";

class StudentView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            sex: "",
            phone: "",
            email: "",
            visaStatus: "",
            postalAddress: ""
        }
    }

    componentWillMount() {
        //组件开始装载,获取数据
        this.fetchData();
    }

    /**
     * 组件即将卸载的时候,将localStorage里面的信息去掉
     */
    componentWillUnmount() {
        localStorage.removeItem("userInfo");
    }

    /**
     * 获取学生信息
     */
    fetchData() {
        let localStorageBody = JSON.parse(localStorage.getItem("userInfo"));
        this.setState({
            id: localStorageBody.id
        }, () => {
            const {id} = this.state;
            //发出获取学生信息ajax请求
            let student_info = getInformation.bind(this);
            student_info(id);
        });
    }

    render() {
        return (
            <section className="information-container">
                <Card title="个人信息" className="information-card">
                    
                </Card>
            </section>
        )
    }
}

export default StudentView;