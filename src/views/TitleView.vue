<template>
    <div class="screen title-view">
        <h1>{{ gameName }}</h1>
        <Button @click="startGame()">Start Game</Button>

        <div class="image bubble"/>
    </div>
</template>

<style>
.title-view{
  background: linear-gradient(to bottom, #55E2E9, 5%, #0496C7, 50%, #02367B);
}

.ui-button{
  padding:16px 24px;
  border-radius:6px;
  border:none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap:px;
  background: #55E2E9;
}
</style>

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
