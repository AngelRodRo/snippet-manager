import Vue from "vue";
import Router from "vue-router";

import LoginView from "../views/Login";
import IndexView from "../views/Index";
import RegisterView from "../views/Register";

Vue.use(Router);

export default new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: "/",
            component: IndexView,
            name: "indexView",
            meta: {
                title: "Home"
            }
        },
        {
            path: "/login",
            component: LoginView,
            name: "loginView",
            meta: {
                title: "Login"
            }
        },
        {
            path: "/register",
            component: RegisterView,
            name: "registerView",
            meta: {
                title: "Register"
            }
        },
        {
            path: "*",
            redirect: "/cc/dash"
        }
    ]
});
