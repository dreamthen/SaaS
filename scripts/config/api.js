/**
 * Created by yinwk on 2017/5/6.
 */
const NGINX_DIR = "/SaaS/";
const MOOK_DIR = "../../data";
const isMook = false;

let api = {};

if(!isMook) {
    api = {
        //登录
        LOGIN_ACTION: NGINX_DIR + "student/sessions/login",
        //退出
        LOGOUT_ACTION: NGINX_DIR + "student/sessions/logout",
        //注册
        REGISTER_ACTION: NGINX_DIR + "student/sessions/signUp",
        //获取学生个人信息
        GET_STUDENT_INFORMATION: NGINX_DIR + "student/users/students",
        //修改并保存学生个人信息
        SAVE_STUDENT_INFORMATION: NGINX_DIR + "student/users/students",
        //修改密码
        CHANGE_PASSWORD: NGINX_DIR + "student/sessions/password",
        //获取申请单列表
        GET_APPLICATION_LIST: NGINX_DIR + "student/applicationForms/abstracts",
        //添加申请表单
        ADD_APPLICATION_FORMS: NGINX_DIR + "student/applicationForms",
        //获取申请表单
        GET_APPLICATION_FORMS: NGINX_DIR + "student/applicationForms",
        //修改申请表单
        CHANGE_APPLICATION_FORMS: NGINX_DIR + "student/applicationForms",
        //添加申请关系
        ADD_APPLY_RELATIONS: NGINX_DIR + "student/applyRelations"
    }
}

module.exports = api;