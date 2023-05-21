<template>
  <div class="header">
    <div class="header-body shadow-full">
      <div class="container">
        <div class="row">
          <div class="d-none d-sm-block col-sm-3 logo text-center">
            <router-link :to="{ name: 'index' }">
              <img class="" src="../../assets/images/logo.png" alt="" />
            </router-link>
          </div>
          <div class="col-2 d-sm-none d-block logo text-center">
            <router-link :to="{ name: 'index' }">
              <img class="" src="../../assets/images/logo_2.png" alt="" />
            </router-link>
          </div>
          <div
            class="d-flex align-items-center-center"
            :class="{ 'col-7 col-sm-4': isLogged, 'col-7 col-sm-6': !isLogged }"
          >
            <div class="header-body-seach_form w-100 py-2 py-sm-1">
              <a-input class="h-100 brr-5" placeholder="Bạn muốn tìm gì?">
                <template #prefix>
                  <search-outlined class="d-none d-sm-block" />
                </template>
                <template #suffix>
                  <div class="header-search_button d-none d-sm-block">
                    Tìm kiếm
                  </div>
                  <search-outlined class="d-block d-sm-none" />
                </template>
              </a-input>
            </div>
          </div>
          <div
            class="d-flex align-items-center justify-content-between justify-content-sm-end"
            :class="{ 'col-3 col-sm-5': isLogged, 'col-3 col-sm-3': !isLogged }"
          >
            <ul class="nav w-100 justify-content-sm-end">
              <router-link
                :to="{ name: 'index' }"
                class="d-none d-sm-block me-2"
              >
                <li class="header-button brr-5 active px-3 py-2">
                  <home-outlined class="button-icon me-1" />
                  <span>Trang chủ</span>
                </li>
              </router-link>
              <li
                v-if="!isLogged"
                class="header-button d-flex cart brr-5 px-1 px-sm-3 me-2 me-sm-0 py-sm-2 align-items-center justify-content-center"
                @click="handleClick"
              >
                <login-outlined class="button-icon" />
                <span class="d-none d-sm-block">Đăng nhập</span>
              </li>
              <li
                v-if="isLogged"
                class="d-none d-sm-block header-account px-5 position-relative me-2"
              >
                <div
                  class="d-flex justify-content-between align-items-center h-100"
                >
                  <div class="user-photo me-1 rounded-circle">
                    <img :src="user.photo" width="30" class="rounded-circle" />
                  </div>
                  {{ user.name }}
                </div>
                <div class="account-body position-absolute z-3 p-2">
                  <ul class="nav">
                    <router-link :to="{ name: 'index' }" class="w-100">
                      <li class="account-item p-2 w-100">
                        <user-outlined class="me-2 fw-bolder" />
                        <span>Tài khoản của tôi</span>
                      </li>
                    </router-link>
                    <router-link :to="{ name: 'index' }" class="w-100">
                      <li class="account-item p-2 w-100">
                        <deployment-unit-outlined class="me-2 fw-bolder" />
                        <span>Xem đơn hàng</span>
                      </li>
                    </router-link>
                    <li class="account-item p-2 w-100" @click="logOut">
                      <logout-outlined class="me-2 fw-bolder" />
                      <span>Đăng xuất</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                v-if="isLogged"
                class="header-button d-flex cart brr-5 px-1 px-sm-3 me-2 me-sm-0 py-sm-2 align-items-center justify-content-center"
                @click="handleClickOpenCart"
              >
                <shopping-outlined class="button-icon me-1" />
                <span class="d-none d-sm-block"> Giỏ hàng</span>
                <div v-if="carts.length > 0" class="count-cart">
                  {{ carts.length > 99 ? "+99" : carts.length }}
                </div>
              </li>
              <li
                @click="handleClickOpenMenu"
                class="header-button d-flex align-items-center justify-content-center d-block d-sm-none brr-5 px-1 px-sm-2"
              >
                <menu-outlined class="button-icon" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import {
  InfoCircleOutlined,
  BlockOutlined,
  CrownOutlined,
  UserOutlined,
  DeploymentUnitOutlined,
  LoginOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserAddOutlined,
  HomeOutlined,
  ShoppingOutlined,
  MenuOutlined,
} from "@ant-design/icons-vue";

