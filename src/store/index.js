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

		rounds: 0,
    round: null,
    newRoundObj: {
			lost:false,
			won:false,
      player: null,
      size: 5,
      difficulty: "easy",
      time: 0,
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

		// ROUND
    roundCount(state) {
      return state.rounds;
    },
    roundStarted(state) {
      return state.round !== null;
    },
    roundPlayer(state, getters) {
			if(!getters.roundStarted) return null;
      return state.round.player;
    },
    roundLost(state) {
      return state.round !== null && state.round.lost;
    },
    roundWon(state) {
      return state.round !== null && state.round.won;
    },    
    roundTimer(state) {
      return state.round.time.toFixed(2);
    },
    roundDepth(state, getters) {
			if(!getters.roundStarted) return 0;
      return state.round.depth;
    },
    fallSpeed(state) {
      return state.round.size * state.speedFactor;
    },

		// ENEMIES
    enemies(state, getters) {
			if(!getters.roundStarted) return [];
			return state.round.enemies;
    },

    // WALLS
    wallHeight(state, getters) {
			if(!getters.roundStarted) return 0;
      return state.round.wallHeight;
    },
    walls(state, getters) {
			if(!getters.roundStarted) return [];
      return state.round.map;
    },
    wallId(state, getters) {
			if(!getters.roundStarted) return 0;
      return state.round.wallId;
    },
    wallCount(state, getters) {
			if(!getters.roundStarted) return 0;
      return state.round.map.length;
    },
    lastWall(state, getters) {
			if(!getters.roundStarted) return null;
      return state.round.map[getters.wallCount - 1];
    },
  },
  mutations: {
    // ROUND
    setRound(state) {
			state.rounds++ 
			state.round = {...state.newRoundObj};
      state.round.size = state.difficulty[state.round.difficulty]["playerSize"];
      state.round.depth = state.difficulty[state.round.difficulty]["initialDepth"];
      state.round.time = 0;
			console.log(state.round);
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

			if (state.round.mapBoundsObserver) {
				state.round.mapBoundsObserver.disconnect();
			}

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
    destroyMapBoundsObserver(state) {
			console.log("destroying observer!");
			if(state.round.mapBoundsObserver)
				state.round.mapBoundsObserver.disconnect();
    },
    subscribeToMapBoundsObserver(state, element) {
      state.round.mapBoundsObserver.observe(element);
    },
		// GAME STATE
    lose(state) {
      state.round.lost = true;
    },
		win(state) {
      state.round.won = true;
    },
  },
  actions: {
    // ROUND
    startGame(context) {
      context.commit("setRound");
    },
		restartGame(context) {
			context.state.round.map = null;
      context.commit("destroyMapBoundsObserver");
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
        id: `${context.getters.roundCount}-${context.getters.wallId}`,
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
    destroyMapBoundsObserver(context) {
      context.commit("destroyMapBoundsObserver");
    },
    subscribeToMapBoundsObserver(context, element) {
      element.classList.add("not-intersected");
      context.commit("subscribeToMapBoundsObserver", element);
    },

		// GAME STATE
    gameover(context) {
      console.log("gameover");
      context.commit("lose");
    },
    victory(context) {
      console.log("victory");
      context.commit("win");
    },

		// PLAYER COLLISION
    checkForCollision(context, els) {
      var el1 = els.el1;
      var el2 = els.el2;

      var el1_rect = el1.getBoundingClientRect();
      var el1_height = el1_rect.height;
      var el1_width = el1_rect.width;
      var el1_distance_from_top = el1_rect.top + el1_height;
      var el1_distance_from_left = el1_rect.left + el1_width;

      var el2_rect = el2.getBoundingClientRect();
      var el2_height = el2_rect.height;
      var el2_width = el2_rect.width;
      var el2_distance_from_top = el2_rect.top + el2_height;
      var el2_distance_from_left = el2_rect.left + el2_width;

      var not_colliding =
        el1_distance_from_top < el2_rect.top ||
        el1_rect.top > el2_distance_from_top ||
        el1_distance_from_left < el2_rect.left ||
        el1_rect.left > el2_distance_from_left;
      
				if (!not_colliding) {
        context.dispatch("gameover");
      }
    },

    checkForPlayerCollision(context, el) {
      var els = { el1: context.state.round.player, el2: el };
      context.dispatch("checkForCollision", els);
    },
  },
  modules: {},
});
