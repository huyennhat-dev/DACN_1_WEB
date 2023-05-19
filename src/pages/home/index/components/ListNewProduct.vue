<template>
  <div class="new-products mt-3">
    <div
      class="w-100 list-products-heading d-flex mb-2 justify-content-between"
    >
      <div class="title">Có thể bạn sẽ muốn</div>
      <div class="btn-more">Xem thêm <right-outlined /></div>
    </div>
    <div class="row">
      <div class="col-6 col-sm-3 position-relative">
        <the-product />
      </div>
      <div class="col-6 col-sm-3 position-relative">
        <the-product />
      </div>
      <div class="col-6 col-sm-3 position-relative">
        <the-product />
      </div>
      <div class="col-6 col-sm-3 position-relative">
        <the-product />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TheProduct from "./Product.vue";
import { RightOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { TheProduct, RightOutlined },
});
</script>

<style></style>
