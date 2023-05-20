<template>
  <div class="container-fuild position-relative">
    <the-header
      v-on:handleClickVisible="handleVisible"
      v-on:handleClickToggleDrawer="handleOpenCart"
    />
    <router-view></router-view>
    <the-login-form
      v-bind:visible="visible"
      v-on:handleClickCloseModal="handleVisible"
    />
    <a-drawer
      v-model:visible="isToggleCartDrawer"
      class="custom-class"
      style="color: red"
      title="Giỏ hàng"
      placement="right"
    >
      <the-cart-drawer  />
    </a-drawer>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { BASE_URL } from "../configs";
import { message } from "ant-design-vue";

import TheHeader from "../components/home/TheHeader.vue";
import TheLoginForm from "../pages/home/auth/login.vue";
import TheCartDrawer from "../components/home/TheCartDrawer.vue";

export default defineComponent({
  components: {
    TheHeader,
    TheLoginForm,
    TheCartDrawer,
  },
  setup() {
    const visible = ref(false);
    const isToggleCartDrawer = ref(false);

    const handleVisible = () => {
      visible.value = !visible.value;
    };

    const handleOpenCart = () => {
      isToggleCartDrawer.value = true;
    };

    return { visible, isToggleCartDrawer, handleVisible, handleOpenCart };
  },
  created() {},
  methods: {},
});
</script>
