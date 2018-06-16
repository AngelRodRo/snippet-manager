import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import author from "./modules/author";
import snippet from "./modules/snippet";
import VuePaginate from "vue-paginate";

Vue.use(Vuex);
Vue.use(VuePaginate);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    modules: {
        auth,
        author,
        snippet
    },
    strict: debug
});
