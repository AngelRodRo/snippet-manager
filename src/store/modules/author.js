import authorDS from "../../api/author";

const actions = {
    createAuthor({ commit }, payload) {
        return authorDS.create(payload).then(response => response.data)
    }
}

export default {
    actions
}