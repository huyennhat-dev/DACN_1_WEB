<template>

</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useMenu } from "../../../store/use-menu.js";
import Pusher from "pusher-js";
export default defineComponent({
  setup() {
    useMenu().onSelectedKeys(["admin-list-user"]);
    useMenu().onOpenKeys(["admin-users-sub"]);
  },
});
</script>

<style>

</style>
