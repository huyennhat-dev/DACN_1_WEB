<template>
  <div class="header">
    <div class="header-body shadow-full">
      <div class="container">
        <div class="row">
          <div class="col-2 logo text-center">
            <img class="w-100" src="../../assets/images/logo.png" alt="" />
          </div>
          <div class="col-6 d-flex align-items-center-center">
            <div class="header-body-seach_form w-100">
              <a-input class="h-100 brr-5" placeholder="Bạn muốn tìm gì?">
                <template #prefix>
                  <search-outlined />
                </template>
                <template #suffix>
                  <div class="header-search_button">Tìm kiếm</div>
                </template>
              </a-input>
            </div>
          </div>
          <div class="col-4 d-flex align-items-center justify-content-end">
            <ul class="nav">
              <li class="header-button brr-5 active">
                <home-outlined class="button-icon" />
                Trang chủ
              </li>
              <li class="header-button brr-5" @click="handleClick">
                <login-outlined class="button-icon" />
                Đăng nhập
              </li>
              <li class="header-button cart brr-5">
                <shopping-outlined class="button-icon" />
                Giỏ hàng
                <div class="count-cart">01</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import {
  InfoCircleOutlined,
  BlockOutlined,
  CrownOutlined,
  DeploymentUnitOutlined,
  LoginOutlined,
  SearchOutlined,
  UserAddOutlined,
  HomeOutlined,
  ShoppingOutlined,
} from "@ant-design/icons-vue";

import { useUser } from "../../store/use-user";

export default defineComponent({
  components: {
    InfoCircleOutlined,
    BlockOutlined,
    CrownOutlined,
    DeploymentUnitOutlined,
    LoginOutlined,
    UserAddOutlined,
    SearchOutlined,
    HomeOutlined,
    ShoppingOutlined,
  },
  setup() {},
  data() {
    return {};
  },

  created() {},
  methods: {
    handleClick(e) {
      this.$emit("handleClickVisible");
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

.header .header-body-seach_form {
  padding: 6px 10px;
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
  height: 40px;
  padding: 8px 16px;
  cursor: pointer;
  margin-right: 0.25rem;
  transition: all 0.3s;
}
.header .header-button.active {
  font-weight: 600;
}

.header .header-button.active,
.header .header-button:hover {
  color: var(--primary-color);
  background-color: rgba(241, 93, 34, 0.12);
  transition: all 0.3s;
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
.header .button-icon {
  font-size: 18px;
}
</style>
