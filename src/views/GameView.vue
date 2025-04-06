<template>
    <div class="screen game-view">
      <GameManager ref="gameManager"/>
      <WallManager ref="wallManager"/>
      <EnemyManager ref="enemyManager"/>
      
      <RoundStats/>
      
      <Player ref="player" />
      <Enemy v-for="enemy in enemies" :key="enemy.id" :enemyConfig="enemy" />

    </div>
</template>

<style>
.game-view {
  position: relative;
  width: 1280px;
  height: 720px;
  background-color: #5fc9ea;
  overflow: hidden;
}
</style>

<script>
import GameManager from "@/components/containers/GameManager.vue";
import WallManager from "@/components/containers/WallManager.vue";
import EnemyManager from "@/components/containers/EnemyManager.vue";

import RoundStats from '@/components/ui/RoundStats.vue';

import Player from "@/components/actors/Player.vue";
import Enemy from "@/components/actors/Enemy.vue";

import { mapGetters } from 'vuex';

export default {
  name: "GameView",
  components: {
    GameManager,
    WallManager,
    EnemyManager,

    RoundStats,

    Player,
    Enemy,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['enemies']),
  },
  methods: {},
};
</script>
