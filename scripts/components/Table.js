/**
 * Created by yinwk on 2017/5/10.
 */
import React, {PropTypes} from "react";
import {Row, Col} from "antd";

export class Table extends React.Component {
    static propTypes = {
        columns: PropTypes.array,
        dataSource: PropTypes.array
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

    render() {
        const {dataSource} = this.props;
        return (
            <div className="application-table">
                <div className="application-table-header">
                </div>
                <div className="application-table-body">
                    {this.renderHeaderRow()}
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