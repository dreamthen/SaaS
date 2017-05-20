/**
 * Created by yinwk on 2017/5/19.
 */
import Success from "../prompt/success_prompt";
import requestError from "../config/requestError";

export function uploadProps(action, data) {
    return {
        //input file的name,也就是上传图片文件所用的参数名
        name: "file",
        action,
        data: data ? data : {},
        accept: "image/png,image/jpg,image/jpeg,image/gif",
        multiple: true,
        onSuccess: function (response, file) {
            let body = response.body,
                code = response.head.code,
                message = response.head.message;
            if (code === Success.UPLOAD_SUCCESS_CODE) {
                //设置成功状态和提示语
                this.setPromptTrueOrFalse(false, false, true);
                this.setState({
                    successPrompt: Success.UPLOAD_SUCCESS_MESSAGE
                });
                // FIXME 这里需要设置一个时间控制器,需要使用setTimeout延迟时间,延迟1s将提示语状态关闭,并把图片文件地址赋值给state状态file
                setTimeout(function timerControl() {
                    //设置提示语状态取消
                    this.setPromptTrueOrFalse(false, false, false);
                    //把图片文件地址赋值给state状态file
                    this.setState({
                        avatar: body
                    });
                }.bind(this), 1000);
            } else {
                this.setPasswordPromptTrueOrFalse(false, true, false);
                this.setState({
                    warnPrompt: message
                });
            }
        }.bind(this),
        onError: function (err, response, file) {
            let status = response.status;
            requestError.error(status);
        }.bind(this)
    }
}