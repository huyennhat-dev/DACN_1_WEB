<template>
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

</style>