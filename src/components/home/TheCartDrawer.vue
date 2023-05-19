<template>
  <a-drawer
    v-model:visible="visible"
    class="custom-class"
    style="color: red"
    title="Basic Drawer"
    placement="right"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    visible: Boolean,
  },
});
</script>