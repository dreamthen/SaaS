/**
 * Created by yinwk on 2017/5/10.
 */
import React, {PropTypes} from "react";
import {Scrollbars} from "react-custom-scrollbars";
import {getApplicationForms} from "../../actions/application_action";
import moment from "moment";
import {Row, Col} from "antd";
import "./table.css";

//创建时间和修改时间dataIndex
const TIME = ["createDate", "modifyDate"];
//申请单状态dataIndex
const APPLY_STATUS = "applyStatus";
//申请单状态value
const applyStatus = [{key: "N", value: "未提交"}, {key: "Y", value: "提交"}];

export class Table extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        loading: PropTypes.bool,
        columns: PropTypes.array,
        dataSource: PropTypes.array,
        showLoading: PropTypes.func,
        getApplicationFormsAlready: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            tableFormId: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if ((this.props.loading !== nextProps.loading) && nextProps.loading) {
            const {tableFormId} = this.state;
            //获取申请表单
            let get_application = getApplicationForms.bind(this);
            get_application(tableFormId);
        }
    }

    /**
     * render表格头部结构
     * @returns {XML}
     */
    renderHeaderRow() {
        const {columns} = this.props;
        const {cols} = styles;
        return (
            <Row className="table-header-row">
                {
                    columns.map((colsItem, index) => {
                        return (
                            <Col
                                key={colsItem["dataIndex"]}
                                className="table-header-col"
                                style={cols[index]}
                            >
                                {
                                    colsItem["title"]
                                }
                            </Col>
                        )
                    })
                }
            </Row>
        )
    }

    /**
     * render表格内容结构
     * @returns {XML}
     */
    renderBodyRow() {
        const {columns, dataSource} = this.props;
        const {cols} = styles;
        return dataSource.map((sourceItem, index) => {
            return (
                <Row
                    key={sourceItem["id"]}
                    className="table-body-row"
                    onClick={this.getApplication.bind(this, sourceItem["id"])}
                >
                    {
                        columns.map((columnItem, columnIndex) => {
                            let timeFlag = false;
                            return (
                                <Col
                                    key={columnItem["dataIndex"] + "-" + sourceItem["id"] + "-" + columnIndex}
                                    className="table-body-col"
                                    style={cols[columnIndex]}
                                >
                                    {
                                        TIME.map((timeItem, timeIndex) => {
                                            if (timeItem === columnItem["dataIndex"]) {
                                                timeFlag = true;
                                            }
                                        })
                                    }
                                    {
                                        (timeFlag && sourceItem[columnItem["dataIndex"]]) && moment(sourceItem[columnItem["dataIndex"]]).format("YYYY-MM-DD HH:mm:ss")
                                    }
                                    {
                                        (!timeFlag && sourceItem[columnItem["dataIndex"]]) && (columnItem["dataIndex"] === APPLY_STATUS ? sourceItem[columnItem["dataIndex"]] === applyStatus[0]["key"] ? applyStatus[0]["value"] : applyStatus[1]["value"] : sourceItem[columnItem["dataIndex"]])
                                    }
                                </Col>
                            )
                        })
                    }
                </Row>
            )
        })
    }

    /**
     * 显示正在载入loading......
     * @param id
     * @param evt
     */
    getApplication = (id, evt) => {
        this.props.showLoading();
        this.setState({
            tableFormId: id
        });
        evt.nativeEvent.stopImmediatePropagation();
    };

    /**
     * render最终渲染结构
     * @returns {XML}
     */
    render() {
        return (
            <div className="application-table">
                <div className="application-table-header">
                    {this.renderHeaderRow()}
                </div>
                <div className="application-table-body">
                    <Scrollbars>
                        {this.renderBodyRow()}
                    </Scrollbars>
                </div>
            </div>
        )
    }
}

let styles = {
    cols: [
        {
            width: 80,
            minWidth: 80,
            marginLeft: 15
        },
        {
            flex: 1
        },
        {
            flex: 1
        },
        {
            flex: 1
        },
        {
            flex: 1
        }
    ]
};