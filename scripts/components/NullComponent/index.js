/**
 * Created by yinwk on 2017/5/11.
 */
import React,{PropTypes} from "react";
import "./nullComponent.css";

export class NullComponent extends React.Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="all-table-null">
                <div className="table-null-icon">
                    <i className="iconfontSaaS saas-cry">

                    </i>
                    <p className="table-null-data">No Data</p>
                </div>
            </div>
        )
    }
}