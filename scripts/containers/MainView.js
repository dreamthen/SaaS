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

    componentWillMount() {

    }

    render() {
        const {children} = this.props;
        return (
            <main className="main-container">
                {/*左边栏路由tab*/}
                <div className="main-view">
                    <div className="main-sideBar">
                        <section className="sideBar-container">
                            <ul>
                                <li>
                                    <Link
                                        to="/applicationStatus"
                                        activeClassName="main-link-active"
                                    >
                                        申请状态
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/application"
                                        activeClassName="main-link-active"
                                    >
                                        申请表
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/messageCenter"
                                        activeClassName="main-link-active"
                                    >
                                        消息中心
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/pay"
                                        activeClassName="main-link-active"
                                    >
                                        支付
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/studentInfo"
                                        activeClassName="main-link-active"
                                    >
                                        个人信息
                                    </Link>
                                </li>
                            </ul>
                        </section>
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