import Vue from "vue";
import VueResource from "vue-resource";

Vue.use(VueResource)

const HOST = "http://localhost:3000";

export default {
    list(name) {
        return Vue.http.get(`${HOST}/api/snippet?name=${name}`).then(response => response.data);
    },
    create(credentials) {
        return Vue.http.post(`${HOST}/api/snippet`, credentials).then(response => response.data);
    }
}
