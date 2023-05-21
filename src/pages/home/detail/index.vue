<template>
  <div class="main container" style="">
    <div class="row">
      <div class="col-12 py-3">
        <div class="book-detail">
          <div class="book-detail-main row">
            <div class="col-4 detail-main-left">
              <div class="px-5">
                <div class="img-wrapper w-100">
                  <img
                    id="img-original"
                    class="w-100"
                    src="../../../assets/images/x.jpg"
                  />
                  <div id="img-zoom" class="img-zoom-rs"></div>
                </div>
              </div>
              <div class="px-5">
                <Carousel v-bind="settings" :breakpoints="breakpoints">
                  <Slide class="px-2">
                    <div class="carousel__item">1</div>
                  </Slide>
                </Carousel>
              </div>
            </div>
            <div class="col-5 detail-main-center"></div>
            <div class="col-3 detail-main-right"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { imgZoom } from "../../../utils/zoom";
import { useRoute, useRouter } from "vue-router";

import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { BASE_URL } from "../../../configs";
export default defineComponent({
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    return {
      route,
      router,
    };
  },
  data() {
    return {
      settings: {
        itemsToShow: 1,
        snapAlign: "start",
        wrapAround: true,
      },

      breakpoints: {
        390: {
          itemsToShow: 4,
          snapAlign: "start",
        },
      },
    };
  },
  mounted() {
    imgZoom("img-original", "img-zoom");
  },
  created() {
    this.getDetailData();
  },
  methods: {
    async getDetailData() {
      try {
        const res = await axios.get(
          `${BASE_URL}/home/product/${this.route.params.id}`
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style>
.detail-main-left .img-wrapper {
  position: relative;
}

.detail-main-left .img-wrapper:hover .img-zoom-lens {
  border: 1px solid var(--primary-color);
  background-color: rgba(255, 255, 255, 0.25);
}

.detail-main-left .img-zoom-lens {
  position: absolute;
  width: 100px;
  height: 100px;
}

.detail-main-left .img-wrapper:hover .img-zoom-rs {
  opacity: 1;
  top: 100px;
  bottom: 0;
  scale: 3;
  transform: translateX(130%);
  transition: transform 0.3s, scale 0.3s, opacity 0.3s, top 0.3s, bottom 0.3s;
}

.detail-main-left .img-zoom-rs {
  position: absolute;
  top: 30%;
  left: 30%;
  opacity: 0;
  z-index: 9999;
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: absolute;
  pointer-events: none;
  transition: transform 0.5s, scale 0.5s, opacity 0.5s, top 0.5s, bottom 0.5s;
}
</style>
