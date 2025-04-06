<template>
  <div class="wall" :style="{ width : (400 + wallOffset) + 'px'}"/>
</template>

<style>
  .wall{
      height:calc(100% + 10px);
      margin-top:-5px;
      width:300px;
      background: linear-gradient(to bottom, #B4906C, #856353);
      border-radius: 40px;
      border: 0px solid transparent;
      border-top-width: 10px;
      border-top-color: #B9997A;
  }
  .wall.left{
    border-radius: 0 5px 30% 0;
  }
  .wall.right{
    border-radius: 5px 0 0 30% ;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
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