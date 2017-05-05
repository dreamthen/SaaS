/**
 * Created by yinwk on 2017/5/6.
 */
const NGINX_DIR = "/SaaS/student/";
const MOOK_DIR = "../../data";
const isMook = false;

let api = {};

if(!isMook) {
    api = {
        LOGIN_ACTION: NGINX_DIR + "sessions/login",
        REGISTER_ACTION: NGINX_DIR + "sessions/signUp"
    }
}

module.exports = api;