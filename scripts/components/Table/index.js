/**
 * Created by yinwk on 2017/5/10.
 */
import React, {PropTypes} from "react";
import {Scrollbars} from "react-custom-scrollbars";
import {getApplicationForms} from "../../actions/application_action";
import {Row, Col} from "antd";
import "./table.css";

export class Table extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        columns: PropTypes.array,
        dataSource: PropTypes.array,
        getApplicationFormsAlready: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {}
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
                            return (
                                <Col
                                    key={columnItem["dataIndex"] + "-" + sourceItem["id"] + "-" + columnIndex}
                                    className="table-body-col"
                                    style={cols[columnIndex]}
                                >
                                    {sourceItem[columnItem["dataIndex"]]}
                                </Col>
                            )
                        })
                    }
                </Row>
            )
        })
    }

    /**
     * 获取申请表单
     * @param id
     * @param evt
     */
    getApplication = (id, evt) => {
        let get_application = getApplicationForms.bind(this);
        get_application(id);
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
        }
    ]
};