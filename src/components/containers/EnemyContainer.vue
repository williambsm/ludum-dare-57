<template>
  <div class="enemy-container">
    <Enemy v-for="enemy in enemies" :enemyConfig="enemy" :key="enemy.id" @die="removeEnemy" />
  </div>
</template>

<style>
  .enemy-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
</style>

<script>
import Enemy from "@/components/actors/Enemy.vue";

export default {
  name: 'EnemyContainer',
  components: {
    Enemy
  },
  data() {
    return {
      enemyId: 0,
      enemies: [],
    }
  },
  computed: {},
  methods: {
    update() {
      const spawn = Math.floor(Math.random() * 101);

      if (spawn < 5) {
        this.spawnEnemy();
      }

      requestAnimationFrame(this.update);
    },
    spawnEnemy() {
      const enemyConfig = {
        id: this.enemyId++,
        color: ['red', 'yellow', 'green'][Math.floor(Math.random() * 3)],
      }

      this.enemies.push(enemyConfig);
    },
    removeEnemy(enemyId) {
      this.enemies = this.enemies.filter((enemy) => enemy.id !== enemyId);
    }
  },
  mounted() {
    this.animationFrameId = requestAnimationFrame(this.update);
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
</script>
