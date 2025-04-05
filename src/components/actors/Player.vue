<template>
  <div class="player" :style="{ left: position + '%' }"></div>
</template>

<style>
  .player {
    position: absolute;
    bottom: 20%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.6);
    border: 1px rgba(255, 255, 255, 0.7) solid;
    border-radius: 100%;
  }
</style>

<script>
export default {
  name: "Player",
  components: {},
  data() {
    return {
      name: "Dumpy",
      isMoving: false,
      velocity: 0,
      moveSpeed: .30,
      isParalyzed: false,
      position: 50,
    }
  },
  computed: {},
  methods: {
    update() {
      if (this.isMoving && !this.isParalyzed) {
        this.position = Math.min(100, Math.max(0, this.position + this.velocity));
      }

      requestAnimationFrame(this.update);
    },
    setMove(e) {
      if (this.isMoving) return;

      if (e.key === 'a' || e.key === 'ArrowLeft') {
        this.isMoving = true;
        this.velocity = this.moveSpeed * -1;
      }

      if (e.key === 'd' || e.key === 'ArrowRight') {
        this.isMoving = true;
        this.velocity = this.moveSpeed;

        this.position++;
      }
    },
    stopMove(e) {
      if (this.isMoving) {
        if (['a', 'd', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          this.isMoving = false;
          this.velocity = 0;
        }
      }
    }
  },
  mounted() {
    this.animationFrameId = requestAnimationFrame(this.update);

    document.addEventListener('keydown', this.setMove);
    document.addEventListener('keyup', this.stopMove);
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
</script>