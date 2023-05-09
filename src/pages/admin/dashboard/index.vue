<template>
  <div class="ok"></div>
</template>

<script>
import { defineComponent } from "vue";
import { useMenu } from "../../../store/use-menu.js";

export default defineComponent({
  setup() {
    useMenu().onSelectedKeys(["admin-dashboard"]);
  },
});
</script>

<style>
.ok{
  height: 1000px;
background-color: aqua;
}
</style>