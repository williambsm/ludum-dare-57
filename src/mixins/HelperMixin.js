// import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export const HelperMixin = {
  // data() {
  //     return {};
  // },
  computed: {
    ...mapGetters(['roundPlayer']),
  },
  methods: {

    isColliding(el1, el2) {   
      var el1_rect = el1.getBoundingClientRect();
      var el1_height = el1_rect.height;
      var el1_width = el1_rect.width;
      var el1_distance_from_top = el1_rect.top + el1_height;
      var el1_distance_from_left = el1_rect.left + el1_width;

      var el2_rect = el2.getBoundingClientRect();
      var el2_height = el2_rect.height;
      var el2_width = el2_rect.width;
      var el2_distance_from_top = el2_rect.top + el2_height;
      var el2_distance_from_left = el2_rect.left + el2_width;

      var not_colliding =
        el1_distance_from_top < el2_rect.top ||
        el1_rect.top > el2_distance_from_top ||
        el1_distance_from_left < el2_rect.left ||
        el1_rect.left > el2_distance_from_left;
      
      return !not_colliding;
    },
    isPlayerColliding(el) { 
      return this.isColliding(el, this.roundPlayer);      
    },
  },
};
