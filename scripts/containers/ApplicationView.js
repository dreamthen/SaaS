/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Card} from "antd";
import applicationColumn from "../config/applicationConfig";
import {Table} from "../components/Table";
import "../../stylesheets/application.css";

class ApplicationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applicationList: []
        }
    }

    render() {
        const {applicationList} = this.state;
        return (
            <section className="application-container">
                <Card title="申请表" className="application-card">
                    <Table columns={applicationColumn}/>
                </Card>
            </section>
        )
    }
}

export default ApplicationView;