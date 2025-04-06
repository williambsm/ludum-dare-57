<template>
    <div class="screen game-view">
      <GameManager />
      <RoundStats/>
      <EnemyContainer />
      <Player />
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
import GameManager from "@/components/GameManager.vue";
import Player from "@/components/actors/Player.vue";
import RoundStats from '@/components/ui/RoundStats.vue';
import EnemyContainer from "@/components/containers/EnemyContainer.vue";

export default {
  name: "GameView",
  components: {
    GameManager,
    EnemyContainer,
    Player,
    RoundStats
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
