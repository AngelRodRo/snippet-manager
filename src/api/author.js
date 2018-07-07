import Vue from "vue";
import VueResource from "vue-resource";

Vue.use(VueResource)

const HOST = process.env.ROOT_HOST || "http://localhost:3000/api";
debugger
export default {
    create(payload) {
        return Vue.http.post(`${HOST}/author`, payload);
    },
    login(credentials) {
        return Vue.http.post(`${HOST}/login`, credentials)
            .then(response => response.data);
    },
    getOne(id) {
        return Vue.http.get(`${HOST}/author/${id}`).then(response => response.data);
    }
}
