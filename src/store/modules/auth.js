
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
    AUTH_SUCCESS(_state, { token, _id }) {
        VueCookie.delete("snip_public");
        VueCookie.set("snip_auth", token, { expires: `3000000000s` });
        VueCookie.set("snip_user", _id, { expires: `300000000s` });

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
    },
    AUTH_ENABLED(state, value) {
        state.authenticated = value;
    },
    AUTH_LOGOUT(_state, redirect = true) {
        _state.authenticated = false;
        _state.user = null;
        _state.messages = "";

        VueCookie.delete("snip_auth");
        VueCookie.delete("snip_user");
    }
}

const actions = {
    async login({ commit, dispatch }, credentials) {
        try {
            const response = await authorDS.login(credentials)
            const userId = response._id;
            commit("AUTH_SUCCESS", response);
            commit("SET_USER", response);
        } catch (error) {
            commit("SET_LOGIN_STATUS", error.data.error);
        }
    },
    async getUser({ commit }, id) {
        const response = await authorDS.getOne(id);
        commit("SET_USER", response);
        return response;
    },
    async isAuthenticated({ dispatch, commit }) {
        const id = VueCookie.get("snip_user");
        if (!VueCookie.get("snip_auth")) {
            commit("AUTH_LOGOUT");
            return false;
        }

        Vue.http.headers.common.Authorization = VueCookie.get("snip_auth");

        try {
            const response = await authorDS.getOne(id)
            commit("SET_USER", response);
            commit("AUTH_ENABLED", true);
        } catch (error) {
            if (error.status === 401 && (VueCookie.delete("snip_auth") && VueCookie.delete("snip_user"))) {
                VueCookie.delete("snip_auth");
                VueCookie.delete("snip_user");
             }
            return false;
        }
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