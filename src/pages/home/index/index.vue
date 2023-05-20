<template>
  <div class="main container" style="">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="d-none d-sm-block col-sm-3">
            <the-side-bar />
          </div>
          <div class="col-12 col-sm-9">
            <div class="row">
              <div class="main-right col-12 py-3">
                <the-carousel />
                <the-list-product />
                <the-list-new-product />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TheCarousel from "./components/Carousel.vue";
import TheSideBar from "./components/SideBar.vue";
import TheListProduct from "./components/ListProduct.vue";
import TheListNewProduct from "./components/ListNewProduct.vue";
export default defineComponent({
  components: {
    TheCarousel,
    TheSideBar,
    TheListProduct,
    TheListNewProduct
  },
});
</script>

<style>
.main {
  position: relative;
  top: 70px;
}
.main .main-right {
  height: calc(100vh - var(--header-height));
  overflow-y: scroll;
}

.main .main-right::-webkit-scrollbar {
  width: 0;
}
</style>
