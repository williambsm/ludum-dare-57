<template>
    <LoseView v-if="roundLost" />  
    <WonView v-else-if="roundWon" />  
    <TitleView v-else-if="!roundStarted" />  
    <GameView v-else /> 
</template>

<script>
// MIXINS
// import { StoreMixin } from "@/mixins/StoreMixin.js";

// COMPONENTS
import TitleView from "@/views/TitleView.vue";
import GameView from "@/views/GameView.vue";
import LoseView from "@/views/LoseView.vue";
import WonView from "@/views/WonView.vue";

// VUEX
// import { mapState } from "vuex";
import { mapGetters } from "vuex";
// import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    TitleView,
    GameView,
    LoseView,
    WonView,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["gameName", "roundStarted", "roundLost", "roundWon"]),
  },
};
</script>