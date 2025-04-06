<template>
    <div class="world">
        <WallLayer v-for="wall in walls" :key="wall.id" :wall="wall" />
    </div>
</template>

<style>
 .world{
    height:100%;
    width:100%;
    background-color: rgba(255,255,0,0.4);
    display:flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: end;
    position:absolute;
    inset:0;
    z-index:99;
 }

 #wall-create-flag{
    width:100%;
    height:20px;
    background: yellow;
 }

 #wall-create-trigger{
    width:100%;
    height:20px;
    background: green;
    position:absolute;
    bottom: calc(100% + 20px);
    left:0;
 }
 #wall-destroy-trigger{
    width:100%;
    height:20px;
    background: red;
    position:absolute;
    top: calc(100% + 20px);
    left:0;
 }

</style>

<script>
import WallLayer from "@/components/WallLayer.vue";
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'WallManager',
    components: {
        WallLayer,
    },
    data() {
        return {
            speed: 1,            
            timePassed: 0,
            timerInterval: null
        }
    },
    computed: {
        ...mapGetters(['roundDepth', 'wallHeight', 'wallCount', 'walls']),
        numberOfWalls(){
            return Math.ceil(window.innerHeight / this.wallHeight);
        }
    },  
    watch: {
        timePassed(newValue) {
            this.updateTimer(newValue);
            this.moveMap();
        }
    },
    methods: {
        ...mapActions(['updateTimer', 'addWall']),
        moveMap(){
            const mapObjects = document.querySelectorAll('.mapObject');
            mapObjects.forEach((element) => {
                const currentBottom = parseInt(window.getComputedStyle(element).bottom, 10) || 0;
                element.style.bottom = `${currentBottom - this.speed}px`;
            });            
        },
        createInitialWallLayers() {
            for(let i = 0; i < this.numberOfWalls; i ++){
                this.addWall();
            }
        },
        startTimer() {
            this.timerInterval = setInterval(() => (this.timePassed += .01), 10);
        },
    },
    mounted() {
        this.createInitialWallLayers();
        this.startTimer();
    },
}
</script>
