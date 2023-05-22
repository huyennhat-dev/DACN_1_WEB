<template>
  <div class="main container detail" style="">
    <div class="row">
      <div class="col-12 py-4">
        <div class="book-detail py-sm-5 py-3 px-1 px-sm-3 brr-10">
          <div class="book-detail-main row">
            <div class="col-12 col-sm-4 detail-main-left">
              <div class="px-2 px-sm-5">
                <div class="img-wrapper w-100 shadow-full brr-5">
                  <img
                    id="img-original"
                    class="w-100 brr-5"
                    :src="defaultPhoto"
                    :alt="product.name"
                  />
                  <div id="img-zoom" class="img-zoom-rs shadow-full brr-2"></div>
                </div>
              </div>
              <div class="px-2 px-sm-5 mt-2" v-if="product.photos.length > 1">
                <Carousel v-bind="settings" :breakpoints="breakpoints">
                  <Slide
                    v-for="photo in product.photos"
                    :key="photo"
                    class="px-1 review-image_item brr-2"
                    @click="setDefaultPhoto(photo)"
                    :class="{ active: photo == defaultPhoto }"
                  >
                    <div>
                      <img
                        :src="photo"
                        class="brr-2 w-100"
                        :alt="product.name"
                      />
                    </div>
                  </Slide>
                </Carousel>
              </div>
            </div>
            <div
              class="col-12 col-sm-8 detail-main-right px-3 px-sm-5 border-none border-sm-left border-secondary"
            >
              <div class="row">
                <div class="product-name col-12 mb-2">
                  <span class="fs-3"> {{ product.name }}</span>
                </div>
                <div class="rating col-12 mb-3 d-flex align-items-center">
                  <a-rate :value="product.star" disabled class="fs-6 me-2" />
                  <span class="fs-small text-secondary fst-italic me-2">
                    ( 60 đánh giá)
                  </span>
                  <span class="fs-small text-secondary">
                    | &nbsp; Đã bán {{ product.purchases }}
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-8 px-4">
                  <div class="product-author col-12 text-black">
                    <span class="fs-small text-black">Tác giả : </span>
                    <span class="text-primary ms-2"> {{ product.author }}</span>
                  </div>
                  <div
                    class="product-price my-2 col-12 d-flex text-primary align-items-center"
                  >
                    <span class="fs-2 fw-semibold me-3">
                      {{
                        fomated(product.price - product.price * product.sale)
                      }}
                    </span>
                  </div>
                  <div class="col-12">
                    <span class="text-black fs-small">Tiết kiệm : </span>
                    <span class="fs-6 ms-2 me-2 text-primary fw-semibold">
                      {{ fomated(product.price * product.sale) }}
                    </span>
                    <span class="fs-6 text-primary fw-semibold">
                      (giảm {{ (product.sale * 100).toFixed(0) }}%)
                    </span>
                  </div>
                  <div class="col-12">
                    <span class="text-black fs-small">Giá niêm yết : </span>
                    <span
                      class="fs-6 ms-2 text-decoration-line-through text-black-50 fw-medium"
                    >
                      {{ fomated(product.price) }}
                    </span>
                  </div>
                  <div class="col-12">
                    <span class="text-black fs-small me-3">Tình trạng : </span>
                    <span
                      v-if="product.quantity <= 0"
                      class="text-primary fw-lighter opacity-75"
                    >
                      Hết hàng
                    </span>
                    <span
                      v-else-if="product.quantity <= 10"
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
                      {{ product.tags }}
                    </router-link>
                  </div>
                  <div class="col-12 my-3 d-flex align-items-center">
                    <span class="text-black me-3"> Số lượng : </span>
                    <a-button
                      class="rounded-circle text-black"
                      @click="quantity > 1 ? quantity-- : null"
                    >
                      <template #icon><minus-outlined /></template>
                    </a-button>
                    <a-input
                      v-model:value="quantity"
                      style="width: 60px"
                      class="text-center mx-2 text-primary"
                      type="number"
                      min="1"
                    />
                    <a-button
                      class="rounded-circle text-black"
                      @click="quantity++"
                    >
                      <template #icon> <plus-outlined /></template>
                    </a-button>
                  </div>
                  <div class="col-12 d-block d-sm-flex text-center align-items-center mt-2 mb-4">
                    <a-button size="large" class="brr-5 me-sm-3 mb-3 mb-sm-0 ps-3 pe-4" danger>
                      <template #icon>
                        <shopping-cart-outlined />
                      </template>
                      Thêm vào giỏ hàng
                    </a-button>

                    <a-button
                      size="large"
                      type="primary"
                      class="brr-5 ms-2 ps-3 pe-4"
                      danger
                    >
                      <template #icon>
                        <shopping-outlined />
                      </template>
                      Mua ngay
                    </a-button>
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
                <div class="col-12 col-sm-4 pe-4 boỏder-none border-sm-left border-secondary">
                  <div class="row brr-5">
                    <div class="col-12 text-center my-3">
                      <span class="text-black fs-6">Sách cùng tác giả</span>
                    </div>
                    <Carousel
                      class="same_author_product"
                      v-bind="{
                        itemsToShow: 1,
                        snapAlign: 'end',
                        autoplay: 10000,
                      }"
                    >
                      <Slide v-for="index in 4" :key="index" class="p-2 brr-5">
                        <div
                          class="same-author_product col-12 text-center shadow-full brr-5"
                        >
                          <div class="w-100 brr-5 position-relative">
                            <img
                              class="w-100 brr-5"
                              src="http://res.cloudinary.com/huyennhat/image/upload/v1684695728/images/products/udsvof1frhbwrpjihxrr.png"
                              alt=""
                            />
                            <div
                              class="same_author-price w-100 position-absolute d-flex justify-content-center align-items-center"
                            >
                              <span class="text-white fw-bold fs-6">
                                {{ fomated(120000) }}
                              </span>
                            </div>
                          </div>
                          <div
                            class="same-author-product_name text-black fs-sma my-2 p-2"
                          >
                            Tuổi Trẻ Đáng Giá Bao Nhiêu {{ index }}
                          </div>
                          <a-button
                            type="primary"
                            ghost
                            class="px-3 mt-2 mb-3 brr-5"
                          >
                            <template #icon>
                              <ungroup-outlined />
                            </template>
                            Xem chi tiết
                          </a-button>
                        </div>
                      </Slide>
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
	  <div class="col-12 py-4 my-4 book-desc">
		     <div class="book-desc-content">
							 <div v-html="product.desciption"></div>
				  </div>
    </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { imgZoom } from "../../../utils/zoom";
