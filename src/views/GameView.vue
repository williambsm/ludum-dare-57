<template>
    <div class="screen game-view">
      <RoundStats/>
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
import Player from "@/components/actors/Player.vue";
import RoundStats from '@/components/ui/RoundStats.vue';

export default {
  name: "GameView",
  components: {
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
