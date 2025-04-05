<template>
  <div class="enemy-container">
    <Enemy />
  </div>
</template>

<style>
  .enemy-container {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>

<script>
import Enemy from "@/components/actors/Enemy.vue";

export default {
  name: 'EnemyContainer',
  components: {Enemy},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