import { useRoute, useRouter } from "vue-router";
import AnimatedPlaceholder from "../../../components/skeleton_loader/AnimatedPlaceholder.vue";
import { formattedPrice } from "../../../utils/formatPrice";
import {
  PlusOutlined,
  MinusOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  GiftOutlined,
  UngroupOutlined,
} from "@ant-design/icons-vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { BASE_URL } from "../../../configs";
export default defineComponent({
  components: {
    Carousel,
    Slide,
    Navigation,
    AnimatedPlaceholder,
    PlusOutlined,
    ShoppingOutlined,
    MinusOutlined,
    ShoppingCartOutlined,
    GiftOutlined,
    UngroupOutlined,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    return {
      route,
      router,
    };
  },
  data() {
    return {
      settings: {
        itemsToShow: 5,
        snapAlign: "start",
      },

     
      defaultPhoto: "",
      quantity: 1,
      product: {
        name: "",
        photos: [],
        author: "",
        price: "",
        sale: "",
        quantity: "",
        purchases: "",
        star: "",
        desciption: "",
        tags: "",
      },
      categories: [],
    };
  },

  watch: {
    defaultPhoto(nVal, oVal) {
      if (nVal) imgZoom("img-original", "img-zoom", nVal);
    },
  },

  created() {
    this.getDetailData();
  },
  methods: {
    fomated(price) {
      if (price) return formattedPrice(price);
    },
    async getDetailData() {
      try {
        const res = await axios.get(
          `${BASE_URL}/home/product/${this.route.params.id}`
        );

        if (res.status == 200) {
          this.product.photos = res.data.product.photos;
          this.product.name = res.data.product.name;
          this.product.author = res.data.product.author;
          this.product.price = res.data.product.price;
          this.product.star = res.data.product.star;
          this.product.sale = res.data.product.sale;
          this.product.quantity = res.data.product.photos;
          this.product.purchases = res.data.product.purchases;
          this.product.desciption = res.data.product.desciption;
          this.product.tags = res.data.product.categories.name;

          this.defaultPhoto = res.data.product.photos[0];
          this.activeIndex = res.data.product.photos[0];
        }
      } catch (error) {
        console.log(error);
      }
    },
    setDefaultPhoto(url) {
      if (!url) return;
      this.defaultPhoto = url;
    },
  },
});
</script>

<style>
.main.detail {
  height: calc(100vh - var(--header-height));
  overflow-y: scroll;
}

.main.detail::-webkit-scrollbar {
  width: 0;
}
.book-detail {
  background-color: #fff;
}
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
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: absolute;
  pointer-events: none;
  transition: transform 0.5s, scale 0.5s, opacity 0.5s, top 0.5s, bottom 0.5s;
}
@media (max-width:576px){
.detail-main-left .img-zoom-lens,
.detail-main-left .img-zoom-rs{
display:none;
}
}
.detail-main-left .review-image_item {
  box-sizing: content-box;
}
.detail-main-left .review-image_item.active {
  border: 1px solid var(--primary-color);
}

.detail-main-right .same_author_product .carousel__slide {
  margin-left: 13px;
  margin-right: 13px;
}
.detail-main-right .same_author_product .carousel__slide:nth-child(1) {
  margin-left: 0;
}

.detail-main-right .same-author-product_name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 50px;
}
.detail-main-right .same_author-price {
  bottom: -10px;
  height: 50px;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  transition: all 0.3s;
}
.detail-main-right .same-author_product:hover .same_author-price {
  bottom: 0px;
  opacity: 1;
  transition: all .3s;

}
</style>
