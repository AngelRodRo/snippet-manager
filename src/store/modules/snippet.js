
import snippetDS from "../../api/snippet";

const state = {
    snippets: []
}

const mutations = {
    SET_SNIPPETS(state, snippets) {
        state.snippets = snippets;
    }
}

const actions = {
    listSnippets({ state, commit }) {
        return snippetDS.list()
            .then(({ snippets }) => {
                commit("SET_SNIPPETS", snippets)
            })
    }
}

const getters = {
    getSnippets: state => state.snippets
}

export default {
    mutations,
    state,
    actions,
    getters
}