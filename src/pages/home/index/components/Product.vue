<template>
  <div class="product">
    <div class="product-body">
      <div class="product-image">
        <img :src="product ? product.photos[0] : null" alt="" />
      </div>
      <div class="product-content">
        <div class="product-name">{{ product ? product.name : null }}</div>
        <div class="d-flex">
          <div class="product-rating text-secondary">
            {{ product ? product.rate : 0 }}
            <star-filled style="color: #fdd836" /> | Đã bán
            {{ product ? product.purchases : null }}
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="product-price">
            {{ fomated(product ? product.price : 0) }}
          </div>
          &nbsp;
          <div class="product-sale">
            - {{ product ? (product.sale * 100).toFixed(0) : null }}%
          </div>
        </div>
      </div>
    </div>
    <div class="product-preview shadow-full">
      <div class="preview-title">{{ product ? product.name : null }}</div>
      <div class="preview-author">
        Tác giả: {{ product ? product.author : null }}
      </div>
      <div
        class="preview-desc"
        v-html="product ? product.desciption : null"
      ></div>
      <div class="d-flex justify-content-start align-items-center">
        <div class="preview-price">
          {{
            product
              ? fomated(product.price - product.price * product.sale)
              : null
          }}
        </div>
        <div class="preview-price-sale text-secondary fst-italic ms-3">
          {{ fomated(product ? product.price : 0) }}
        </div>
      </div>
      <div class="preview-sale">
        Giảm giá &nbsp;
        <span>{{ product ? (product.sale * 100).toFixed(0) : null }}%</span>
      </div>
      <a-button danger class="preview-button w-100 my-2">
        <shopping-outlined />
        Thêm vào giỏ hàng
      </a-button>
      <a-button type="primary" ghost class="preview-button w-100 my-2">
        <heart-outlined />
        Thêm vào yêu thích
      </a-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { formattedPrice } from "../../../../utils/formatPrice";

import {
  StarFilled,
  HeartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: { StarFilled, HeartOutlined, ShoppingOutlined },

  props: {
    product: Object,
  },
  methods: {
    fomated(price) {
      if (price) return formattedPrice(price);
    },
  },
});
</script>

<style>
.product {
  display: flex;
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
  height: 41px;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
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
.product .product-preview::after {
  content: "";
  width: 30px;
  height: 30px;
  position: absolute;
  top: 25%;
  left: -29px;
  border-right: 15px solid #fff;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}
.product .product-preview {
  display: none;
  position: absolute;
  height: auto;
  width: 200px;
  border-radius: 10px;
  background-color: #fff;
  left: 70%;
  top: -10px;
  z-index: 999;
  padding: 15px;
  text-align: start;
}
.product:hover .product-preview {
  display: block;
}

.product .product-preview .preview-title {
  font-size: 13px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product .product-preview .preview-author {
  font-size: 11px;
  font-weight: 400;
  color: green;
}
.product .product-preview .preview-desc {
  font-size: 12px;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product .product-preview .preview-price {
  color: #ff424e;
  font-size: 16px;
  font-weight: 600;
}
.product .product-preview .preview-price-sale {
  font-size: 12px;
  font-weight: 400;
  text-decoration: line-through;
}

.product .product-preview .preview-sale {
  font-weight: 600;
  font-size: 12px;
}
.product .product-preview .preview-sale span {
  font-size: 14px;
  color: #ff424e;
}
</style>
