import { createStore } from 'vuex'

export default createStore({
    state: {
        game: {
            name: "Snail Escape",
        },

        difficulty: {
            'easy' : 500,
            'medium' : 5000,
            'hard' : 50000,
        },

        round: {
            difficulty: 'easy',
            time: null,
            score: 0,
            depth: 0
        },

    },
    getters: {
        gameName(state) {
            return state.game.name;
        },
        roundStarted(state) {
            return state.round.time !== null;
        },
        roundTimer(state) {
            return state.round.time;
        },
        roundDepth(state) {
            return state.round.depth;
        },
    },
    mutations: {
        setRound(state) {
            state.round.score = 0;
            state.round.depth = state.difficulty[state.round.difficulty];
            state.round.time = 0;
        },
        setRoundTimer(state, value) {
            state.round.depth = depth;
        },
        setRoundDepth(state, value) {
            state.round.time = value;
        },
    },
    actions: {
        startGame(context) {
            context.commit("setRound");
        },
        updateTimer(context, value) {
            context.commit("setRoundTimer", value);
        },
        updateDepth(context, value) {
            context.commit("setRoundDepth", value);
        },
    },
    modules: {}
})
