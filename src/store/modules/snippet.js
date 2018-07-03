
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
    listSnippets({ state, commit }, name = "") {
        return snippetDS.list(name)
            .then((snippets) => {
                commit("SET_SNIPPETS", snippets)
            })
    },
    createSnippet({ state }, payload) {
        return snippetDS.create(payload);
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
