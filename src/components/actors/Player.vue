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
      move: new Set(),
      moveSpeed: .30,
      isParalyzed: false,
      position: 50,
    }
  },
  computed: {},
  methods: {
    update() {
      if (this.move.size && !this.isParalyzed) {
        const direction = [...this.move].pop();

        if (direction === 'left') {
          this.position = Math.min(100, Math.max(0, this.position + (this.moveSpeed * -1)));
        } else if (direction === 'right') {
          this.position = Math.min(100, Math.max(0, this.position + this.moveSpeed));
        }
      }

      requestAnimationFrame(this.update);
    },
    setMove(e) {
      if (!this.move.has('left') && ['a', 'A', 'ArrowLeft'].includes(e.key)) {
        this.move.add('left');
      }

      if (!this.move.has('right') && ['d', 'D', 'ArrowRight'].includes(e.key)) {
        this.move.add('right');
      }
    },
    stopMove(e) {
      if (this.move.size) {
        if (this.move.has('left') && ['a', 'A', 'ArrowLeft'].includes(e.key)) {
          this.move.delete('left');
        }

        if (this.move.has('right') && ['d', 'D', 'ArrowRight'].includes(e.key)) {
          this.move.delete('right');
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