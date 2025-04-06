<template>
  <div class="enemy map-object" :data-id="id"
    :style="{ left: x + '%', top: y + '%', backgroundColor: color, transform: 'translateY(0px)' }"></div>
</template>

<style>
.enemy {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: red;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Enemy',
  props: ['enemyConfig'],
  components: {},
  data() {
    return {
      id: null,
      color: 'red',
      x: 0,
      y: -20,
    }
  },
  computed: {
    ...mapGetters(['fallSpeed']),
  },
  methods: {
    ...mapActions(['removeEnemy', 'subscribeToMapBoundsObserver']),
    ...mapActions(['checkForPlayerCollision']),
    update() {
      // this.y = this.y + this.fallSpeed;

      // if (this.y > 120) this.die();

      this.checkForPlayerCollision(this.$el);

      requestAnimationFrame(this.update);
    },
    die() {
      this.removeEnemy(this.id);
    }
  },
  mounted() {
    this.id = this.enemyConfig.id;
    this.color = this.enemyConfig.color;
    this.x = Math.floor(Math.random() * 101);

    this.subscribeToMapBoundsObserver(this.$el);

    this.animationFrameId = requestAnimationFrame(this.update);
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
</script>
