/** global: EventTarget */

import * as _ from "lodash";
import { sync } from "vuex-router-sync";
import VueCookie from "vue-cookie";
import Vue from "vue";
import VueLazyload from "vue-lazyload";
import VueResource from "vue-resource";

import App from "./App";
import store from "./store";
import router from "./router";
import Vuelidate from "vuelidate"

Vue.use(Vuelidate)

Vue.use(VueCookie);
Vue.use(VueResource);
Vue.use(VueLazyload);


/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
const bus = new Vue({});

router.beforeEach((to, from, next) => {
    // Set Page Title
    document.title = `${to.meta.title}`;
    // Evaluate subdomain client if not filled re-direct to /find-team
    if (to.path === "/") {
        store.dispatch("isAuthenticated")
            .then(() => {
                next();
            });
    }
    // Authentication
    if (!to.meta.requiresAuth) {
        if (to.meta.checkAuth) {
            if (VueCookie.get("snip_user") && VueCookie.get("snip_auth")) {
                next({ path: "/" });
            }
        }
        next();
    } else {
        store.dispatch("isAuthenticated")
            .then((isAuth) => {
                if (isAuth) {
                    next();
                } else {
                    next({ path: "/login", query: { redirect: to.fullPath } });
                }
            });
    }
});

// HTTP INTERCEPTOR
const interceptors = function (request, next) {
    if (!request.params.cache) {
        request.headers.set("Cache-Control", "no-cache, no-store");
        request.url += `${request.url.indexOf("?") > 0 ? "&" : "?"}cb=${new Date().getTime()}`;
    }
    next((response) => {
        // continue to next interceptor
    });
};
Vue.http.interceptors.push(interceptors);

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);


// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.


Object.defineProperty(Vue.prototype, "$bus", {
    get() {
        return this.$root.bus;
    },
    set(newInstance) {
        this.$root.bus = newInstance;
    }
});

const app = new Vue({
    router,
    store,
    el: "#app",
    template: "<App/>",
    components: {
        App
    },
    data: {
        bus
    }
});

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
export { app, router, store };
