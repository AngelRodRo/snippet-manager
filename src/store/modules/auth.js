
import authorDS from "../../api/author"
import router from "../../router";
import Vue from "vue";
import VueCookie from "vue-cookie";
import * as _ from "lodash";

const state = {
    user: {},
    authenticated: false
}

const mutations = {
    AUTH_SUCCESS(_state, { token, id }) {
        VueCookie.delete("snip_public");
        VueCookie.set("snip_auth", token, { expires: `30000s` });
        VueCookie.set("snip_user", id, { expires: `30000s` });

        Vue.http.headers.common.Authorization = token;

        _state.authenticated = true;

        if ((router.history.current.query.redirect === "/logout")) {
            router.push({ path: "/" });
        } else if (_.isEmpty(router.history.current.query)) {
            router.push({ path: "/" });
        } else {
            router.push({ path: router.history.current.query.redirect });
        }
    },
    SET_USER(_state, response) {
        _state.user = response;
    }
}

const actions = {
    login({ commit, dispatch }, credentials) {
        debugger
        return authorDS.login(credentials)
            .then((response) => {
                const userId = response._id;
                commit("AUTH_SUCCESS", response);
                commit("SET_USER", response);
            }, (error) => {
                commit("SET_LOGIN_STATUS", error.data.error);
            });
    },
    getUser({ commit }, id) {
        return authorDS.getOne(id).then((response) => {
            commit("SET_USER", response);
            return response;
        });
    },
}

const getters = {
    isAuthenticated: state => state.authenticated
}

export default {
    state,
    mutations,
    actions,
    getters
}