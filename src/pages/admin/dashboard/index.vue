<template>
  <div class="ok"></div>
</template>

<script>
import { defineComponent } from "vue";
import { useMenuStore } from "../../../store/menu.js";

export default defineComponent({
  setup() {
    useMenuStore().onSelectedKeys(["admin-dashboard"]);
  },
});
</script>

<style>
.ok{
  height: 1000px;
background-color: aqua;
}
</style>