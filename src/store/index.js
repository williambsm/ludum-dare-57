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
        removeWall(state) {
            state.round.map.slice(1);
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

        removeWall(context){
            context.commit("removeWall");
            context.dispatch("addWall");
        },
        addWall(context){
            // might add some logic here to change 'biomes' at certain depths, etc. this might change the neww wall's height
            
            const newWallHeight = context.getters.wallHeight;

            var lastWall = context.getters.wallCount == 0 
            ? { id : 0, bottom: 0, height: 0 } 
            : context.getters.lastWall;

            const newWall = { 
                id : lastWall.id + 1, 
                height: newWallHeight, 
                // bottom: lastWall.height + lastWall.bottom,
                bottom: newWallHeight * (lastWall.id),
                biome: "beach",
            };
            context.commit("addWall", newWall);
        },
    },
    modules: {}
})
