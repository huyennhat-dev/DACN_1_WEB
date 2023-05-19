<template>
  <div class="img-wrapper" style="height: 1000px">
    <img
      id="img-original"
      src="https://res.cloudinary.com/huyennhat/image/upload/v1684011443/images/products/lmvzpwyereqxulugapqs.png"
      alt=""
    />
    <div id="img-zoom" class="img-zoom-rs"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { imgZoom } from "../../../utils/zoom";

export default defineComponent({
  setup() {},
  mounted() {
    imgZoom("img-original", "img-zoom");
  },
  created() {

  },
  methods: {
 
  },
});
</script>

<style>
.img-wrapper {
  position: relative;
}

.img-wrapper:hover .img-zoom-lens {
  border: 1px solid red;
  background-color: rgba(255, 255, 255, 0.25);
}

.img-zoom-lens {
  position: absolute;
  width: 100px;
  height: 100px;
}

.img-wrapper:hover .img-zoom-rs {
  opacity: 1;
  left: 50%;
}

.img-zoom-rs {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  position: absolute;
  pointer-events: none;
  overflow: hidden;
  opacity: 0;
  z-index: 1;
}
</style>
