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
      <the-cart-drawer />
    </a-drawer>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { BASE_URL } from "../configs";
import { useUser } from "../store/use-user";
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
  created() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(`${BASE_URL}/home/check-login`, {
          headers: { "x-auth-token": token },
        });

        if (res.status == 200) {
          useUser().setUserInfo(res.data);
        }
      } catch (error) {
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          message.warning("Phiên đăng nhập của bạn đã hết hạn!", 3);
        }
      }
    },
  },
});
</script>
