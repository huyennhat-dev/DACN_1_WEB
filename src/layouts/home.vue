<template>
  <div class="bookshop container-fuild position-relative " >
    <the-header
      v-on:handleClickToggleLoginModal="handleOpenLoginModal"
      v-on:handleClickToggleCartDrawer="handleOpenCart"
      v-on:handleClickToggleMenuDrawer="handleOpenMenu"
    />
    <div class="position-relative" style="top: 70px">
      <router-view></router-view>
    </div>

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
      title="Giỏ hàng"
      placement="right"
    >
      <template #extra>
        <div v-if="cartLength > 0">
          <span class="fs-6 text-black fw-medium"> Hiện có </span>
          <span class="fs-6 text-primary fw-semibold"> {{ cartLength }} </span>
          <span class="fs-6 text-black fw-medium"> đơn hàng </span>
        </div>
      </template>
      <the-cart-drawer v-on:handleClickToggleCartDrawer="handleOpenCart" />
    </a-drawer>
    <a-drawer
      v-model:visible="isToggleMenuDrawer"
      class="menu-drawer"
      style="color: red"
      placement="left"
    >
      <the-menu-drawer />
    </a-drawer>
    <the-footer class="mt-3 bg-white shadow-full"/>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";

import TheHeader from "../components/home/TheHeader.vue";
import TheFooter from "../components/home/TheFooter.vue";
import TheLoginForm from "../pages/home/auth/login.vue";
import TheCartDrawer from "../components/home/TheCartDrawer.vue";
import TheMenuDrawer from "../components/home/TheMenuDrawer.vue";
import { useCartStore } from "../store/cart";

export default defineComponent({
  components: {
    TheFooter,
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

    const cartLength = ref(useCartStore().getCartData.length);
    watch(
      () => useCartStore().carts.length,
      (nVal) => (cartLength.value = nVal)
    );
    return {
      isToggleLoginModal,
      isToggleCartDrawer,
      isToggleMenuDrawer,
      handleOpenLoginModal,
      handleOpenCart,
      handleOpenMenu,
      cartLength,
    };
  },
  created() {},
  methods: {},
});
</script>
<style>
.bookshop {
  height: 100vh;
  max-height: 100vh;
  overflow-y: scroll;
}
.menu-drawer .ant-drawer-header-title {
  justify-content: flex-end;
}
.menu-drawer .ant-drawer-close {
  margin: 0;
}

@media (max-width: 576px) {
  .menu-drawer .ant-drawer-content-wrapper,
  .cart-drawer .ant-drawer-content-wrapper {
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
