<template>
  <a-modal
    v-model:visible="visible"
    wrapClassName="auth-modal"
    centered
    :closable="false"
    width="800px"
    :footer="null"
    class="brr-5"
    style="padding: 20px"
  >
    <form @submit.prevent="login()">
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
            <div class="col-12 position-relative">
              <hr />

              <div class="with-text position-absolute text-body-secondary">
                Hoặc đăng nhập bằng
              </div>
            </div>
          </div>

          <div class="row justify-content-center mt-3">
            <div class="col-10">
              <a-button type="primary" class="w-100 brr-5">
                <google-outlined /> Đăng nhập bằng Google
              </a-button>
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
          class="modal-right d-flex justify-content-center align-items-center"
        >
          <img src="../../../assets/images/login-bg.png" alt="" width="200" />
          <div class="modal-close-icon" @click="handelClickCloseModal">
            <close-outlined />
          </div>
        </div>
      </div>
    </form>
  </a-modal>
</template>

<script>
import { defineComponent } from "vue";

import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import axios from "axios";
import { BASE_URL } from "../../../configs";
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
    };
  },
  props: {
    visible: { default: false, type: Boolean },
  },
  methods: {
    handelClickCloseModal(e) {
      this.$emit("handleClickCloseModal");
    },

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
          const res = await axios.post(`${BASE_URL}/home/login`, this.user);
          if (res.status == 200) {
            console.log(res)
            localStorage.setItem("token", res.data.token);
            console.log('ok')
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
});
</script>

<style>
.auth-modal .ant-modal-content {
  border-radius: 16px;
}

.auth-modal .modal-left {
  width: 500px;
  padding: 40px;
}

.modal-left .form-title h1 {
  margin: 0;
}

.modal-left .with-text {
  top: -5px;
  margin: auto;
  left: 26.8%;
  background-color: #fff;
  padding: 0 15px;
}

.auth-modal .ant-modal-body {
  padding: 0;
}

.auth-modal .modal-right {
  position: relative;
  width: 300px;
  padding: 10px;
  border-radius: 0 16px 16px 0;
  background: linear-gradient(
    136deg,
    rgb(240, 248, 255) -1%,
    rgb(219, 238, 255) 85%
  );
}

.modal-right .modal-close-icon {
  position: absolute;
  background-color: #fff;
  border-radius: 50px;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -15px;
  right: -15px;
  cursor: pointer;
  font-size: 20px;
}
</style>
