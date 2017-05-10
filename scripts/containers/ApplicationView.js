/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Table, Card} from "antd";
import applicationColumn from "../config/applicationConfig";
import "../../stylesheets/application.css";

class ApplicationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applicationList: [{key: 1, name: "ywk", age: 24}]
        }
    }

    render() {
        const {applicationList} = this.state;
        return (
            <section className="application-container">
                <Card title="申请表" className="application-card">

                    <Table columns={applicationColumn} dataSource={applicationList} scroll={{y: 240}}/>
                </Card>
            </section>
        )
    }
}

export default ApplicationView;