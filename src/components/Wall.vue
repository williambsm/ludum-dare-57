<template>
  <div class="wall" :style="{ width : (400 + wallOffset) + 'px'}"/>
</template>

<style>
  .wall{
      height:calc(100% + 10px);
      margin-top:-5px;
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
      removed: false,
    }
  },
  computed: {},
  methods: {
    ...mapActions(['checkForPlayerCollision']),
    update() {
      if(this.removed) return;
      this.checkForPlayerCollision(this.$el);
      requestAnimationFrame(this.update);
    },
  },
  mounted() {
    this.removed = false,
    this.wallOffset = (50 - Math.random() * 100);
    this.animationFrameId = requestAnimationFrame(this.update);
  },
  beforeUnmount() {
    this.removed = true,
    cancelAnimationFrame(this.animationFrameId);
  }
}
</script>