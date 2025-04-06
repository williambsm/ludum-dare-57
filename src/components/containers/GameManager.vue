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
  computed: {},
  watch: {
    timePassed(newValue) {
      this.updateTimer(newValue);
    },
  },
  methods: {
    ...mapActions(['updateTimer']),
    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += .01), 10);
    },

  },
  mounted() {
    this.startTimer();
  },
}
</script>
