
import authorDS from "../../api/author"

const state = {
    currentAuthor: {}
}

const actions = {
    login({ commit }, credentials) {
        authorDS.login(credentials)
    }
}

export default {
    state,
    actions
}