<template>
    <div class="round-stats">
      <div class="round-timer">{{ roundTimer }}</div>
      <div class="round-depth">{{ roundDepth }}</div>
    </div>
</template>

<style>
  .round-stats {
    width:100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

<script>
import { mapGetters } from 'vuex';


export default {
  name: 'RoundStats',
  data() {
      return {}
  },
  computed: {
      ...mapGetters(['gameName','roundTimer', 'roundDepth']),
  },
  methods: {

  }
}
</script>