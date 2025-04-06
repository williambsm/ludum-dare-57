<template>
    <div class="world">
        <div id="wall-create-trigger"/>

        <div class="wall-group red mapObject" ></div>
        <div class="wall-group blue mapObject"></div>

        <div id="wall-create-flag"/>
        {{ wallCount }} - {{ numberOfWalls }} - {{ wallHeight }}

        <WallLayer v-for="(wall, index) in walls" :key="index" :wall="wall"  />

        <div id="wall-destroy-trigger"/>
    </div>
</template>

<style>
 .wall-group{
    height:2000px;
    width:100%;
    position:absolute;
    opacity:0.5;
 }
 .wall-group.red{
    background:red;
    bottom:0;
    left:0;

 }
 .wall-group.blue{
    background:blue;
    bottom:2000px;
    left:0;
 }
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
    name: 'GameManager',
    components: {
        WallLayer,
    },
    data() {
        return {
            speed: 100,            
            timePassed: 0,
            timerInterval: null
        }
    },
    computed: {
        ...mapGetters(['roundDepth', 'wallHeight', 'wallCount', 'walls']),
        numberOfWalls(){
            return Math.ceil(window.innerHeight / this.wallHeight) / 10;
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
            console.log("createInitialWallLayers");
            // this.walls = Array(this.numberOfWalls).fill(null); 
            for(var i = 0; i < this.numberOfWalls; i ++){
                console.log("loggin");
                this.addWall();
            }
        },
        startTimer() {
            this.timerInterval = setInterval(() => (this.timePassed += .1), 100);
        },
        
       
    },
    mounted() {
        // this.createInitialWallLayers();
        this.startTimer();

        
        
        const mapScreen = document.querySelector('.world');
        console.log(mapScreen);

        // Create an intersection observer
        const observer = new IntersectionObserver((entries, observer) => {
            console.log("observer");
            entries.forEach(entry => {
                console.log("entry");
                    if (entry.isIntersecting) {
                        entry.target.classList.add('intersecting');
                        console.log("intersecting");
                    } else {
                        if(entry.target.classList.contains('intersecting')){
                            entry.target.style.bottom = "2000px";
                            entry.target.classList.remove('intersecting');
                        }
                    }
            });
            }, {
            // Options for the observer: we want to detect any intersection
                root: mapScreen, // Use the viewport as the root
                rootMargin: '0px',
                threshold: 0 // 10% of the target element needs to be visible
            });                
        observer.observe(this.$el);


        const wallGroups = document.querySelectorAll('.wall-group');
        wallGroups.forEach(wallGroup => {
            observer.observe(wallGroup);
        });


    }
    

}
</script>