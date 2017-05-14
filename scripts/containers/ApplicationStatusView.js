/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Button, Card} from "antd";
import storageData from "../config/storageData";
import localStorageObject from "../config/localStorage";
import relations from "../config/applicationStatusRelation";
import {getApplyRelations} from "../actions/applicationStatus";
import "../../stylesheets/applicationStatus.css";

//已录取后显示快递状态按钮
const endRelation = {
    key: "D",
    value: "快递状态"
};

class ApplicationStatusView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //登录用户id
            id: 0,
            //申请表id
            formId: 0,
            //学校id
            universityId: 0,
            //用户名
            account: "",
            //密码
            password: "",
            //申请状态
            relationStatus: "",
            //备注
            checkReason: ""
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
     * 获取用户数据
     */
    fetchData() {
        //从localStorage中获取到登录之后传入的用户数据信息
        let storage_action = localStorageObject.getLocalStorage.bind(this);
        storage_action(storageData);
    }

    /**
     * render最终渲染结构
     * @returns {XML}
     */
    render() {
        const {relationStatus, checkReason} = this.state;
        return (
            <section className="applicationStatus-container">
                <Card
                    title="申请状态"
                    className="applicationStatus-card"
                >
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
                                            >
                                                {endRelation["value"]}
                                            </Button>
                                        }
                                    </div>
                                )
                            }
                        })
                    }
                </Card>
            </section>
        )
    }
}

export default ApplicationStatusView;