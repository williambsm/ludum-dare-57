<template>
  <div id="game-view" class="screen game-view">
    <GameManager ref="gameManager" />
    <EnemyManager ref="enemyManager" />
    <WallManager ref="wallManager" />

    <RoundStats />

    <Player />
    <Enemy v-for="enemy in enemies" :key="`${roundCount}-${enemy.id}`" :enemyConfig="enemy" />
    <WallLayer v-for="wall in walls" :key="`${roundCount}-${wall.id}`" :wall="wall" />

    <div class="overlay"/>
  </div>
</template>

<style>
.game-view {
  position: relative;
  /* width: 1280px; */
  /* height: 720px; */
  background-color: #5fc9ea;
  overflow: hidden;
}
.game-view .overlay {
  position: absolute;
  inset:0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #FFFFFF00,  #000000BB);
}
</style>

<script>
import GameManager from "@/components/containers/GameManager.vue";
import WallManager from "@/components/containers/WallManager.vue";
import EnemyManager from "@/components/containers/EnemyManager.vue";

import RoundStats from '@/components/ui/RoundStats.vue';

import Player from "@/components/actors/Player.vue";
import Enemy from "@/components/actors/Enemy.vue";
import WallLayer from "@/components/WallLayer.vue";

import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: "GameView",
  components: {
    GameManager,
    EnemyManager,
    WallManager,

    RoundStats,

    Player,
    Enemy,
    WallLayer,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['enemies', 'walls', 'roundCount']),
  },
  methods: {
    ...mapActions(['destroyMapBoundsObserver','createMapBoundsObserver']),
  },
  created() {    
    console.log("created");
    this.destroyMapBoundsObserver();
    this.createMapBoundsObserver(this.$el);
  },
  mounted() {
    console.log("mounted");
  }
};
</script>
