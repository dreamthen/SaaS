/**
 * Created by yinwk on 2017/5/16.
 */
import React from "react";
import ReactDOM from "react-dom";
import {Button} from "antd"
import "../stylesheets/notFound.css";

class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * 点击返回首页按钮,返回到login登录首页
     * @param evt
     */
    notFoundBackHome = (evt) => {
        window.location.href = "./login.html";
        evt.nativeEvent.stopImmediatePropagation();
    };

    render() {
        return (
            <div className="saas-error-container">
                <img src="images/notFound.png" alt="404 page" title="404 page"/>
                <Button
                    size="large"
                    type="primary"
                    className="error-container-button"
                    onClick={this.notFoundBackHome.bind(this)}
                >
                    返回首页
                </Button>
            </div>
        )
    }
}

ReactDOM.render(<ErrorPage />, document.getElementById("SaaS_error"));

