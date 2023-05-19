<template>
  <div class="row mt-3">
    <div class="list-products col-12">
      <div class="list-products-body">
        <div
          class="w-100 list-products-heading d-flex mb-2 justify-content-between"
        >
          <div class="title">Có thể bạn sẽ muốn</div>
          <div class="btn-more">Xem thêm <right-outlined /></div>
        </div>
        <div class="list-products-content">
          <div class="owl-carousel">
            <the-product />
            <the-product />
            <the-product />
            <the-product />
            <the-product />
            <the-product />
            <the-product />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
import {
  RightOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons-vue";
import TheProduct from "./Product.vue";
export default defineComponent({
  components: {
    TheProduct,
    RightOutlined,
    LeftCircleOutlined,
    RightCircleOutlined,
  },
  data() {
    return {};
  },
  mounted() {
    // Initialize Owl Carousel
    this.$nextTick(() => {
      $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        dots: false,
        responsive: {
          0: {
            items: 3,
          },

          1000: {
            items: 4,
          },
        },
      });
    });
  },
});
</script>
<style>
.list-products {
  padding: 10px;
}
.list-products-body {
  height: 100%;
  border-radius: 14px;
  padding: 15px;
  background: linear-gradient(
      rgba(255, 255, 255, 0) 22.49%,
      rgb(255, 255, 255) 73.49%
    ),
    linear-gradient(
      264.03deg,
      rgb(220, 229, 251) -10.27%,
      rgb(234, 236, 255) 35.65%,
      rgb(213, 236, 253) 110.66%
    );
}
.list-products-heading .title {
  font-size: 16px;
  font-weight: 600;
}
.list-products-heading .btn-more {
  font-size: 14px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  transition: all 0.2s;
}
.list-products-heading .btn-more:hover {
  color: var(--primary-color);
  transition: all 0.2s;
}

.list-products .owl-carousel .owl-wrapper,
.list-products .owl-carousel .owl-item {
  -webkit-transform: none !important;
}

</style>
