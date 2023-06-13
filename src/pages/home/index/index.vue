<template>
  <div class="main container" style="">
    <div class="row">
      <div class="main-right col-12 py-3">
        <div class="row">
          <div class="col-3 d-none d-sm-block">
            <the-side-bar />
          </div>
          <div class="col-12 col-sm-9">
            <the-carousel />
          </div>
        </div>
        <div class="row">
          <the-carousel-product />
        </div>

        <div class="row">
          <the-list-product :title="'Sách mới nhất'" :products="newProducts" />
        </div>
        <div class="row">
          <the-list-product :title="'Sách bán chạy'" :products="saleProducts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TheCarousel from "./components/Carousel.vue";
import TheSideBar from "./components/SideBar.vue";
import TheCarouselProduct from "./components/CarouselProduct.vue";
import TheListProduct from "./components/ListProduct.vue";
import { BASE_URL } from "../../../configs";
export default defineComponent({
  components: {
    TheCarousel,
    TheSideBar,
    TheCarouselProduct,
    TheListProduct,
  },
  data() {
    return {
      newProducts: null,
      saleProducts: null,
    };
  },
  created() {
    this.getNewProducts();
    this.getSaleProducts();
  },
  methods: {
    async getNewProducts() {
      try {
        const rs = await axios.get(`${BASE_URL}/home/index/new-products`);
        this.newProducts = rs.data.products;
      } catch (error) {
        console.log(error);
      }
    },
    async getSaleProducts() {
      try {
        const rs = await axios.get(`${BASE_URL}/home/index/sale-products`);
        this.saleProducts = rs.data.products;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style></style>
