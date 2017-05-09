/**
 * Created by yinwk on 2017/5/4.
 */
import React from "react";
import ReactDOM from "react-dom";
import {Router, hashHistory} from 'react-router'
import routeDOM from "./config/routes";
import "../stylesheets/common.css";
import "../stylesheets/sidebar-main.css";

ReactDOM.render(
    <Router history={hashHistory}>
        {routeDOM}
    </Router>, document.getElementById("SaaS_main_page"));