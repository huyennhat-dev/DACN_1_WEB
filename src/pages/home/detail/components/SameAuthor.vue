<template>
  <div class="row brr-5 pt-4 pb-2 w-100 m-0">
    <div class="bg-white brr-10">
      <div class="col-12 text-center my-3">
        <span class="text-black fs-5">Sách cùng tác giả</span>
      </div>
      <div
        class="same-author image-gallery w-100"
        :style="{
          height: `${screenHeight - 170}px`,
        }"
      >
        <the-vertical-carousel :itemHeight="390">
          <div class="item" v-for="(item, index) of 10" :key="index">
            <div class="col-12 text-center shadow-full brr-5 bg-white">
              <div class="w-100 brr-5 position-relative">
                <img
                  class="w-100 brr-5"
                  src="http://res.cloudinary.com/huyennhat/image/upload/v1684695728/images/products/udsvof1frhbwrpjihxrr.png"
                  alt=""
                />
                <div class="w-100 position-absolute bottom-0">
                  <span class="text-white fw-bold fs-6">
                    {{ fomated(120000) }}
                  </span>
                </div>
              </div>
              <div class="text-black fs-small my-2 p-2">
                Tuổi Trẻ Đáng Giá Bao Nhiêu {{ item }}
              </div>
              <a-button type="primary" ghost class="px-3 mt-2 mb-3 brr-5">
                <template #icon>
                  <ungroup-outlined />
                </template>
                Xem chi tiết
              </a-button>
            </div>
          </div>
        </the-vertical-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { formattedPrice } from "../../../../utils/formatPrice";
import { UngroupOutlined } from "@ant-design/icons-vue";
import TheVerticalCarousel from "../../../../components/vertical_carousel/vertical_carousel.vue";
export default defineComponent({
  components: {
    UngroupOutlined,
    TheVerticalCarousel,
  },
  data() {
    return {
      screenHeight: 0,
    };
  },
  mounted() {},
  created() {
    this.screenHeight = window.innerHeight;
  },
  methods: {
    fomated(price) {
      if (price) return formattedPrice(price);
    },
  },
});
</script>

<style>

</style>
