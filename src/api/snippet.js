import Vue from "vue";
import VueResource from "vue-resource";

Vue.use(VueResource)

const HOST = process.env.API_HOST;

export default {
    list(payload) {
        return Vue.http.get(`${HOST}/snippet`, payload);
    },
    create(credentials) {
        return Vue.http.post(`${HOST}/snippet`, credentials)
    }
}