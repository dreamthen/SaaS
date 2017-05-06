/**
 * Created by yinwk on 2017/5/6.
 */
const NGINX_DIR = "/SaaS/";
const MOOK_DIR = "../../data";
const isMook = false;

let api = {};

if(!isMook) {
    api = {
        LOGIN_ACTION: NGINX_DIR + "student/sessions/login",
        REGISTER_ACTION: NGINX_DIR + "student/sessions/signUp",
        GET_STUDENT_INFORMATION: NGINX_DIR + "student/users/students"
    }
}

module.exports = api;