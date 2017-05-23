/**
 * Created by yinwk on 2017/5/23.
 */
import "whatwg-fetch";
import requestError from "../config/requestError";

const fetchRequest = {
    /**
     * fetch统一请求后台
     * @param url
     * @param type
     * @param data
     * @param contentType
     * @param done
     */
    fetchRequestData(url, type, data, contentType, done) {
        fetch(url, {
            //请求方式
            method: type,
            //返回数据类型:json类型
            dataType: "json",
            //文件类型:一般是"application/json"
            headers: {
                "Content-Type": contentType
            },
            //传入参数,以JSON.stringify包裹,以json字符串的形式传参
            body: JSON.stringify(data),
            //同步或者异步:默认是异步,一般是异步
            async: true
        }).then(
            //检查返回的对象response status
            this.checkStatus
        ).then(
            //返回response JSON字符串
            this.responseJSON
        ).then(function (data, status) {
            //成功之后,执行从外部以参数传入的Done方法
            done(data, status);
        }).catch(function (error) {
            //失败时,将失败的状态码,以参数的形式传给requestError.error方法,根据状态码的不同来处理错误
            let status = error.status;
            requestError.error(status);
        });
    },
    /**
     * 检查返回的对象response status
     * @param response
     * @returns {*}
     */
    checkStatus(response) {
        let status = response.status;
        //如果返回的状态码大于等于200且小于300,说明response成功
        //否则抛出response异常
        if (status >= 200 && status < 300) {
            return response;
        } else {
            throw response;
        }
    },
    /**
     * 返回response JSON字符串
     * @param response
     */
    responseJSON(response) {
        console.log(response);
        return response.json()
    }
};

export default fetchRequest;