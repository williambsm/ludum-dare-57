import { createStore } from 'vuex'

export default createStore({
    state: {
        game: {
            name: 'Snail Escape',
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
            depth: 0,
            wallHeight: 100,
            wallId: 0,
            map:[]
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
        wallHeight(state) {
            return state.round.wallHeight;
        },
        walls(state) {
            return state.round.map;
        },
        wallId(state) {
            return state.round.wallId;
        },
        wallCount(state) {
            return state.round.map.length;
        },
        lastWall(state, getters) {
            return state.round.map[getters.wallCount-1];
        },
    },
    mutations: {
        setRound(state) {
            state.round.score = 0;
            state.round.depth = state.difficulty[state.round.difficulty];
            state.round.time = 0;
        },
        setRoundTimer(state, value) {
            state.round.time = value;
        },
        setRoundDepth(state, value) {
            state.round.depth = value;
        },
        addWall(state, value) {
            state.round.map.push(value);
        },
        removeWall(state, wallId) {
            state.round.map = state.round.map.filter(wall => wall.id !== wallId);
        },
        setWallId(state) {
            state.round.wallId++;
        }
    },
    actions: {
        startGame(context) {
            context.commit('setRound');
        },
        updateTimer(context, value) {
            context.commit('setRoundTimer', value);
        },
        updateDepth(context, value) {
            context.commit('setRoundDepth', value);
        },
        removeWall(context, wallId){
            context.commit('removeWall', wallId);
            context.dispatch('addWall');
        },
        addWall(context){
            const newWall = {
                id : context.getters.wallId,
                height: context.getters.wallHeight,
                bottom: context.getters.wallHeight * (context.getters.walls.length),
                biome: 'beach',
            };

            context.commit('setWallId');
            context.commit('addWall', newWall);
        },
    },
    modules: {}
})
