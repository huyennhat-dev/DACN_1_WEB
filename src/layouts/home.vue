<template>
  <div class="container-fuild position-relative">
    <the-header
      v-on:handleClickToggleLoginModal="handleOpenLoginModal"
      v-on:handleClickToggleCartDrawer="handleOpenCart"
      v-on:handleClickToggleMenuDrawer="handleOpenMenu"
    />
    <router-view></router-view>

    <a-modal
      v-model:visible="isToggleLoginModal"
      centered
      width="800px"
      :footer="null"
      class="login-modal brr-5"
      style="padding: 20px"
    >
      <the-login-form v-on:handleClickToggleLoginModal="handleOpenLoginModal" />
    </a-modal>

    <a-drawer
      v-model:visible="isToggleCartDrawer"
      class="cart-drawer"
      style="color: red"
      title="Giỏ hàng"
      placement="right"
    >
      <the-cart-drawer />
    </a-drawer>
    <a-drawer
      v-model:visible="isToggleMenuDrawer"
      class="menu-drawer"
      style="color: red"
      placement="left"
    >
      <the-menu-drawer />
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
import TheMenuDrawer from "../components/home/TheMenuDrawer.vue";

export default defineComponent({
  components: {
    TheHeader,
    TheLoginForm,
    TheCartDrawer,
    TheMenuDrawer,
  },
  setup() {
    const isToggleLoginModal = ref(false);
    const isToggleCartDrawer = ref(false);
    const isToggleMenuDrawer = ref(false);

    const handleOpenLoginModal = () => {
      isToggleLoginModal.value = !isToggleLoginModal.value;
    };

    const handleOpenCart = () => {
      isToggleCartDrawer.value = !isToggleCartDrawer.value;
    };
    const handleOpenMenu = () => {
      isToggleMenuDrawer.value = !isToggleMenuDrawer.value;
    };

    return {
      isToggleLoginModal,
      isToggleCartDrawer,
      isToggleMenuDrawer,
      handleOpenLoginModal,
      handleOpenCart,
      handleOpenMenu,
    };
  },
  created() {},
  methods: {},
});
</script>
<style>
.menu-drawer .ant-drawer-header-title {
  justify-content: flex-end;
}
.menu-drawer .ant-drawer-close {
  margin: 0;
}

@media (max-width: 576px) {
  .menu-drawer .ant-drawer-content-wrapper,
  .cart-drawer .ant-drawer-content-wrapper  {
  width: 340px !important;
}
}

.login-modal .ant-modal-body,
.login-modal .ant-modal-content {
  border-radius: 10px;
}
.login-modal .ant-modal-close-x {
  border-radius: 50%;
  background-color: #fff;
  height: 50px;
  width: 50px;
}
</style>
