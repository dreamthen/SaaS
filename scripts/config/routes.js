/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Route, IndexRedirect} from "react-router";
import MainView from "../containers/MainView";
import ApplicationStatusView from "../containers/ApplicationStatusView";
import ApplicationView from "../containers/ApplicationView";
import MessageCenterView from "../containers/MessageCenterView";
import PayView from "../containers/PayView";
import StudentInfoView from "../containers/StudentInfoView";

/**
 * 路由的路径和页面
 * @type {[*]}
 */
const routes = [
    {

        path: "/applicationStatus",
        main: ApplicationStatusView
    },
    {
        path: "/application",
        main: ApplicationView
    },
    {
        path: "/messageCenter",
        main: MessageCenterView
    },
    {
        path: "/pay",
        main: PayView
    },
    {
        path: "/studentInfo",
        main: StudentInfoView
    }
];

/**
 * 返回路由的页面模板
 * @type {XML}
 */
const routeDOM = (
    <Route path="/" component={MainView}>
        <IndexRedirect to="/applicationStatus"/>
        {
            routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        component={route.main}
                    />
                )
            })
        }
    </Route>
);

export default routeDOM;