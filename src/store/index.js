import { createStore } from 'vuex'

export default createStore({
    state: {
        game: {
            name: "Snail Escape",
        },
    },
    getters: {
        gameName(state) {
            return state.game.name;
        }
    },
    mutations: {},
    actions: {},
    modules: {
    }
})
