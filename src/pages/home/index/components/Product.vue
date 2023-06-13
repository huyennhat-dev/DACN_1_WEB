<template>
  <div v-if="product" class="product position-relative brr-10">
    <router-link
      :to="{ name: 'detail', params: { id: product._id } }"
      style="cursor: pointer"
    >
      <div class="product-body">
        <div class="product-image">
          <img :src="product.photos[0]" alt="" class="square"/>
        </div>
        <div class="product-content">
          <div class="product-name">
            {{ product.name }}
          </div>
          <div class="d-flex">
            <div class="product-rating text-secondary">
              {{ product.star }}
              <star-filled style="color: #fdd836" /> | Đã bán
              {{ product.purchases }}
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="product-price text-primary">
              {{ fomated(product.price - product.price * product.sale) }}
            </div>
            &nbsp;
            <div class="product-sale text-primary">
              - {{ (product.sale * 100).toFixed(0) }}%
            </div>
          </div>
        </div>
      </div>
    </router-link>

    <div class="product-preview shadow-full">
      <router-link :to="{ name: 'detail', params: { id: product._id } }">
        <div class="preview-title">{{ product.name }}</div>
      </router-link>
      <div class="preview-author">Tác giả: {{ product.author }}</div>
      <div class="preview-desc" v-html="product.description"></div>
      <div class="d-flex justify-content-start align-items-center">
        <div class="preview-price text-primary">
          {{ fomated(product.price - product.price * product.sale) }}
        </div>
        <div class="preview-price-sale text-secondary fst-italic ms-3">
          {{ fomated(product.price) }}
        </div>
      </div>
      <div class="preview-sale text-primary">
        Giảm giá &nbsp;
        <span>{{ (product.sale * 100).toFixed(0) }}%</span>
      </div>
      <a-button
        danger
        class="preview-button brr-5 w-100 my-2"
        @click="addToCartStore(product, 1)"
      >
        <shopping-outlined />
        Thêm vào giỏ hàng
      </a-button>
      <!-- <a-button type="primary" ghost class="preview-button brr-5 w-100 my-2">
        <heart-outlined />
        Thêm vào yêu thích
      </a-button> -->
    </div>
  </div>
  <a-skeleton-avatar v-else />
</template>

<script>
import { defineComponent } from "vue";
import { formattedPrice } from "../../../../utils/formatPrice";

import {
  StarFilled,
  HeartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import { useCartStore } from "../../../../store/cart";
export default defineComponent({
  components: {
    StarFilled,
    HeartOutlined,
    ShoppingOutlined,
  },

  props: {
    product: Object,
  },
  methods: {
    fomated(price) {
      if (price) return formattedPrice(price);
    },

    async addToCartStore(product, quantity) {
      try {
        if (!product) return;
        delete product.description;
        const res = await useCartStore().addToCart(product, quantity);
        if (res)
          notification.success({
            description: "Thêm vào giỏ hàng thành công",
            duration: 3,
          });
        else
          notification.warning({
            description: "Bạn cần phải đăng nhập",
            duration: 3,
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style>
.product {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
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
  color: #000;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}
.product .product-rating {
  font-size: 12px;
  font-weight: 600;
}
.product .product-price {
  font-size: 18px;
  font-weight: 600;
}
.product .product-sale {
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
  position: absolute;
  height: auto;
  width: 200px;
  left: 0;
  top: 5%;
  opacity: 0;
  z-index: 999;
  scale: 0.5;
  padding: 15px;
  text-align: start;
  border-radius: 10px;
  pointer-events: none;
  transform: translateX(0);
  background-color: #fff;
  transition: all 0.3s;
}

@media (max-width: 576px) {
  .product .product-preview {
    display: none !important;
  }
}

.product:hover .product-preview {
  scale: 1;
  opacity: 1;
  pointer-events: auto;
  transform: translateX(50%);
  transition: all 0.3s;
}

.product .product-preview .preview-title {
  font-size: 13px;
  font-weight: 600;
  color: #000;
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
.product .product-preview .preview-desc,
.product .product-preview .preview-desc strong,
.product .product-preview .preview-desc ul,
.product .product-preview .preview-desc h1,
.product .product-preview .preview-desc h2,
.product .product-preview .preview-desc h3,
.product .product-preview .preview-desc h4,
.product .product-preview .preview-desc h5,
.product .product-preview .preview-desc h6 {
  font-size: 12px;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 110px;
  padding: 0;
}
.product .product-preview .preview-desc .table,
.product .product-preview .preview-desc a {
  display: none;
}
.product .product-preview .preview-price {
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
}
</style>
