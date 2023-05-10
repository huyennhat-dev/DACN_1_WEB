<template>
  <form @submit.prevent="createUsers()" class="h-100">
    <a-card title="Tạo mới tài khoản" class="h-100">
      <div class="row">
        <div class="col-12 col-sm-4">
          <div class="row">
            <my-upload
              field="img"
              @crop-success="cropSuccess"
              v-model="show"
              :width="300"
              :height="300"
              img-format="png"
              :maxSize="2048"
              langType="vi"
              :langExt="langExt"
            />
            <div class="col-12 d-flex justify-content-center">
              <a-avatar shape="square" :size="160">
                <template #icon>
                  <img v-if="imgUrl" :src="imgUrl" height="160" width="160" />
                  <UserOutlined v-if="!imgUrl" />
                </template>
              </a-avatar>
            </div>

            <div class="col-12 d-flex justify-content-center my-3">
              <a-button
                type="primary"
                class="d-flex align-items-center px-3 py-0"
                @click="toggleShow"
              >
                <span>Chọn ảnh</span>
              </a-button>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-8">
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Tên tài khoản:</span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-input
                    placeholder="Tên tài khoản"
                    v-model:value="user.username"
                    allowClear
                    :class="{ 'input-danger': errors.username }"
                  />
                  <div class="w-100"></div>
                  <small v-if="errors.username" class="text-danger">
                    {{ errors.username }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Họ và Tên:</span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-input
                    placeholder="Họ và Tên"
                    v-model:value="user.name"
                    allowClear
                    :class="{ 'input-danger': errors.name }"
                  />
                  <div class="w-100"></div>
                  <small v-if="errors.name" class="text-danger">
                    {{ errors.name }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Email:</span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-input
                    placeholder="Email"
                    v-model:value="user.email"
                    type="email"
                    :class="{ 'input-danger': errors.email }"
                    allowClear
                  />
                  <div class="w-100"></div>
                  <small v-if="errors.email" class="text-danger">
                    {{ errors.email }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Số điện thoại:</span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-input
                    placeholder="Số điện thoại"
                    v-model:value="user.phone"
                    :class="{ 'input-danger': errors.phone }"
                    allowClear
                  />
                  <div class="w-100"></div>
                  <small v-if="errors.phone" class="text-danger">
                    {{ errors.phone }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Địa chỉ:</span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-input
                    placeholder="address"
                    v-model:value="user.address"
                    :class="{ 'input-danger': errors.address }"
                    allowClear
                  />
                  <div class="w-100"></div>
                  <small v-if="errors.address" class="text-danger">
                    {{ errors.address }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span> Tình trạng: </span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-select
                    show-search
                    placeholder="Tình trạng"
                    style="width: 100%"
                    :options="users_status"
                    :filter-option="filterOption"
                    v-model:value="user.status_id"
                    :class="{ ' input-danger': errors.status }"
                  ></a-select>
                  <div class="w-100"></div>
                  <small v-if="errors.status" class="text-danger">
                    {{ errors.status }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Vai trò:</span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-select
                    show-search
                    placeholder="Vai trò"
                    style="width: 100%"
                    :options="roles"
                    :filter-option="filterOption"
                    v-model:value="user.role_id"
                    :class="{ 'input-danger': errors.role }"
                  ></a-select>
                  <div class="w-100"></div>
                  <small v-if="errors.role" class="text-danger">
                    {{ errors.role }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span> Mật khẩu: </span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-input-password
                    placeholder="Mật khẩu"
                    v-model:value="user.password"
                    :class="{ 'input-danger': errors.password }"
                  />
                  <div class="w-100"></div>
                  <small v-if="errors.password" class="text-danger">
                    {{ errors.password }}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-sm-4"></div>
        <div class="col-sm-8">
          <div class="row">
            <div
              class="col-12 col-sm-9 d-grid d-sm-flex justify-content-sm-end"
            >
              <a-button
                htmlType="submit"
                type="primary"
                class="me-0 mb-2 mb-sm-0"
              >
                <span>Lưu</span>
              </a-button>

              <a-button
                type="primary"
                danger
                ghost
                class="ms-sm-2"
                @click="clearForm"
              >
                <span>Hủy</span>
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </a-card>
  </form>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import MyUpload from "vue-image-crop-upload";
import { useMenu } from "../../../store/use-menu.js";
import { BASE_URL } from "../../../configs/api.js";
import {
  isPhone,
  isEmail,
  isPassWord,
  isUsername,
  isName,
} from "../../../utils/validation";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { UserOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    MyUpload,
    UserOutlined,
  },
  setup() {
    useMenu().onSelectedKeys(["admin-create-user"]);
    useMenu().onOpenKeys(["admin-users-sub"]);

    const langExt = reactive({
      hint: "Nhấp hoặc kéo tệp vào đây để tải lên",
      preview: "Preview",
      error: {
        onlyImg: "Chỉ chọn hình ảnh",
        outOfSize: "Kích thước ảnh cho phép tối đa: ",
        lowestPx: "Kích thước của hình ảnh quá thấp. Dự kiến ít nhất: ",
      },
    });
    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    return {
      filterOption,
      langExt,
    };
  },
  data() {
    return {
      show: false,
      imgUrl: "",
      user: {
        username: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        role_id: "",
        status_id: "",
      },
      errors: {
        username: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        role: "",
        status: "",
      },
      users_status: [],
      roles: [],
    };
  },

  created() {
    this.getUsersCreate();
  },
  methods: {
    async getUsersCreate() {
      try {
        const res = await axios.get(`${BASE_URL}/admin/user/create`);
        this.users_status = res.data.data.users_status;
        this.roles = res.data.data.role;
      } catch (error) {
        console.log(error);
      }
    },
    validate() {
      let inValid = true;
      this.errors = {
        username: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        role: "",
        status: "",
      };

      if (!this.user.username) {
        this.errors.username = "Tên tài khoản không được để trống!";
        inValid = false;
      } else if (!this.isUsername(this.user.username)) {
        this.errors.username = "Tên tài khoản không hợp lệ!";
        inValid = false;
      }
      if (!this.user.name) {
        this.errors.name = "Họ và tên không được để trống!";
        inValid = false;
      } else if (!this.isName(this.user.name)) {
        this.errors.name = "Họ và tên không hợp lệ!";
        inValid = false;
      }
      if (!this.user.email) {
        this.errors.email = "Email không được để trống!";
        inValid = false;
      } else if (!this.isEmail(this.user.email)) {
        this.errors.email = "Email không hợp lệ!";
        inValid = false;
      }
      if (!this.user.phone) {
        this.errors.phone = "Số điện thoại không được để trống!";
        inValid = false;
      } else if (!this.isPhone(this.user.phone)) {
        this.errors.phone = "Số điện thoại không hợp lệ!";
        inValid = false;
      }
      if (!this.user.password) {
        this.errors.password = "Mật khẩu không được để trống!";
        inValid = false;
      } else if (!this.isPassWord(this.user.password)) {
        this.errors.password = "Mật khẩu không hợp lệ!";
        inValid = false;
      }
      if (!this.user.role_id) {
        this.errors.role = "Vai trò trạng không được để trống!";
        inValid = false;
      }
      if (!this.user.status_id) {
        this.errors.status = "Tình trạng không được để trống!";
        inValid = false;
      }
      return inValid;
    },

    createUsers() {
      if (this.validate()) {
      }
    },

    clearForm() {},

    toggleShow() {
      this.show = !this.show;
    },

    cropSuccess(val) {
      console.log("-------- crop success --------");
      this.imgUrl = val;
    },
  },
});
</script>

<style></style>
