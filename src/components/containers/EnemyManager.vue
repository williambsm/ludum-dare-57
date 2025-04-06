<template></template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EnemyManager',  
  components: {},
  data() {
    return {
      enemyId: 0,
    }
  },
  computed: {
    ...mapGetters(['roundCount']),
  },
  methods: {
    ...mapActions(['addEnemy']),    
    update() {
      const spawn = Math.floor(Math.random() * 101);
      if (spawn < 1) {
        this.spawnEnemy();
      }

      requestAnimationFrame(this.update);
    },
  
    spawnEnemy() {
      // Determine what enemy to spawn based on depth/region, etc.
      const enemyConfig = {
        id: `${this.roundCount}-${this.enemyId++}`,
        classList: "puffer",
        color: ['red', 'yellow', 'green'][Math.floor(Math.random() * 3)],
      }
      
      this.addEnemy(enemyConfig);
    },
  },

  mounted() {
    this.animationFrameId = requestAnimationFrame(this.update);
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animationFrameId);
  }

}
</script>
