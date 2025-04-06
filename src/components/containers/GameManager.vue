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
      removed: false,
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
      if (this.removed) return;
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
  created() {
    console.log("created game manager")
    this.removed = false;
    
    this.startTimer();
    this.animationFrameId = requestAnimationFrame(this.update);
  },
  mounted() {
    console.log("mounted game manager");
  },
  beforeDestroy() {
    console.log("before destroy game manager");
  },
  beforeUnmount() {
    this.removed = true;    
    console.log("before unmount game manager");
    cancelAnimationFrame(this.animationFrameId);
  },
  destroyed() {
    console.log("destroyed game manager");
  },
  
}
</script>
