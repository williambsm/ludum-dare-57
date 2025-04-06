<template>
  <div :class="['enemy map-object puffer attacking ', attacking ? 'attacking' : '']" :data-id="id"
    :style="{ left: x + '%', top: y + '%', transform: 'translateY(0px)' }">
    <div class="vision"/>
  </div>
</template>

<style>

.enemy {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
}

.enemy.puffer {
  width: 30px;
  height: 30px;
  border-radius:100%;
  background-color: orange;
}

.enemy.puffer.attacking {
  transform: scale(3);
}

.enemy .vision {
  position:absolute;
  width: 200px;
  height:200px;
  background: rgba(255,0,0,0.5);
  border-radius: 100%;
}


.enemy.fish {
  width: 40px;
  height:25px;
  background: yellow;
  border-radius: 100% 50% 100% 0;
}

.enemy.fish {
  width: 40px;
  height:25px;
  background: yellow;
  border-radius: 100% 50% 100% 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.enemy.fish::before {
  content:"";
  position:absolute;
  top:10%;
  right:20%;
  width: 5px;
  height:5px;
  background: white;
  border-radius: 100%;
}
</style>

<script>
import { HelperMixin } from "@/mixins/HelperMixin.js";
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Enemy',
  props: ['enemyConfig'],
  mixins: [HelperMixin],
  components: {},
  data() {
    return {
      visionEl: null,
      attacking: false,

      id: null,
      color: 'red',
      x: 0,
      y: -20,
      removed: false,
      clss: "",

      
      amplitude: 100, // Amplitude of the sine wave (vertical movement)
      frequency: 0.05, // Frequency of the sine wave (speed of up/down motion)
      time: 0,
      speed: 1,
    }
  },
  computed: {
    ...mapGetters(['fallSpeed']),
  },
  methods: {
    ...mapActions(['removeEnemy', 'subscribeToMapBoundsObserver']),
    ...mapActions(['checkForPlayerCollision']),
    update() {
      if (this.removed) return;
      this.move();

      const seesPlayer = this.isPlayerColliding(this.visionEl);
      if(seesPlayer) {
         this.attacking = true;
         console.log("ATTACK!");
      } else {
        this.attacking = false;
      }

      this.checkForPlayerCollision(this.$el);
      requestAnimationFrame(this.update);
    },
    die() {
      this.removeEnemy(this.id);
    },

    seePlayer(){
      console.log("sees player!");
    },

    move(){
      // this.x += this.speed;
      // this.y += this.speed;

        // Update X position (move horizontally)
      // this.x = this.x + this.speed;
      // if (this.x > window.innerWidth) {
      //   this.x = -this.$el.offsetWidth; // Reset to the left if it moves off the screen
      // }

      // this.y = window.innerHeight / 2 + this.amplitude * Math.sin(this.frequency * this.time);


    }

  },
  mounted() {
    this.id = this.enemyConfig.id;
    this.clss = this.enemyConfig.classList;
    this.color = this.enemyConfig.color;
    this.x = Math.floor(Math.random() * 101);

    this.visionEl = this.$el.querySelector('.vision');

    this.subscribeToMapBoundsObserver(this.$el);

    this.animationFrameId = requestAnimationFrame(this.update);
  },
  beforeUnmount() {
    this.removed = true;    
    cancelAnimationFrame(this.animationFrameId);
  }
}
</script>
