<template>
  <div class="mt-3 ">
    <div class="list-products col-12">
      <div class="list-products-body">
        <div
          class="w-100 list-products-heading d-flex mb-2 justify-content-center p-2"
        >
          <div class="title fs-4 fw-bold">Có thể bạn sẽ muốn</div>
        </div>
        <div class="list-products-content">
          <div class="owl-carousel">
            <div v-for="product in products" :key="product._id">
              <!-- Your carousel item content -->
              <the-product :product="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { RightOutlined } from "@ant-design/icons-vue";
import TheProduct from "./Product.vue";
import { BASE_URL } from "../../../../configs";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
export default defineComponent({
  components: {
    TheProduct,
    RightOutlined,
  },

  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.getRecommentProduct();
  },
  created() {},
  methods: {
    async getRecommentProduct() {
      try {
        const res = await axios.get(`${BASE_URL}/home/index/recommend-product`);
        if (res.status == 200) {
          this.products = res.data.products;
          this.$nextTick(() => {
            $(".owl-carousel").owlCarousel({
              loop: true,
              autoplay: true,
              autoplayTimeout: 10000,
              margin: 10,
              responsive: {
                0: {
                  items: 2,
                },
                600: {
                  items: 4,
                },
                1000: {
                  items: 6,
                },
              },
            });
          });
        }
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

.list-products .owl-carousel .owl-stage-outer {
  overflow-x: clip;
  overflow-y: inherit;
}
.list-products .owl-dots{
  display: none;
}
.list-products .owl-carousel .owl-wrapper,
.owl-carousel .owl-item {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  -webkit-transform: none !important;
  -moz-transform: none !important;
  -ms-transform: none !important;
}
</style>
