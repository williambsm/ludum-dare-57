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

        biomes: {
            beach : {
                wallHeight : 50,
                color: 'red',
            },
            gorge : {
                wallHeight : 200,
                color: 'blue',
                depth:500,
            },
        },

        round: {
            difficulty: 'easy',
            time: null,
            score: 0,
            depth: 0,

            map:{}
             
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
            return (state.round.time).toFixed(1);
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
            console.log("removing wall more");
            // state.round.map.slice(1);
            // state.round.map.slice(0,1);
            // Vue.delete(state.round.map, 0);
            // state.items = state.items.slice(1);
            // state.round.map.slice(1);
            // console.log(state.round.map);
            // state.round.map = state.round.map.slice(1);
            // console.log(state.round.map);
            state.round.map = state.round.map.slice(1);

            
            // Splice removes the first item of the array

            // This line ensures Vue reacts to the change if using Vue 2.x
            // state.round.map = [...state.round.map.splice(1)]; // Creates a new array reference
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
            console.log("removing wall");
            context.commit("removeWall");
            context.dispatch("addWall");
        },
        addWall(context){
            // might add some logic here to change 'biomes' at certain depths, etc. this might change the neww wall's height
            
            const newWall = { 
                id : context.getters.lastWall.id + 1, 
                height: context.getters.wallHeight, 
                bottom: context.getters.lastWall.height + context.getters.lastWall.bottom,
                biome: "beach",
            };
            context.commit("addWall", newWall);

            // const newWallHeight = context.getters.wallHeight;

            // var lastWall = context.getters.wallCount == 0 
            // ? { id : 0, bottom: 0, height: 0 } 
            // : context.getters.lastWall;

            // console.log("lastWall");
            // console.log(lastWall);
            // const newWall = { 
            //     id : lastWall.id + 1, 
            //     height: newWallHeight, 
            //     bottom: lastWall.height + lastWall.bottom,
            //     // bottom: newWallHeight * (lastWall.id),
            //     biome: "beach",
            // };
            // context.commit("addWall", newWall);
        },
    },
    modules: {}
})
