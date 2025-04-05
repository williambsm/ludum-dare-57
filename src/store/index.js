import { createStore } from 'vuex'

export default createStore({
    state: {
        game: {
            name: "Snail Escape",
        },
        round: {
            started: false,
            time: 0,
            score: 0,
        },
    },
    getters: {
        gameName(state) {
            return state.game.name;
        },
        roundStarted(state) {
            return state.round.started;
        },
    },
    mutations: {
        startRound(state) {
            state.round.score = 0;
            state.round.time = 0;
            state.round.started = true;
        },
    },
    actions: {
        startGame(context) {
            context.commit("startRound");
        },
    },
    modules: {}
})
