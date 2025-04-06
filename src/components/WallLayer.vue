<template>
    <div class="wall-layer mapObject" :style="{ height: height + 'px',  bottom: bottom + 'px'}">
        <wall class="left"/>
        {{ wall.id }} - {{  hasIntersected }} - {{  isIntersecting }} - {{ bottom }}
        <wall class="right"/>
    </div>
</template>

<style>
 .wall-layer{
    position: absolute !important;
    width:100%;
    background-color: rgba(0,0,0,0.1);
    display:flex;
    align-items: bottom;
    justify-content: space-between;
    flex-shrink: 0;
 }
</style>

<script>
import Wall from "@/components/Wall.vue";
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';


export default {
    name: 'WallLayer',
    props: ['wall'],
    emits: ['outside'],
    components: {
        Wall
    },
    data() {
        return {
            height: 10,
            bottom: 0,
            hasIntersected: false,
            isIntersecting: false,
        }
    },
    computed: {
        ...mapGetters(['roundDepth']),
    },
    methods: {
        ...mapActions(['addWall', 'removeWall']),
    },
    mounted(){
        this.height = this.wall.height;
        this.bottom = this.wall.bottom;

        const mapScreen = document.querySelector('.world');
        console.log(mapScreen);

        // Create an intersection observer
        const observer = new IntersectionObserver((entries, observer) => {
            console.log("observer");
            entries.forEach(entry => {
                console.log("entry");
                    if (entry.isIntersecting) {
                        this.hasIntersected = true;
                        console.log("intersecting");
                        this.isIntersecting = true;
                    } else {
                        this.isIntersecting = false;
                        if (this.hasIntersected){
                            console.log("not intersecting");
                            this.removeWall();
                        }
                        // this.$emit('outside');
                        
                    }
            });
            }, {
            // Options for the observer: we want to detect any intersection
                root: mapScreen, // Use the viewport as the root
                rootMargin: '0px',
                threshold: 0 // 10% of the target element needs to be visible
            });                
        observer.observe(this.$el);
    }
}
</script>