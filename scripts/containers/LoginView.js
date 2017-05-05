/**
 * Created by yinwk on 2017/5/5.
 */
import React from "react";

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