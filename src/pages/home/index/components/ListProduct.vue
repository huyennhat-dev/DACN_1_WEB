<template>
  <div class="">
    <div class="list-products new-book col-12">
      <div class="list-products-body">
        <div
          class="w-100 list-products-heading d-flex mb-2 justify-content-center p-2"
        >
          <div class="title fs-4 fw-bold">{{ title }}</div>
        </div>
        <div class="list-products-content">
          <div class="row">
            <div
              class="col-6 col-sm-2 mb-3 px-2 item"
              v-for="(product, index) of products"
              :key="index"
            >
              <the-product :product="product" class="shadow-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheProduct from "./Product.vue";
import { BASE_URL } from "../../../../configs";
import { RightOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    TheProduct,
    RightOutlined,
  },
  props: {
    title: String,
    products: Array,
  },
};
</script>

<style>
@media (max-width: 576px) {
  .new-book .list-products-content .item:nth-child(n + 11) {
    display: none;
  }
}
</style>
