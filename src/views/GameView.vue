<template>
    <div class="screen game-view">
      <RoundStats/>
      <EnemyContainer />
      <GameManager/>
      <Player />
    </div>
</template>

<style>
.game-view {
  position: relative;
  width: 1280px;
  height: 720px;
  background-color: #5fc9ea;
  /* overflow: hidden; */
}
</style>

<script>
import Player from "@/components/actors/Player.vue";
import GameManager from "@/components/GameManager.vue";
import RoundStats from '@/components/ui/RoundStats.vue';
import EnemyContainer from "@/components/containers/EnemyContainer.vue";

export default {
  name: "GameView",
  components: {
    EnemyContainer,
    Player,
    RoundStats,
    GameManager,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
