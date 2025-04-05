<template>
    <div class="screen game-view">
      <Player />
    </div>
</template>

<style>
.game-view {
  width: 1280px;
  height: 720px;
  background-color: #5fc9ea;
  overflow: hidden;
}
</style>

<script>
import Player from "@/components/actors/Player.vue";

export default {
  name: "GameView",
  components: {
    Player
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
