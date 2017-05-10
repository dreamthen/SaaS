/**
 * Created by yinwk on 2017/5/10.
 */
import React, {PropTypes} from "react";
import {Row, Col} from "antd";

export class Table extends React.Component {
    static propTypes = {
        columns: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {columns} = this.props;
        return (
            <div className="application-table">
                <div className="application-table-display application-table-header">
                    <Row>
                        <Col style={{flex: "1"}}>
                            世界
                        </Col>
                        <Col style={{flex: "1"}}>
                            美妙
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}