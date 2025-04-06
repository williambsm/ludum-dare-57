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
    ...mapGetters(['roundCount', "currentBiomeEnemyList"]),
  },
  methods: {
    ...mapActions(['addEnemy']),    
    update() {
      const spawn = Math.floor(Math.random() * 101);
      // THIS NEEDS TO SCALE WITH DIFFICULTY SETTING, AND SCORE/DEPTH/TIME, etc,
      if (spawn < 1) {
        this.spawnEnemy();
      }

      requestAnimationFrame(this.update);
    },
  
    spawnEnemy() {
      const enemyTypes = this.currentBiomeEnemyList;
      const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      const enemyConfig = {
        id: `${this.roundCount}-${this.enemyId++}`,
        type: enemyType,
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
