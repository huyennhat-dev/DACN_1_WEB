<template>
  <a-carousel :autoplay="true" arrows class="">
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <left-circle-outlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <right-circle-outlined />
      </div>
    </template>
    <img
      src="https://salt.tikicdn.com/cache/w1080/ts/tikimsp/b4/37/8b/d9de63387e72745e749f4d37c054841c.png.webp"
      alt=""
    />
    <img
      src="https://salt.tikicdn.com/cache/w1080/ts/tikimsp/03/f3/67/c2a9e084ae0e23379539b60f2f5d2ca3.png.webp"
      alt=""
    />
  </a-carousel>
</template>
<script>
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    LeftCircleOutlined,
    RightCircleOutlined,
  },
});
</script>
<style scoped>
.ant-carousel {
  border-radius: 14px;
}
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  overflow: hidden;
  border-radius: 14px;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50px;
  opacity: 0.6;
  z-index: 1;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.9;
  transition: all 0.3s;
  cursor: pointer;
}

.ant-carousel :deep(.slick-slider .slick-track),
.ant-carousel :deep(.slick-slider .slick-list) {
  border-radius: 14px;
}

.ant-carousel :deep(.slick-dots-bottom) {
  bottom: 0;
}
.ant-carousel :deep(.slick-dots-bottom li button) {
  border-radius: 2px;
}
</style>
