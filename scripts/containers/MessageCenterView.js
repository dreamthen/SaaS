/**
 * Created by yinwk on 2017/5/6.
 */
import React from "react";
import {Card} from "antd";
import "../../stylesheets/messageCenter.css";

class MessageCenterView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {
        return (
            <section className="messageCenter-container">
                <Card>

                </Card>
            </section>
        )
    }
}

export default MessageCenterView;