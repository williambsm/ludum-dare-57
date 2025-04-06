<template>
  <div class="screen lose-view">
      <h1> You Won!</h1>
      <Button @click="restartGame()">Retry</Button>
  </div>
</template>


<script>
import Button from "@/components/ui/Button.vue";

import { mapActions } from "vuex";

export default {
name: "WonView",
components: {
  Button,
},
data() {
  return {};
},
computed: {},
methods: {
  ...mapActions(["restartGame"]),
},
};
</script>
