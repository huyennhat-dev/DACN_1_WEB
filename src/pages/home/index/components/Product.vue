<template>
  <div class="product">
    <div class="product-body">
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
        <div class="d-flex align-items-center">
          <div class="product-price">72.000 đ</div>
          &nbsp;
          <div class="product-sale">- 20%</div>
        </div>
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
  display: flex;
  height: 285px;

  justify-content: center;
  align-items: center;
}
.product .product-body {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #eee;
  transition: all 0.1s;
}
.product:active .product-body {
  width: 98%;
  height: 98%;
  transition: all 0.1s;
}
.product:hover .product-image {
  scale: 1.05;
  border-radius: 10px;
  transition: all 0.2s;
}
.product .product-image {
  border-radius: 10px;
  padding: 5px;
  transition: all 0.2s;
}
.product .product-image img {
  width: 100%;
}
.product .product-content {
  padding: 10px 10px 15px 10px;
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
.product .product-price {
  color: #ff424e;
  font-size: 18px;
  font-weight: 600;
}
.product .product-sale {
  color: #ff424e;
  font-size: 14px;
  font-weight: 500;
}
</style>
