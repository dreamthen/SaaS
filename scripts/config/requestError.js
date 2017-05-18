/**
 * Created by yinwk on 2017/5/16.
 */
import {message} from "antd";
import Error from "../prompt/error_prompt";
import Success from "../prompt/success_prompt";
const requestError = {
    error: function (status, ThrowError) {
        switch (status) {
            //处理401会话过期错误
            case 401:
                message.warning(Error.SESSION_EXPIRED);
                //FIXME 这里设置一个时间处理器,1.5s之后跳转到登录页面
                setTimeout(() => {
                    window.location = "./login.html";
                }, 1500);
                break;
            //处理404 not found错误
            case 404:
                window.location = "./notFound.html";
                break;
            //处理504链接超时错误
            case 504:
                break;
            //其他服务器错误
            default:
                message.success(Success.EMAIL_VERIFY_SUCCESS + ",即将重新登录", 4);
                //FIXME 这里设置一个时间处理器,4s之后跳转到登录页面
                setTimeout(() => {
                    window.location = "./login.html";
                }, 4000);
                break;
        }
    }
};

export default requestError;