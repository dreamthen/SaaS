/**
 * Created by yinwk on 2017/5/5.
 */
import React from "react";
import {Input, Button} from "antd";

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <main className="main-container">
                <section className="login-section">
                    <div className="container-shadow">
                    </div>
                    <div className="login-container">
                        <h1 className="login-title">登录</h1>
                        <span className="login-spin">login</span>
                        <p> </p>
                        <div className="input-email-container">
                            <Input
                                className="login-input-email"
                                placeholder="用户名"
                                size="large"
                                maxLength="15"
                            />
                            <Button
                                type="primary"
                                size="large"
                                className="login-button-next"
                            >
                                下一步
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="register-section">
                    <div className="container-shadow">
                    </div>
                </section>
            </main>
        )
    }
}

export default LoginView;