<template>
  <div class="wall-layer map-object" :style="{ height: height + 'px', bottom: bottom + 'px', transform: 'translateY(0px)'}">
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
import { mapGetters, mapActions } from 'vuex';

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
  computed: {
    ...mapGetters(['wallHeight']),},
  methods: {
    ...mapActions(['removeWall']),
  },
  mounted() {
    this.height = this.wall.height;
    this.bottom = this.wall.bottom;

    const gameView = document.querySelector('#game-view');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.hasNotIntersected = false;
        } else {
          if(!this.hasNotIntersected){
            this.removeWall(this.wall.id);
          }
        }
      });
    }, {
      // Options for the observer: we want to detect any intersection
      root: gameView, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0 // 10% of the target element needs to be visible
    });
    observer.observe(this.$el);
  }
}
</script>