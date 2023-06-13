<template>
  <div class="book-detail py-sm-4 py-3 px-1 px-sm-3 brr-10">
    <div class="book-detail-main row">
      <div class="col-12 col-sm-4 detail-main-left">
        <div class="px-2">
          <div class="img-wrapper w-100 shadow-full brr-5">
            <img
              id="img-original"
              class="w-100 brr-5 h-100 square"
              :src="activePhoto ? activePhoto : defaultPhoto"
              :alt="name"
            />
            <div id="img-zoom" class="img-zoom-rs shadow-full brr-2"></div>
          </div>
        </div>
        <div class="px-2 mt-3">
          <div class="owl-carousel">
            <div
              v-for="(photo, index) of photos"
              :key="index"
              class="p-1 review-image_item brr-2 "
              style="padding: 1px;"
              @click="setActivePhoto(photo)"
              :class="{
                active: photo == (activePhoto ? activePhoto : defaultPhoto),
              }"
            >
              <img :src="photo" class="brr-2 square" :alt="name" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-12 col-sm-8 detail-main-right px-3 border-none border-sm-left border-secondary"
      >
        <div class="row px-1">
          <div class="product-name col-12 mb-2">
            <span class="fs-3"> {{ name }}</span>
          </div>
          <div class="rating col-12 mb-3 d-flex align-items-center">
            <a-rate :value="star" disabled class="fs-6 me-2" />
            <span class="fs-small text-secondary fst-italic me-2">
              ( 60 đánh giá)
            </span>
            <span class="fs-small text-secondary">
              | &nbsp; Đã bán {{ purchases }}
            </span>
          </div>
        </div>
        <div class="row px-1">
          <div class="col-12 px-4">
            <div class="product-author col-12 text-black">
              <span class="fs-small text-black">Tác giả : </span>
              <span class="text-primary ms-2"> {{ author }}</span>
            </div>
            <div
              class="product-price my-2 col-12 d-flex text-primary align-items-center"
            >
              <span class="fs-2 fw-semibold me-3">
                {{ fomated(price - price * sale) }}
              </span>
            </div>
            <div class="col-12">
              <span class="text-black fs-small">Tiết kiệm : </span>
              <span class="fs-6 ms-2 me-2 text-primary fw-semibold">
                {{ fomated(price * sale) }}
              </span>
              <span class="fs-6 text-primary fw-semibold">
                (giảm {{ (sale * 100).toFixed(0) }}%)
              </span>
            </div>
            <div class="col-12">
              <span class="text-black fs-small">Giá niêm yết : </span>
              <span
                class="fs-6 ms-2 text-decoration-line-through text-black-50 fw-medium"
              >
                {{ fomated(price) }}
              </span>
            </div>
            <div class="col-12">
              <span class="text-black fs-small me-3">Tình trạng : </span>
              <span
                v-if="quantity <= 0"
                class="text-primary fw-lighter opacity-75"
              >
                Hết hàng
              </span>
              <span
                v-else-if="quantity <= 10"
                class="text-primary fw-medium opacity-100"
              >
                Sắp hết
              </span>
              <span v-else class="text-primary fw-normal opacity-100">
                Còn hàng
              </span>
            </div>
            <div class="col-12">
              <span class="text-black fs-small me-3"> Tags : </span>
              <router-link to="/">
                {{ tag }}
              </router-link>
            </div>
            <div class="col-12 my-3 d-flex align-items-center">
              <span class="text-black me-3"> Số lượng : </span>
              <a-button
                class="rounded-circle text-black"
                @click="amount > 1 ? amount-- : null"
              >
                <template #icon><minus-outlined /></template>
              </a-button>
              <a-input
                v-model:value="amount"
                style="width: 60px; cursor: default"
                class="text-center mx-2 text-primary bg-white"
                type="number"
                disabled
                min="1"
                :max="quantity"
              />
              <a-button
                class="rounded-circle text-black"
                @click="amount < quantity ? amount++ : null"
              >
                <template #icon> <plus-outlined /></template>
              </a-button>
            </div>
            <div
              class="col-12 d-block d-sm-flex text-center align-items-center mt-2 mb-4"
            >
              <a-button
                size="large"
                class="brr-5 me-sm-3 mb-3 mb-sm-0 ps-3 pe-4"
                danger
                @click="addToCart"
              >
                <template #icon>
                  <shopping-cart-outlined />
                </template>
                Thêm vào giỏ hàng
              </a-button>

              <!-- <a-button
                size="large"
                type="primary"
                class="brr-5 ms-2 ps-3 pe-4"
                danger
              >
                <template #icon>
                  <shopping-outlined />
                </template>
                Mua ngay
              </a-button> -->
            </div>
            <div class="col-12">
              <span class="text-black me-2">Gọi đặt hàng: </span>
              <a href="tel:02838207153" class="fw-bold text-primary me-2">
                (028) 3820 7153
              </a>
              <span class="text-black me-2">hoặc</span>
              <a href="tel:0933109009" class="fw-bold text-primary">
                0933 109 009
              </a>
            </div>
            <div class="col-12 py-2">
              <span class="fw-bolder fs-6 text-black">
                Thông tin khuyến mãi
              </span>
            </div>
            <div class="col-12">
              <gift-outlined class="text-primary" />
              <span class="text-black mx-2">Đổi trả trong 7 ngày</span>
            </div>
            <div class="col-12">
              <gift-outlined class="text-primary" />
              <span class="text-black mx-2">
                Free ship nội thành Đà Nẵng từ 150.000đ
              </span>
            </div>
            <div class="col-12">
              <gift-outlined class="text-primary" />
              <span class="text-black mx-2">
                Free ship toàn quốc từ 350.000đ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { imgZoom } from "../../../../utils/zoom";
