import authorDS from "../../api/author";

const actions = {
    register({ commit }, payload) {
        return authorDS.register(payload).then(response => response.data)
    }
}

module.exports = {
    actions
}