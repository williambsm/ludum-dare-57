import { createStore } from "vuex";

export default createStore({
  state: {
    game: {
      name: "Snail Escape",
    },

    difficulty: {
      easy: {
        initialDepth: 500,
        playerSize: 5,
      },
      medium: {
        initialDepth: 5000,
        playerSize: 6,
      },
      hard: {
        initialDepth: 50000,
        playerSize: 8,
      },
    },

    speedFactor: 0.5,

    round: {
      size: 5,
      difficulty: "easy",
      time: null,
      score: 0,
      depth: 0,
      enemies: [],
      wallHeight: 100,
      wallId: 0,
      map: [],
      mapBoundsObserver: null,
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
      return state.round.time.toFixed(2);
    },
    roundDepth(state) {
      return state.round.depth;
    },
    fallSpeed(state) {
      return state.round.size * state.speedFactor;
    },
    enemies(state) {
      return state.round.enemies;
    },
    // WALLS
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
      return state.round.map[getters.wallCount - 1];
    },
  },
  mutations: {
    // ROUND
    setRound(state) {
      state.round.score = 0;
      state.round.depth =
        state.difficulty[state.round.difficulty]["initialDepth"];
      state.round.size = state.difficulty[state.round.difficulty]["playerSize"];
      state.round.time = 0;
    },
    setRoundTimer(state, value) {
      state.round.time = value;
    },
    setRoundDepth(state, value) {
      state.round.depth = value;
    },
    // ENEMIES
    addEnemy(state, enemyConfig) {
      state.round.enemies.push(enemyConfig);
    },
    removeEnemy(state, enemyId) {
      state.round.enemies = state.round.enemies.filter(
        (enemy) => enemy.id !== enemyId
      );
    },
    // WALLS
    addWall(state, value) {
      state.round.wallId++;
      state.round.map.push(value);
    },
    removeWall(state, wallId) {
      state.round.map = state.round.map.filter((wall) => wall.id !== wallId);
    },
    // MAP
    createMapBoundsObserver(state, gameViewEl) {
      state.round.mapBoundsObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("not-intersected");
            } else {
              if (!entry.target.classList.contains("not-intersected")) {
                const elId = entry.target.dataset.id;
                if (entry.target.classList.contains("wall-layer")) {
                  // REMOVE WALL
                  state.round.map = state.round.map.filter(
                    (wall) => wall.id != elId
                  );
                  // ADD WALL
                  state.round.wallId = state.round.wallId + 1;
                  const newWall = {
                    id: state.round.wallId,
                    height: state.round.wallHeight,
                    bottom: state.round.wallHeight * state.round.map.length,
                    biome: "beach",
                  };
                  state.round.map.push(newWall);
                } else if (entry.target.classList.contains("enemy")) {
                  // REMOVE ENEMY
                  state.round.enemies = state.round.enemies.filter(
                    (enemy) => enemy.id != elId
                  );
                }
              }
            }
          });
        },
        {
          // Options for the observer: we want to detect any intersection
          root: gameViewEl,
          rootMargin: "0px",
          threshold: 0,
        }
      );
    },
    subscribeToMapBoundsObserver(state, element) {
      state.round.mapBoundsObserver.observe(element);
    },
  },
  actions: {
    // ROUND
    startGame(context) {
      context.commit("setRound");
    },
    updateTimer(context, value) {
      context.commit("setRoundTimer", value);
    },
    updateDepth(context, value) {
      context.commit("setRoundDepth", value);
    },
    // ENEMIES
    addEnemy(context, enemyConfig) {
      context.commit("addEnemy", enemyConfig);
    },
    removeEnemy(context, enemyId) {
      context.commit("removeEnemy", enemyId);
    },
    // WALLS
    removeWall(context, wallId) {
      console.log(`remove: ${wallId}`);
      context.commit("removeWall", wallId);
      context.dispatch("addWall");
    },
    addWall(context) {
      const newWall = {
        id: context.getters.wallId,
        height: context.getters.wallHeight,
        bottom: context.getters.wallHeight * context.getters.walls.length,
        biome: "beach",
      };
      context.commit("addWall", newWall);
    },
    // MAP
    createMapBoundsObserver(context, gameViewEl) {
      context.commit("createMapBoundsObserver", gameViewEl);
    },
    subscribeToMapBoundsObserver(context, element) {
      element.classList.add("not-intersected");
      context.commit("subscribeToMapBoundsObserver", element);
    },
  },
  modules: {},
});
