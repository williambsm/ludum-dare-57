<template>
  <div class="wall-layer mapObject" :style="{ height: height + 'px',  bottom: bottom + 'px' }">
    <wall class="left" />
    {{ wall.id }} - {{ hasIntersected }} - {{ isIntersecting }} - {{ bottom }}
    <wall class="right" />
  </div>
</template>

<style>
  .wall-layer {
    position: absolute !important;
    width:100%;
    background-color: rgba(0,0,0,0.1);
    display:flex;
    justify-content: space-between;
    flex-shrink: 0;
  }
</style>

<script>
import Wall from "@/components/Wall.vue";
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'WallLayer',
  props: ['wall'],
  emits: ['outside'],
  components: {
    Wall
  },
  data() {
    return {
      height: 10,
      bottom: 0,
      hasIntersected: false,
      isIntersecting: false,
    }
  },
  computed: {
    ...mapGetters(['roundDepth']),
  },
  methods: {
    ...mapActions(['addWall', 'removeWall']),
    destroy() {
      this.removeWall(this.wall.id);
    }
  },
  mounted() {
    this.height = this.wall.height;
    this.bottom = this.wall.bottom;

    const mapScreen = document.querySelector('.world');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          this.hasIntersected = true;
          this.isIntersecting = true;
        } else {
          this.isIntersecting = false;
          if (this.hasIntersected) {
            this.destroy();
          }
        }
      });
    }, {
      root: mapScreen,
      rootMargin: '0px',
      threshold: 0,
    });

    observer.observe(this.$el);
  }
}
</script>