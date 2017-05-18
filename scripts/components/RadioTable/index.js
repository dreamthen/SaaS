/**
 * Created by yinwk on 2017/5/14.
 */
import React, {PropTypes} from "react";
import {Scrollbars} from "react-custom-scrollbars";
import moment from "moment";
import {Row, Col, Radio} from "antd";
import "./radioTable.css";

const RadioGroup = Radio.Group;

//创建时间和修改时间dataIndex
const TIME = ["createDate", "modifyDate"];

export class RadioTable extends React.Component {
    static propTypes = {
        modalVisible: PropTypes.bool,
        columns: PropTypes.array,
        dataSource: PropTypes.array,
        getApplicationForms: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            formId: this.props.dataSource[0]["id"]
        }
    }

    /**
     * 在初始化render之后只执行一次,组件装载完之后,将applicationList申请列表的第一个id赋值给formId,并将外部的formId进行重新赋值状态
     */
    componentDidMount() {
        const {getApplicationForms, dataSource} = this.props;
        this.orderFormId.bind(this)(dataSource[0]["id"], getApplicationForms);
    }

    /**
     * 在props modalVisible也就是弹窗关闭或者打开时,将applicationList申请列表的第一个id赋值给formId,并将外部的formId进行重新赋值状态
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const {getApplicationForms, dataSource} = this.props;
        if (this.props.modalVisible !== nextProps.modalVisible) {
            this.orderFormId.bind(this)(dataSource[0]["id"], getApplicationForms);
        }
    }

    /**
     * 秩序化applicationList申请列表的key => id赋值给formId,并通过func => getApplicationForms将外部的formId进行重新赋值状态
     * @param key
     * @param func
     */
    orderFormId(key, func) {
        this.setState({
            formId: key
        }, () => {
            const {formId} = this.state;
            func(formId);
        });
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
                                        !timeFlag && sourceItem[columnItem["dataIndex"]]
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
     * render单选按钮结构
     * @returns {XML}
     */
    renderRadio() {
        const {dataSource} = this.props;
        const {formId} = this.state;
        return (
            <RadioGroup value={formId} onChange={this.onChangeRadio.bind(this)}>
                {
                    dataSource.map((sourceItem, index) => {
                        return (
                            <Radio
                                key={"radio" + sourceItem["id"]}
                                value={sourceItem["id"]}
                            />
                        )
                    })
                }
            </RadioGroup>
        )
    }

    /**
     * 改变申请单的formId RadioButton
     * @param evt
     */
    onChangeRadio = (evt) => {
        const {getApplicationForms} = this.props;
        this.orderFormId.bind(this)(evt.target.value, getApplicationForms);
    };

    /**
     * render最终渲染结构
     * @returns {XML}
     */
    render() {
        return (
            <div className="applicationStatus-table">
                <div className="applicationStatus-table-header">
                    {this.renderHeaderRow()}
                </div>
                <div className="applicationStatus-table-body">
                    <Scrollbars>
                        {this.renderRadio()}
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
            width: 100,
            minWidth: 90,
            marginLeft: 25
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