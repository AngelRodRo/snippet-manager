
import authorDS from "../../api/author"

const state = {
    currentAuthor: {}
}

const actions = {
    login({ commit }, credentials) {
        return authorDS.login(credentials)
    }
}

export default {
    state,
    actions
}