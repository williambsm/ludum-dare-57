<template>
  <div :class="['enemy', type, type != 'eel' ? 'map-object' :'']" :data-id="id"
    :style="{ left: this.x+'px', top: this.y+'px', transform: 'translateY(0px)' }">
      <label>{{ type }}</label>
      <div class="vision"></div>
    </div>
</template>

<style>
.enemy {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: red;
}
.enemy label{
  position:absolute;
  bottom:100%;
  color:red;
}
.enemy .vision {
  position:absolute;
  background-color: rgba(255,0,0,0.25);
}
.enemy.eel .vision{
  left:0;
  bottom:100%;
  height: 720px;
  width:100%;
}
.enemy.puffer .vision{
  height: 300%;
  width:300%;
  transform: translateX(-33.33%) translateY(-33.33%);
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';

import { HelperMixin } from "@/mixins/HelperMixin.js";

export default {
  name: 'Enemy',
  props: ['enemyConfig'],
  mixins: [HelperMixin],
  components: {},
  data() {
    return {
      id: null,
      type: null,
      color: 'red',
      x: 0,
      y: -20,
      removed: false,
      
      visionEl: null,

      screenWidth : 1280,
      screenHeight : 720,

      savedCoords: {
        x:null,
        y:null,
      },
      attackCoords: {
        x:null,
        y:null,
      },
      attackSpeed : 6,
    }
  },
  computed: {
    ...mapGetters(['roundLost']),
    ...mapGetters(['fallSpeed']),

    attacking(){
      return this.attackCoords.y != null || this.attackCoords.x != null;
    },

    xCoords(){
      return `${this.x}px`;
    },
    yCoords(){
      if(this.type == 'eel') return `${this.y}px`;
      return `${this.y}px`;
    },
  },
  watch:{
    roundLost(newValue){
      if(newValue) this.die();
    },
  },
  methods: {
    ...mapActions(['removeEnemy', 'subscribeToMapBoundsObserver']),
    ...mapActions(['checkForPlayerCollision']),
    update() {
      if (this.removed) return;

      if(this.isPlayerColliding(this.$el)){
        console.log("player killed");
      } else if(!this.attacking){
        if(this.isPlayerColliding(this.visionEl)){
          console.log("player seen");
          this.attackCoords.y = this.getPlayerY();
          console.log(this.attackCoords.y);
        }
      } else if (this.attacking){
        
        if(this.attackCoords.y != null) {
          console.log("yup");
          if(this.y == this.attackCoords.y) {
            console.log("1");
            this.attackCoords.y = null;
          } else if(Math.abs(this.y - this.attackCoords.y) < (this.attackSpeed)) {
            console.log("2");
            this.y = this.attackCoords.y;
          } else if(this.y < this.attackCoords.y){
            console.log("3");
            this.y -= this.attackSpeed;
          } else if(this.y > this.attackCoords.y){
            console.log("4");
            this.y += this.attackSpeed;
          }
        }
        
      }
      
      requestAnimationFrame(this.update);
    },
    die() {
      this.removeEnemy(this.id);
    },

    generateAboveSpawnCoord() {
      this.y = -100;
    },    
    generateBelowSpawnCoord() {
      this.y = this.screenHeight;
    },

    generateBetweenSpawnCoord() {
      this.x = Math.floor(Math.random() * (this.screenWidth/3)) + (this.screenWidth/3);
    },
    generateWallSpawnCoord() {
      this.x = -100;
    },

    setStartingPosition() {
      switch(this.type){
        case "eel":
          // Spawn below screen between walls
          this.generateBelowSpawnCoord();
          this.generateBetweenSpawnCoord();
        break;
        case "puffer":
          // Spawn above screen between walls.
          this.generateAboveSpawnCoord();
          this.generateBetweenSpawnCoord();
        break;
        case "urchin":
          // Spawn above screen on wall
          this.generateAboveSpawnCoord();
          this.generateWallSpawnCoord();
        break;
        default:
          // Spawn above screen between walls.
          this.generateAboveSpawnCoord();
          this.generateBetweenSpawnCoord();
      }
    }
  },
  mounted() {
    this.id = this.enemyConfig.id;
    this.type = this.enemyConfig.type;
    this.setStartingPosition();
    
    this.visionEl = this.$el.querySelector('.vision');

    // this.color = this.enemyConfig.color;
    // this.x = Math.floor(Math.random() * 101);

    this.subscribeToMapBoundsObserver(this.$el);

    this.animationFrameId = requestAnimationFrame(this.update);
  },
  beforeUnmount() {
    this.removed = true;    
    cancelAnimationFrame(this.animationFrameId);
  }
}
</script>
