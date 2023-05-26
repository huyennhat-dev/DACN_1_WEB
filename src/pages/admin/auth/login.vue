<template>
  <div
    class="container w-100 d-flex align-items-center justify-content-center w-100"
    style="height: 100vh"
  >
    <div class="row w-100 d-flex align-items-center justify-content-center">
      <div class="col-12 col-sm-5 p-3 p-sm-5 brr-10 shadow-full">
        <a-form @submit.prevent="login()">
          <div class="row">
            <div class="col-12 col-sm-4 mb-2">
              <label for="">
                <span>Tên đăng nhập :</span>
              </label>
            </div>
            <div class="col-12 col-sm-8 mb-2">
              <a-input
                class="brr-5"
                v-model:value="account.username"
                placeholder="Nhập tên đăng nhập"
              />
              <div class="w-100"></div>
              <small v-if="error.username" class="text-danger">
                {{ error.username }}
              </small>
            </div>
            <div class="col-12 col-sm-4 mb-2">
              <label for="">
                <span>Mật khẩu :</span>
              </label>
            </div>
            <div class="col-12 col-sm-8 mb-4">
              <a-input-password
                class="brr-5"
                v-model:value="account.password"
                placeholder="Nhập mật khẩu"
              />
              <div class="w-100"></div>
              <small v-if="error.password" class="text-danger">
                {{ error.password }}
              </small>
            </div>
            <div class="col-12 col-sm-4"></div>
            <div class="col-12 col-sm-8 text-center">
              <a-button type="primary" htmlType="submit" ghost class="brr-5">
                Đăng nhập
              </a-button>
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { BASE_URL } from "../../../configs";
import { useAdminAuthStore } from "../../../store/admin/auth";
import { notification } from "ant-design-vue";
export default defineComponent({
  data() {
    return {
      account: {
        username: "",
        password: "",
      },
      error: {
        username: "",
        password: "",
      },
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    validate() {
      let inValid = true;
      this.error = {
        username: "",
        password: "",
      };

      if (!this.account.username) {
        this.error.username = "Tên đăng nhập không được để trống!";
        inValid = false;
      }
      if (!this.account.password) {
        this.error.password = "Mật khẩu không được để trống!";
        inValid = false;
      }
      return inValid;
    },
    async login() {
      try {
        if (this.validate()) {
          const rs = await axios.post(
            `${BASE_URL}/admin/auth/login`,
            this.account
          );
          if (rs.status == 200) {
            useAdminAuthStore().setToken(rs.data.token);
            useAdminAuthStore().setUser(rs.data.token);
            this.$router.push({ name: "admin-dashboard" });
            notification.success({
              description: "Đăng nhập thành công!",
              duration: 3,
            });
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) {
          notification.error({
            description: error.response.data.error.keyPattern.message,
            duration: 3,
          });
        }
      }
    },
    checkLogin() {
      try {
        const isLogged = useAdminAuthStore().isAuthenticated;
        if (isLogged) this.$router.push({ name: "admin-dashboard" });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
