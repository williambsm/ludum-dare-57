<template>
  <div class="wall-layer map-object" :data-id="wall.id" :style="{ height: height + 'px', bottom: bottom + 'px', transform: 'translateY(0px)'}">
    <wall class="left" />
    {{ wall.id }} 
    <wall class="right" />
  </div>
</template>

<style>
.wall-layer {
  position: absolute !important;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: bottom;
  justify-content: space-between;
  flex-shrink: 0;
}
</style>

<script>
import Wall from "@/components/Wall.vue";
import { mapActions } from 'vuex';

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
      hasNotIntersected: true,
    }
  },
  computed: {},
  methods: {
    ...mapActions(['subscribeToMapBoundsObserver']),
  },
  mounted() {
    this.height = this.wall.height;
    this.bottom = this.wall.bottom;
    this.subscribeToMapBoundsObserver(this.$el);
  }
}
</script>