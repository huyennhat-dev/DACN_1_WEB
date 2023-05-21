<template>
  <div class="main container" style="">
    <div class="row">
      <div class="col-12 py-4">
        <div class="book-detail p-3 brr-10">
          <div class="book-detail-main row">
            <div class="col-12 col-sm-4 detail-main-left">
              <div class="px-5 py-3">
                <div class="img-wrapper w-100 shadow-full brr-5">
                  <img
                    id="img-original"
                    class="w-100 brr-5"
                    :src="defaultPhoto"
                  />
                  <div id="img-zoom" class="img-zoom-rs"></div>
                </div>
              </div>
              <div class="px-5" v-if="product.photos.length > 1">
                <Carousel v-bind="settings" :breakpoints="breakpoints">
                  <Slide
                    v-for="photo in product.photos"
                    :key="photo"
                    class="px-1 review-image_item brr-2"
                    @click="setDefaultPhoto(photo)"
                    :class="{ active: photo == defaultPhoto }"
                  >
                    <div>
                      <img :src="photo" class="brr-2 w-100" />
                    </div>
                  </Slide>
                </Carousel>
              </div>
            </div>
            <div class="col-12 col-sm-5 detail-main-center">
              <div class="row">
                <div class="product-name col-12">
                  <span>{{ product.name }}</span>
                </div>
                <div class="rating col-12">
                  <a-rate :value="2" disabled />
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-3 detail-main-right"></div>
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
import AnimatedPlaceholder from "../../../components/skeleton_loader/AnimatedPlaceholder.vue";

import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { BASE_URL } from "../../../configs";
export default defineComponent({
  components: {
    Carousel,
    Slide,
    Navigation,
    AnimatedPlaceholder,
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
      },

      breakpoints: {
        1000: {
          itemsToShow: 4,
          snapAlign: "start",
        },
      },
      defaultPhoto: "",

      product: {
        name: "",
        photos: [],
        author: "",
        price: "",
        sale: "",
        quantity: "",
        purchases: "",
        star: "",
        desciption: "",
      },
      categories: [],
    };
  },

  watch: {
    defaultPhoto(nVal, oVal) {
      if (nVal) imgZoom("img-original", "img-zoom", nVal);
    },
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
        if (res.status == 200) {
          this.product.photos = res.data.product.photos;
          this.product.name = res.data.product.name;
          this.product.author = res.data.product.author;
          this.product.price = res.data.product.price;
          this.product.star = res.data.product.star;
          this.product.sale = res.data.product.sale;
          this.product.quantity = res.data.product.photos;
          this.product.purchases = res.data.product.purchases;
          this.product.desciption = res.data.product.desciption;

          this.defaultPhoto = res.data.product.photos[0];
          this.activeIndex = res.data.product.photos[0];
        }
      } catch (error) {
        console.log(error);
      }
    },
    setDefaultPhoto(url) {
      if (!url) return;
      this.defaultPhoto = url;
    },
  },
});
</script>

<style>
.book-detail {
  background-color: #fff;
}
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
.detail-main-left .review-image_item {
  box-sizing: content-box;
}
.detail-main-left .review-image_item.active {
  border: 1px solid var(--primary-color);
}
</style>
