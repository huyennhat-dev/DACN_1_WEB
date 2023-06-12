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
                  <img
                    v-if="user.photo"
                    :src="user.photo"
                    height="160"
                    width="160"
                  />
                  <UserOutlined v-if="!user.photo" />
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
                    :options="status"
                    :filter-option="filterOption"
                    v-model:value="user.status"
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
                    v-model:value="user.role"
                    :class="{ 'input-danger': errors.role }"
                  ></a-select>
                  <div class="w-100"></div>
                  <small v-if="errors.role" class="text-danger">
                    {{ errors.role }}
                  </small>
                </div>
                <!-- <div class="col-2 col-sm-1 ps-0 text-end">
                  <a-tooltip placement="topRight" title="Thêm vai trò">
                    <router-link :to="{ name: 'admin-create-role' }">
                      <a-button type="primary" class="w-100 p-0" ghost>
                        <plus-outlined />
                      </a-button>
                    </router-link>
                  </a-tooltip>
                </div> -->
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
import { defineComponent, reactive } from "vue";
import MyUpload from "vue-image-crop-upload";
import { useMenuStore } from "../../../store/menu.js";
import { BASE_URL } from "../../../configs/index.js";
import {
  isPhone,
  isEmail,
  isPassWord,
  isUsername,
  isName,
} from "../../../utils/validation";
import { message } from "ant-design-vue";
import { UserOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { useAdminAuthStore } from "../../../store/admin/auth.js";
const key = "createUser";
export default defineComponent({
  components: {
    MyUpload,
    UserOutlined,
    PlusOutlined,
  },
  setup() {
    useMenuStore().onSelectedKeys(["admin-create-user"]);
    useMenuStore().onOpenKeys(["admin-users-sub"]);

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

      user: {
        username: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        photo: "",
        role: null,
        status: null,
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
      status: [],
      roles: [],
    };
  },

  created() {
    document.title = "Thêm người dùng";
    this.getUsersCreate();
  },
  methods: {
    async getUsersCreate() {
      try {
        const res = await axios.get(`${BASE_URL}/admin/user/create`, {
          headers: { "x-auth-token": useAdminAuthStore().getToken },
        });
        this.status = res.data.data.status;
        this.roles = res.data.data.roles;
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
      } else if (!isUsername(this.user.username)) {
        this.errors.username = "Tên tài khoản không hợp lệ!";
        inValid = false;
      }
      if (!this.user.name) {
        this.errors.name = "Họ và tên không được để trống!";
        inValid = false;
      } else if (!isName(this.user.name)) {
        this.errors.name = "Họ và tên không hợp lệ!";
        inValid = false;
      }
      if (!this.user.email) {
        this.errors.email = "Email không được để trống!";
        inValid = false;
      } else if (!isEmail(this.user.email)) {
        this.errors.email = "Email không hợp lệ!";
        inValid = false;
      }
      if (!this.user.phone) {
        this.errors.phone = "Số điện thoại không được để trống!";
        inValid = false;
      } else if (!isPhone(this.user.phone)) {
        this.errors.phone = "Số điện thoại không hợp lệ!";
        inValid = false;
      }
      if (!this.user.password) {
        this.errors.password = "Mật khẩu không được để trống!";
        inValid = false;
      } else if (!isPassWord(this.user.password)) {
        this.errors.password = "Mật khẩu không hợp lệ!";
        inValid = false;
      }
      if (!this.user.address) {
        this.errors.address = "Địa chỉ không được để trống!";
        inValid = false;
      }
      if (!this.user.role) {
        this.errors.role = "Vai trò không được để trống!";
        inValid = false;
      }
      if (!this.user.status) {
        this.errors.status = "Tình trạng không được để trống!";
        inValid = false;
      }
      return inValid;
    },

    async createUsers() {
      if (this.validate()) {
        try {
          message.loading({ content: "Đang tải...", key, duration: 100000 });
          const res = await axios.post(
            `${BASE_URL}/admin/user/create`,
            this.user,
            { headers: { "x-auth-token": useAdminAuthStore().getToken } }
          );
          if (res.status == 200) {
            setTimeout(() => {
              message.success({
                content: "Thêm thành công!",
                key,
                duration: 3,
              });
            }, 500);
            this.clearForm();
          }
        } catch (error) {
          message.destroy();
          if (error.response.data.error.keyPattern.email) {
            this.errors.email = "Email đã được sử dụng!";
          }
          if (error.response.data.error.keyPattern.username) {
            this.errors.username = "Tên tài khoản đã được sử dụng!";
          }
          if (error.response.data.error.keyPattern.phone) {
            this.errors.phone = "Số điện thoại đã được sử dụng!";
          }
        }
      }
    },

    clearForm() {
      (this.user.username = ""),
        (this.user.name = ""),
        (this.user.email = ""),
        (this.user.phone = ""),
        (this.user.address = ""),
        (this.user.password = ""),
        (this.user.role = null),
        (this.user.status = null);
      (this.errors.username = ""),
        (this.errors.name = ""),
        (this.errors.email = ""),
        (this.errors.phone = ""),
        (this.errors.address = ""),
        (this.errors.password = ""),
        (this.errors.role = ""),
        (this.errors.status = "");
    },

    toggleShow() {
      this.show = !this.show;
    },

    cropSuccess(val) {
      console.log("-------- crop success --------");
      this.user.photo = val;
      console.log(val)
    },
  },
});
</script>

<style></style>
