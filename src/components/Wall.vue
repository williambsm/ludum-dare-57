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
export default {
  name: 'Wall',
  data() {
    return {
      wallOffset : 0,
    }
  },
  computed: {},
  methods: {},
  mounted() {
    this.wallOffset = (50 - Math.random() * 100);
  },
}
</script>