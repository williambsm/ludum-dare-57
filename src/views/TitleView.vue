<template>
    <div class="screen title-view">
        <h1>{{ gameName }}</h1>
        <Button @click="startGame()">Start Game</Button>
    </div>
</template>


<script>
import Button from "@/components/ui/Button.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "TitleView",
  components: {
    Button,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["gameName"]),
  },
  methods: {
    ...mapActions(["startGame"]),
  },
};
</script>
