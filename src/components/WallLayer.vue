<template>
  <div class="wall-layer map-object" :data-id="wall.id" :style="{ height: height + 'px', bottom: bottom + 'px', transform: 'translateY(0px)'}">
    <wall :class="['left', biome]" />
    <wall :class="['right', biome]" />
  </div>
</template>

<style>
.wall-layer {
  position: absolute !important;
  width: 100%;
  display: flex;
  align-items: bottom;
  justify-content: space-between;
  flex-shrink: 0;
}
</style>

<script>
import Wall from "@/components/Wall.vue";
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'WallLayer',
  props: ['wall'],
  components: {
    Wall
  },
  data() {
    return {
      height: 10,
      bottom: 0,
      biome: 0,
      hasNotIntersected: true,
    }
  },
  computed: {
    ...mapGetters(['currentBiome']),
  },
  methods: {
    ...mapActions(['subscribeToMapBoundsObserver']),
  },
  mounted() {
    this.height = this.wall.height;
    this.bottom = this.wall.bottom;
    this.biome = this.currentBiome;
    this.subscribeToMapBoundsObserver(this.$el);
  }
}
</script>