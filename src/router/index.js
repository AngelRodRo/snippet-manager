import Vue from "vue";
import Router from "vue-router";

import PageNotFoundView from "../views/PageNotFoundView";

const ForgotPasswordView = () => import(/* webpackChunkName: "sign-view-group" */ "../views/ForgotPasswordView");
const LoginView = () => import("../views/Login.vue")

Vue.use(Router);

export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: "/login",
            component: LoginView,
            name: "loginView",
            meta: {
                title: "Login",
                checkAuth: true
            }
        },
        {
            path: "*",
            redirect: "/cc/dash"
        }
    ]
});
