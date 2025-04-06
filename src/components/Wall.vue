<template>
  <div class="wall" :style="{ width : (400 + wallOffset) + 'px'}"/>
</template>

<style>
  .wall{
      height:100%;
      width:300px;
      background: burlywood;
  }
</style>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Wall',
  data() {
    return {
      wallOffset : 0,
    }
  },
  computed: {},
  methods: {
    ...mapActions(['checkForPlayerCollision']),
    update() {
      this.checkForPlayerCollision(this.$el);
      requestAnimationFrame(this.update);
    },
  },
  mounted() {
    this.wallOffset = (50 - Math.random() * 100);
    this.animationFrameId = requestAnimationFrame(this.update);
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
</script>