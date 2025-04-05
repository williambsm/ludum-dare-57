<template>
  <main>
    <TitleView v-if="!roundStarted"/>  
    <GameView v-else />  
  </main>
</template>

<script>
// MIXINS
// import { StoreMixin } from "@/mixins/StoreMixin.js";

// COMPONENTS
import TitleView from "@/views/TitleView.vue";
import GameView from "@/views/GameView.vue";

// VUEX
// import { mapState } from "vuex";
import { mapGetters } from "vuex";
// import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    TitleView,
    GameView,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["gameName", "roundStarted"]),
  },
};
</script>