<template></template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'WallManager',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['wallHeight']),
    numberOfWalls() {
      return Math.ceil(window.innerHeight / this.wallHeight);
    }
  },
  methods: {
    ...mapActions(['addWall']),    

    createInitialWallLayers() {
      for (let i = 0; i < this.numberOfWalls; i++) {
        this.addWall();
      }
    },
  },
  mounted() {
    this.createInitialWallLayers();
  },  
}
</script>
