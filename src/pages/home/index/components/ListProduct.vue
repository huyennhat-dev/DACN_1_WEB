<template>
  <div class="row mt-3">
    <div class="list-products col-12">
      <div class="list-products-body p-1 p-sm-3">
        <div
          class="w-100 list-products-heading d-flex mb-2 justify-content-between p-2"
        >
          <div class="title">Có thể bạn sẽ muốn</div>
          <div class="btn-more">Xem thêm <right-outlined /></div>
        </div>
        <div class="list-products-content">
          <Carousel
            v-if="products.length > 0"
            v-bind="settings"
            :breakpoints="breakpoints"
          >
            <Slide v-for="product in products" :key="product._id" class="px-2">
              <div class="carousel__item">
                <the-product :product="product" />
              </div>
            </Slide>
          </Carousel>
          <animated-placeholder
            v-else
            height="280px"
            width="100%"
            borderRadius="10px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { RightOutlined } from "@ant-design/icons-vue";
import TheProduct from "./Product.vue";
import { BASE_URL } from "../../../../configs";
import AnimatedPlaceholder from "../../../../components/skeleton_loader/AnimatedPlaceholder.vue";

export default defineComponent({
  components: {
    TheProduct,
    RightOutlined,
    Carousel,
    Slide,
    Navigation,
    AnimatedPlaceholder,
  },

  data() {
    return {
      products: [],
      settings: {
        itemsToShow: 1,
        snapAlign: "start",
        // autoplay: 5000,
        wrapAround: true,
      },

      breakpoints: {
        390: {
          itemsToShow: 2,
          snapAlign: "start",
        },
        700: {
          itemsToShow: 3,
          snapAlign: "start",
        },
        1024: {
          itemsToShow: 5,
          snapAlign: "start",
        },
      },
    };
  },

  created() {
    this.getRecommentProduct();
  },
  methods: {
    async getRecommentProduct() {
      try {
        const res = await axios.get(`${BASE_URL}/home/index/recommend-product`);
        if (res.status == 200) this.products = res.data.products;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
<style>
.list-products {
  padding: 8px;
}

.list-products .is-fetching {
  height: 220px;
}
.list-products-body {
  height: 100%;
  border-radius: 8px;
  /* background: linear-gradient(
      rgba(255, 255, 255, 0) 22.49%,
      rgb(245, 245, 250) 73.49%
    ),
    linear-gradient(
      264.03deg,
      rgb(220, 229, 251) -10.27%,
      rgb(234, 236, 255) 35.65%,
      rgb(213, 236, 253) 110.66%
    ); */
}
.list-products-heading .title {
  font-size: 16px;
  font-weight: 600;
}
.list-products-heading .btn-more {
  font-size: 12px;
  font-weight: 500;
  color: #000;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}
.list-products-heading .btn-more:hover {
  color: var(--primary-color);
  transition: all 0.2s;
}

.list-products .carousel__next,
.list-products .carousel__prev {
  margin: 0;
}

.list-products .carousel__slide {
  transform: none;
}
.list-products .carousel__viewport {
  overflow-x: clip;
  overflow-y: inherit;
}

@media (max-width: 576px) {
  .list-products-heading {
  }
}
</style>
