/**
 * Created by yinwk on 2017/5/10.
 */
import React, {PropTypes} from "react";
import {Scrollbars} from "react-custom-scrollbars";
import {getApplicationForms} from "../../actions/application_action";
import moment from "moment";
import {Row, Col} from "antd";
import "./table.css";

//时间格式规范
const timeFormat = 'YYYY-MM-DD HH:mm:ss';
//创建时间和修改时间dataIndex
const TIME = ["createDate", "modifyDate"];
//在申请单tab页面下,申请单状态dataIndex
const APPLY_STATUS = "applyStatus";

const anyStatusConfig = {
    //在申请单tab页面下,申请单状态value
    applyStatus: [{key: "N", value: "未提交"}, {key: "Y", value: "提交"}],
    //在消息状态tab页面下,消息阅读状态value
    readStatus: [{key: "N", value: "未读"}, {key: "Y", value: "已读"}]
};

export class Table extends React.Component {
    static propTypes = {
        //登录用户id
        id: PropTypes.number,
        //在申请单tab页面下,申请单状态dataIndex
        //或者在消息状态tab页面下,消息阅读状态dataIndex
        anyStatus: PropTypes.string,
        //是否显示正在载入loading
        loading: PropTypes.bool,
        //列表头部模板或者说是列表横向行模板
        columns: PropTypes.array,
        //列表主体内容,要借助columns横向行模板显示行数据,列表数据的长度显示列数据
        dataSource: PropTypes.array,
        //在申请表tab页面下,显示正在载入loading......(包括loading动画、loading标识和遮罩层)
        showLoading: PropTypes.func,
        //在申请表tab页面下,点击申请表列表,通过id获取到某一个form表单的表单数据,并setState到表单的每一个state状态
        getApplicationFormsAlready: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            //在申请表tab页面下,申请表列表某一行数据的id,用于获取申请表单使用
            tableFormId: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        //在申请表tab页面下,当显示正在载入状态loading时,发起获取申请表单ajax请求
        if ((this.props.loading !== nextProps.loading) && nextProps.loading) {
            const {tableFormId} = this.state;
            //在申请表tab页面下,发起获取申请表单ajax请求
            let get_application = getApplicationForms.bind(this);
            get_application(tableFormId);
        }
    }

    /**
     * render react列表头部结构
     * @returns {XML}
     */
    renderHeaderRow() {
        const {columns} = this.props;
        const {cols} = styles;
        //react列表头部结构或者说是react列表横向行结构
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
     * render react列表内容结构
     * @returns {XML}
     */
    renderBodyRow() {
        const {columns, dataSource, anyStatus} = this.props;
        const {getApplication} = this;
        const {cols} = styles;
        //react列表主体结构,列表数据的长度显示react列结构
        return dataSource.map((sourceItem, index) => {
            return (
                <Row
                    key={sourceItem["id"]}
                    className="table-body-row"
                    onClick={getApplication.bind(this, sourceItem["id"])}
                >
                    {
                        //借助columns横向行模板显示react行结构
                        columns.map((columnItem, columnIndex) => {
                            let timeFlag = false;
                            return (
                                <Col
                                    key={columnItem["dataIndex"] + "-" + sourceItem["id"] + "-" + columnIndex}
                                    className="table-body-col"
                                    style={cols[columnIndex]}
                                >
                                    {
                                        //后台返回的创建时间和修改时间类型是number类型,微秒形式,所以需要moment进行转化
                                        //在react行结构的循环当中,定义一个timeFlag,如果遇到创建时间和修改时间字段,
                                        //就设置为true
                                        //然后根据timeFlag是否为true来渲染显示的数据
                                        TIME.map((timeItem, timeIndex) => {
                                            if (timeItem === columnItem["dataIndex"]) {
                                                timeFlag = true;
                                            }
                                        })
                                    }
                                    {
                                        //timeFlag为true,说明此字段为创建时间字段或者修改时间字段,
                                        //利用moment(创建时间或者修改时间微秒类型).format(要转换的字符串形式)
                                        (timeFlag && sourceItem[columnItem["dataIndex"]]) && moment(sourceItem[columnItem["dataIndex"]]).format(timeFormat)
                                    }
                                    {
                                        //timeFlag为false,
                                        //在申请单tab页下面,遇到申请单状态时,如果返回的是N,
                                        //则显示"未提交",否则返回的是Y,则显示"提交".
                                        //在没有遇到申请单状态时,则正常显示数据
                                        (!timeFlag && sourceItem[columnItem["dataIndex"]]) && (columnItem["dataIndex"] === anyStatus ? sourceItem[columnItem["dataIndex"]] === anyStatusConfig[anyStatus][0]["key"] ? anyStatusConfig[anyStatus][0]["value"] : anyStatusConfig[anyStatus][1]["value"] : sourceItem[columnItem["dataIndex"]])
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
     * 点击申请表列表某一行数据,先显示正在载入loading......
     * @param id
     * @param evt
     */
    getApplication = (id, evt) => {
        //在申请表tab页下,如果有props showLoading方法,执行showLoading方法,显示正在载入loading...
        this.props.showLoading && this.props.showLoading();
        //在申请表tab页下,将点击申请表列表中的某一行的formId利用react状态,setState赋给tableFormId
        this.setState({
            tableFormId: id
        });
        //取消冒泡
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
                    {/*react列表头部结构*/}
                    {this.renderHeaderRow()}
                </div>
                <div className="application-table-body">
                    {/*react滚动条结构*/}
                    <Scrollbars>
                        {/*react列表内容结构*/}
                        {this.renderBodyRow()}
                    </Scrollbars>
                </div>
            </div>
        )
    }
}

/**
 * react申请表列表行结构样式
 * @type {{cols: [*]}}
 */
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