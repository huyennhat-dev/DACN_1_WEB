<template>
  <div class="book-desc px-3 px-sm-4 brr-10">
    <div class="px-2 py-3">
      <span class="fs-5 fw-bold text-back"> Giới thiệu về cuốn sách </span>
    </div>
    <div class="book-desc-content pb-4 px-2">
      <div v-html="description"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, watch, ref } from "vue";

export default defineComponent({
  props: {
    description: String,
  },
});
</script>

<style></style>
