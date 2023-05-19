<template>
  <div class="product ">
    <div class="product-image">
      <img
        src="https://salt.tikicdn.com/cache/280x280/ts/product/22/cb/a9/524a27dcd45e8a13ae6eecb3dfacba7c.jpg.webp"
        alt=""
      />
    </div>
    <div class="product-content">
      <div class="product-name">Hành tinh của một kẻ nghĩ nhiều</div>
      <div class="d-flex">
        <div class="product-rating text-secondary">
          4.5 <star-filled style="color: #fdd836" /> | Đã bán 100
        </div>
      </div>
      <div class="d-flex">
        <div class="product-price">72.000 đ</div>
        <div class="product-sale">- 20%</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { StarFilled } from "@ant-design/icons-vue";
export default defineComponent({
  components: { StarFilled },
});
</script>

<style>
.product {
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;

}
.product:hover{
  box-shadow: 0px 0px 10px 1px rgba(101, 101, 101, 0.25) !important;

}
.product .product-image{
    padding: 5px;
}
.product .product-image img {
  width: 100%;
}
.product .product-content {
  padding: 10px;
}
.product .product-name {
  font-size: 13px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product .product-rating {
  font-size: 12px;
  font-weight: 600;
}
</style>
