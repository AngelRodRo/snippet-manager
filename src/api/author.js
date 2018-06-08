import Vue from "vue";
import VueResource from "vue-resource";

Vue.use(VueResource)

const HOST = process.env.API_HOST;

export default {
    register(payload) {
        return Vue.http.post(`${HOST}/author`, payload);
    },
    login(credentials) {
        return Vue.http.post(`${HOST}/login`, credentials)
    }
}