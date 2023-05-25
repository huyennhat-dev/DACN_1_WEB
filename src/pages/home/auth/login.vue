<template>
  <form @submit.prevent="login()" class="auth-modal">
    <div class="d-flex">
      <div class="modal-left">
        <div class="form-title">
          <h1>Xin chào!</h1>
        </div>
        <div class="form-title">Vui lòng điền thông tin đăng nhập</div>
        <br />
        <div class="row">
          <div class="col-12">
            <label for="">Tên đăng nhập</label>
          </div>
          <div class="col-12">
            <a-input
              class="brr-5"
              v-model:value="user.username"
              placeholder="Nhập tên đăng nhập"
            >
              <template #prefix>
                <user-outlined />
              </template>
            </a-input>
            <div class="w-100"></div>
            <small v-if="errors.username" class="text-danger">
              {{ errors.username }}
            </small>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12">
            <label for="">Mật khẩu</label>
          </div>
          <div class="col-12">
            <a-input-password
              class="brr-5"
              v-model:value="user.password"
              placeholder="Nhập mật khẩu"
            >
              <template #prefix>
                <lock-outlined />
              </template>
            </a-input-password>
            <div class="w-100"></div>
            <small v-if="errors.password" class="text-danger">
              {{ errors.password }}
            </small>
          </div>
        </div>

        <div class="row justify-content-center mt-3 mb-3">
          <div class="col-10">
            <a-button
              htmlType="submit"
              type="primary"
              danger
              class="w-100 brr-5"
            >
              Đăng nhập
            </a-button>
          </div>
        </div>

        <div class="row">
          <div class="col-2 col-sm-3 ps-4">
            <hr class="d-none d-sm-block" />
          </div>
          <div class="col-8 col-sm-6 text-center">
            <div class="with-text text-body-secondary">Hoặc đăng nhập bằng</div>
          </div>
          <div class="col-2 col-sm-3 pe-4">
            <hr class="d-none d-sm-block" />
          </div>
        </div>

        <div class="row justify-content-center mt-3">
          <div class="col-10">
            <a-button
              type="primary"
              @click="signInWithGoogle"
              class="w-100 brr-5"
            >
              <google-outlined />
              Đăng nhập bằng Google
            </a-button>
            <GoogleLogin :callback="callback" prompt auto-login />
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-12 fs-small fst-italic text-center">
            <span>Bằng việc đăng nhập, bạn đã chấp nhận </span>
            <a href="">điều khoản sử dụng</a>
          </div>
        </div>
      </div>
      <div
        class="modal-right d-none d-sm-flex justify-content-center align-items-center"
      >
        <img src="../../../assets/images/login-bg.png" alt="" width="200" />
      </div>
    </div>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import { notification } from "ant-design-vue";

import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import axios from "axios";
import { BASE_URL, CLIENT_ID } from "../../../configs";
import { useAuthStore } from "../../../store/auth";
import { useCartStore } from "../../../store/cart";
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    GoogleOutlined,
    CloseOutlined,
  },
  setup() {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      errors: {
        username: "",
        password: "",
      },
      callback: (response) => {
        console.log("Logged in");
        console.log(response);
      },
    };
  },

  methods: {
    validate() {
      let inValid = true;
      if (!this.user.username) {
        this.errors.username = "Tên đăng nhập không được bỏ trống";
        inValid = false;
      }
      if (!this.user.password || this.user.password.length < 8) {
        this.errors.password = "Mật khẩu không hợp lệ";
        inValid = false;
      }
      return inValid;
    },

    async login() {
      if (this.validate()) {
        try {
          const res = await axios.post(
            `${BASE_URL}/home/auth/login`,
            this.user
          );
          if (res.status == 200) {
            useAuthStore().setToken(res.data.token);
            useAuthStore().setUser(res.data.token);
            useCartStore().fetchCartData();

            this.$emit("handleClickToggleLoginModal");

            this.user.username = "";
            this.user.password = "";
            this.errors.username = "";
            this.errors.username = "";
            notification.success({
              description: "Đăng nhập thành công!",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    signInWithGoogle() {
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: this.handleGoogleSignIn,
      });
      google.accounts.id.prompt();
    },
    handleGoogleSignIn(response) {
      console.log("ok");
      // const credential = response.credential;
      // Gửi credential cho server để xác thực và tạo phiên đăng nhập
      // ...
    },
  },
});
</script>

<style>
.auth-modal .modal-left {
  width: 500px;
  padding: 40px;
}

.modal-left .form-title h1 {
  margin: 0;
}

.auth-modal .ant-modal-body {
  padding: 0;
}

.auth-modal .modal-right {
  position: relative;
  width: 300px;
  padding: 10px;
  border-radius: 0 10px 10px 0;
  background: linear-gradient(
    136deg,
    rgb(240, 248, 255) -1%,
    rgb(219, 238, 255) 85%
  );
}

@media (max-width: 570px) {
  .auth-modal .modal-left {
    padding: 10px;
  }
}
</style>
