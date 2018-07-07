import Vue from "vue";
import VueResource from "vue-resource";

Vue.use(VueResource)

const HOST =  process.env.ROOT_HOST || "http://localhost:3000/api";

export default {
    list(name) {
        return Vue.http.get(`${HOST}/snippet?name=${name}`).then(response => response.data);
    },
    create(credentials) {
        return Vue.http.post(`${HOST}/snippet`, credentials).then(response => response.data);
    }
}