import { formattedPrice } from "../../../../utils/formatPrice";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
import {
  PlusOutlined,
  MinusOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  GiftOutlined,
} from "@ant-design/icons-vue";
import AnimatedPlaceholder from "../../../../components/skeleton_loader/AnimatedPlaceholder.vue";
import { notification } from "ant-design-vue";
import { useCartStore } from "../../../../store/cart";

export default defineComponent({
  components: {
    AnimatedPlaceholder,
    PlusOutlined,
    ShoppingOutlined,
    MinusOutlined,
    ShoppingCartOutlined,
    GiftOutlined,
  },
  data() {
    return {
      activePhoto: this.defaultPhoto,
      amount: 1,
      settings: {
        itemsToShow: 5,
        snapAlign: "start",
      },
    };
  },
  watch: {
    defaultPhoto(nVal, oVal) {
      imgZoom("img-original", "img-zoom", nVal);
      this.setupCarousel();
    },
    activePhoto(nVal, oVal) {
      imgZoom("img-original", "img-zoom", nVal);
    },
  },
  props: {
    defaultPhoto: String,
    _id: String,
    name: String,
    author: String,
    photos: Array,
    price: Number,
    sale: Number,
    quantity: Number,
    purchases: Number,
    star: Number,
    tag: String,
    tagSlug: String,
  },
  mounted() {},
  methods: {
    setupCarousel() {
      this.$nextTick(() => {
        $(".owl-carousel").owlCarousel({
          margin: 10,
          responsive: {
            0: {
              items: 4,
            },
            600: {
              items: 5,
            },
            1000: {
              items: 6,
            },
          },
        });
      });
    },
    async addToCart() {
      try {
        const product = {
          _id: this._id,
          name: this.name,
          photos: this.photos,
          author: this.author,
          price: this.price,
          sale: this.sale,
          star: this.star,
          quantity: this.quantity,
          purchases: this.purchases,
        };
        const res = await useCartStore().addToCart(product, this.amount);
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
    fomated(price) {
      if (price) return formattedPrice(price);
    },
    setActivePhoto(url) {
      if (url) this.activePhoto = url;
    },
  },
});
</script>

<style>
.detail-main-left .img-wrapper {
  position: relative;
}

.detail-main-left .img-wrapper:hover .img-zoom-lens {
  border: 1px solid var(--primary-color);
  background-color: rgba(255, 255, 255, 0.25);
}

.detail-main-left .img-zoom-lens {
  position: absolute;
  width: 100px;
  height: 100px;
}

.detail-main-left .img-wrapper:hover .img-zoom-rs {
  opacity: 1;
  top: 100px;
  bottom: 0;
  scale: 3;
  transform: translateX(130%);
  transition: transform 0.3s, scale 0.3s, opacity 0.3s, top 0.3s, bottom 0.3s;
}

.detail-main-left .img-zoom-rs {
  position: absolute;
  top: 30%;
  left: 30%;
  opacity: 0;
  z-index: 9999;
  object-fit: contain;
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: absolute;
  pointer-events: none;
  transition: transform 0.5s, scale 0.5s, opacity 0.5s, top 0.5s, bottom 0.5s;
}
@media (max-width: 576px) {
  .detail-main-left .img-zoom-lens,
  .detail-main-left .img-zoom-rs {
    display: none;
  }
}
.detail-main-left .review-image_item {
  box-sizing: content-box;
}
.detail-main-left .review-image_item.active {
  border: 1px solid var(--primary-color);
}
</style>
