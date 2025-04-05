<template>
    <div class="screen title-view">
        <h1>{{ gameName }}</h1>
        <Button @click="startGame()">Start Game</Button>
    </div>
</template>


<script>
// MIXINS
// import { StoreMixin } from "@/mixins/StoreMixin.js";

// COMPONENTS
import Button from "@/components/ui/Button.vue";

// VUEX
// import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

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
