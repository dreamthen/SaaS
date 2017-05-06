/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Link} from "react-router";

class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {children} = this.props;
        return (
            <main className="main-container">
                {/*左边栏路由tab*/}
                <div className="main-view">
                    <div className="main-sideBar">
                        <ul>
                            <li>
                                <Link to="/applicationStatus">
                                    申请状态
                                </Link>
                            </li>
                            <li>
                                <Link to="/application">
                                    申请表
                                </Link>
                            </li>
                            <li>
                                <Link to="/messageCenter">
                                    消息中心
                                </Link>
                            </li>
                            <li>
                                <Link to="/pay">
                                    支付
                                </Link>
                            </li>
                            <li>
                                <Link to="/studentInfo">
                                    个人信息
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="main-information">
                        {children}
                    </div>
                </div>
            </main>
        )
    }
}

export default MainView;