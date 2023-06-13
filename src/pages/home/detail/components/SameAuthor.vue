<template>
  <div class="bg-white px-3  mb-3 brr-10">
    <div class="px-2 py-3">
      <span class="fs-5 fw-bold text-back">Sách cùng tác giả </span>
    </div>
  <div class="d-flex overflow-x-scroll justify-content-center">
    <div
      class="col-6 col-sm-2 mx-1 py-2"
      v-for="product of products"
      :key="product._id"
    >
      <!-- Your carousel item content -->
      <the-product :product="product"  class="shadow-full"/>
    </div>
  </div>
</div>
</template>

<script>
import { defineComponent } from "vue";
import { RightOutlined } from "@ant-design/icons-vue";
import TheProduct from "../../index/components/Product.vue";
export default defineComponent({
  components: {
    TheProduct,
    RightOutlined,
  },
  props: {
    products:Array
  },
 
});
</script>
<style>
</style>
