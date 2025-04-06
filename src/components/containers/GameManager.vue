<template></template>

<style></style>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'GameManager',
  components: {},
  data() {
    return {
      timePassed: 0,
      timerInterval: null,
    }
  },
  computed: {
    ...mapGetters(['fallSpeed']),
  },
  watch: {
    timePassed(newValue) {
      this.updateTimer(newValue);
    },
  },
  methods: {
    ...mapActions(['updateTimer']),    
    update() {
      this.moveMap();
      requestAnimationFrame(this.update);
    },
    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += .01), 10);
    },
    
    moveMap(){
      const mapObjects = document.querySelectorAll('.map-object');
      mapObjects.forEach((element) => {        
        const transform = element.style.transform;
        let translateY = 0;
        if (transform && transform.includes('translateY')) {
            const match = transform.match(/translateY\(([-\d.]+)px\)/);
            if (match) {
                translateY = parseFloat(match[1]);
                element.style.transform = `translateY(${translateY + this.fallSpeed}px)`;
            }
        }
      });
    },
  },
  mounted() {
    this.startTimer();
    this.animationFrameId = requestAnimationFrame(this.update);
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
</script>