import { useAuthStore } from "../../store/auth";
import { useCartStore } from "../../store/cart";
export default defineComponent({
  components: {
    MenuOutlined,
    InfoCircleOutlined,
    BlockOutlined,
    CrownOutlined,
    UserOutlined,
    DeploymentUnitOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
    SearchOutlined,
    HomeOutlined,
    ShoppingOutlined,
  },
  setup() {
    const isLogged = ref(useAuthStore().isAuthenticated);
    watch(
      () => useAuthStore().isLoggedIn,
      (nVal) => {
        isLogged.value = nVal;
      }
    );

    const carts = ref(useCartStore().getCartData);
    watch(
      () => useCartStore().carts,
      (nVal) => {
        carts.value = nVal;
      }
    );

    const user = ref(useAuthStore().getUser);
    watch(
      () => useAuthStore().user,
      (nVal) => {
        user.value = nVal;
      }
    );
    return { isLogged, carts, user };
  },

  methods: {
    handleClick(e) {
      this.$emit("handleClickToggleLoginModal");
    },

    handleClickOpenCart(e) {
      this.$emit("handleClickToggleCartDrawer");
    },
    handleClickOpenMenu(e) {
      this.$emit("handleClickToggleMenuDrawer");
    },

    logOut() {
      useAuthStore().logout();
    },
  },
});
</script>

<style>
.header {
  position: relative;
  z-index: 998;
  top: 0;
}

.header .header-body {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 0;
  height: var(--header-height);
  background-color: #fff;
}

.header-body .logo {
  padding: 0 15px;
}
.header-body .logo img {
  height: 50px;
}

.header .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
  border-color: #d9d9d9;
  box-shadow: none;
}
.header .ant-input-affix-wrapper:focus,
.ant-input-affix-wrapper-focused {
  border-color: #d9d9d9;
  box-shadow: 0 0 5px 0px rgba(241, 93, 34) !important;
}

.header .header-button {
  cursor: pointer;
  transition: all 0.2s;
}
.header .header-button.active {
  font-weight: 600;
}

.header .header-button.active,
.header .header-button:hover {
  color: var(--primary-color);
  background-color: rgba(159, 156, 155, 0.1);
  transition: all 0.2s;
}
.header .header-account {
  cursor: pointer;
}

.header .header-account:hover .account-body {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(10px);
  transition: opacity 0.3s, transform 0.3s;
}
.header .account-body {
  left: 0;
  right: 0;
  top: 35px;
  opacity: 0;
  width: 100%;
  height: auto;
  border-radius: 5px;
  pointer-events: none;
  transform: translateY(0);
  transition: opacity 0.3s, transform 0.3s;
  background-color: rgba(237, 237, 237, 0.9);
}
.header .account-body::after {
  content: "";
  position: absolute;
  left: 50px;
  top: -8px;
  background-color: transparent;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 10px solid rgba(237, 237, 237, 0.9);
}

.header .account-body::before {
  content: "";
  position: absolute;
  left: 0;
  top: -15px;
  height: 20px;
  width: 100%;
  background-color: transparent;
}
.header .account-item {
  color: #000;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
}
.header .account-item:hover {
  color: var(--primary-color);
  transition: all 0.15s;
}
.header .account-item:hover span {
  scale: 1.2;
  transition: all 0.2s;
}
.header .header-button.cart {
  position: relative;
}

.header-button.cart .count-cart {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--primary-color);
  font-size: 8px;
  font-weight: 600;
  color: white;
  border-radius: 10px;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px 0px var(--primary-color);
}
@media (max-width: 576px) {
  .header-button.cart .count-cart {
    width: 16px;
    height: 16px;
  }
}
.header .button-icon {
  font-size: 18px;
}
</style>
