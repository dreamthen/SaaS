/**
 * Created by yinwk on 2017/5/6.
 */
import fetchRequest from "../config/fetchRequestData";
import api from "../config/api";
import Success from "../prompt/success_prompt";
import localStorageObject from "../config/localStorage";
import storageData from "../config/storageData";

/**
 * 登录功能post ajax请求
 * @param account
 * @param password
 */
export function loginAction(account, password) {
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        api.LOGIN_ACTION,
        "post",
        {
            account,
            password
        },
        function done(response, status) {
            let message = response.head.message,
                code = response.head.code,
                localStorageArray = [];
            if (code === Success.LOGIN_SUCCESS_CODE) {
                //用户登录的所有信息(id,用户名,密码,邮箱,性别和手机号码)
                let body = response.body,
                    //用户登录id
                    id = body.id,
                    //个人信息邮箱
                    email = body.email,
                    //个人信息性别
                    sex = body.sex,
                    //个人信息手机号码
                    phone = body.phone;
                //初始化提示语和输入框
                this.initState();
                //设置成功状态和成功提示语
                this.setPromptTrueOrFalse(false, false, true);
                this.setState({
                    successPrompt: Success.LOGIN_SUCCESS_MESSAGE
                });
                localStorageArray.push(pushIntoLocalStorage("userInfo", body));
                localStorageArray.push(pushIntoLocalStorage("account", {account}));
                localStorageArray.push(pushIntoLocalStorage("password", {password}));
                if (id || email || sex || phone) {
                    //向localStorage中设置登录成功后的学生数据信息
                    localStorageObject.setLocalStorage(localStorageArray);
                }
                //跳转到主页面--app.html
                window.location.href = "./app.html";
            } else {
                //设置警告状态和警告提示语
                this.setPromptTrueOrFalse(false, true, false);
                this.setState({
                    warnPrompt: message
                });
            }
        }.bind(this)
    );
}

/**
 * 向localStorage数组中push key属性和值以及value属性和值
 * @param key
 * @param value
 * @returns {{key: *, value}}
 */
function pushIntoLocalStorage(key, value) {
    return {
        key,
        value: JSON.stringify(value)
    }
}

/**
 * 注册功能post ajax请求
 * @param account
 * @param password
 */
export function registerAction(account, password) {
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        api.REGISTER_ACTION,
        "post",
        {
            account,
            password
        },
        function done(response, status) {
            let message = response.head.message,
                code = response.head.code;
            if (code === Success.REGISTER_SUCCESS_CODE) {
                //设置成功状态和成功提示语
                this.setPromptTrueOrFalse(false, false, true);
                this.setState({
                    successPrompt: Success.REGISTER_SUCCESS_MESSAGE,
                    whetherNext: false,
                    accountClassName: "input-account-container SaaS-leave",
                    passwordClassName: "input-password-container SaaS-enter"
                });
                //FIXME 这里需要设置一个时间控制器,需要使用setTimeout生成动画,在注册成功1.5s之后,右划到登录页面
                let timer = setTimeout(function timerControl() {
                    //初始化提示语和输入框
                    this.initState();
                    this.setState({
                        //设置登录页面模块距离左边长度为0
                        loginActionLeft: 0,
                        //设置注册页面模块距离左边长度为100%
                        registerActionLeft: "100%"
                    }, () => {
                        clearTimeout(timer);
                    });
                }.bind(this), 1500);
            } else {
                //设置警告状态和警告提示语
                this.setPromptTrueOrFalse(false, true, false);
                this.setState({
                    warnPrompt: message
                });
            }
        }.bind(this)
    );
}

/**
 * 退出功能get ajax请求
 */
export function logOutAction() {
    //whatwg-fetch请求,参数分别是url请求地址,请求方式,请求参数和请求成功回调函数
    fetchRequest.fetchRequestData(
        api.LOGOUT_ACTION,
        "get",
        {},
        function done(response, status) {
            //删除localStorage中的学生数据信息
            localStorageObject.removeLocalStorage(storageData);
            window.location = "./login.html";
        }.bind(this)
    );
}