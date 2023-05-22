<template>
  <div class="row brr-5 pt-4 pb-2 w-100 m-0">
    <div class="book-desc brr-10">
      <div class="col-12 text-center my-3">
        <span class="text-black fs-5">Sách cùng tác giả</span>
      </div>
      <div class="same-author">
        <div class="carousel-container my-3" ref="carouselContainer">
          <div class="carousel-slides" ref="slides">
            <div class="slide" v-for="(item, index) in items" :key="index">
              <div class="slide-content m-1">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { formattedPrice } from "../../../../utils/formatPrice";
import { UngroupOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    UngroupOutlined,
  },
  data() {
    return {
      items: ["Mục 1", "Mục 2", "Mục 3", "Mục 4", "Mục 5"],
      currentSlideIndex: 0,
    };
  },
  mounted() {
    setInterval(() => {
      this.scrollNext();
    }, 2000);
  },
  methods: {
    fomated(price) {
      if (price) return formattedPrice(price);
    },
    scrollNext() {
      this.currentSlideIndex++;
      if (this.currentSlideIndex >= this.items.length) {
        this.currentSlideIndex = 0;
      }

      const slide =
        this.$refs.slides.getElementsByClassName("slide")[
          this.currentSlideIndex
        ];
      const container = this.$refs.carouselContainer;
      slide.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
        container,
      });
    },
  },
});
</script>

<style>
.same-author .carousel-container {
  overflow-y: scroll;
  max-height: 550px;
}
.same-author .carousel-container::-webkit-scrollbar {
  width: 0;
}
.same-author .carousel-slides {
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out;
}

.same-author .slide {
  height: 100%;
}

.same-author .slide-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: #eee;
}
</style>
