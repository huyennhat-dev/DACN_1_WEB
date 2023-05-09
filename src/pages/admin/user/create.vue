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
                <span :class="{ 'text-danger': errors.status_id }">
                  Tình trạng:
                </span>
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
                    v-model:value="status_id"
                    :class="{ ' input-danger': errors.status_id }"
                  ></a-select>
                  <div class="w-100"></div>
                  <small v-if="errors.status_id" class="text-danger">
                    {{ errors.status_id[0] }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span :class="{ 'text-danger': errors.username }"
                  >Tên tài khoản:</span
                >
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-input
                    placeholder="Tên tài khoản"
                    v-model:value="username"
                    allowClear
                    :class="{ 'input-danger': errors.username }"
                  />
                  <div class="w-100"></div>
                  <small v-if="errors.username" class="text-danger">
                    {{ errors.username[0] }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span :class="{ 'text-danger': errors.name }">Họ và Tên:</span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-input
                    placeholder="Họ và Tên"
                    v-model:value="name"
                    allowClear
                    :class="{ 'input-danger': errors.name }"
                  />
                  <div class="w-100"></div>
                  <small v-if="errors.name" class="text-danger">
                    {{ errors.name[0] }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span :class="{ 'text-danger': errors.email }">Email:</span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-input
                    placeholder="Email"
                    v-model:value="email"
                    :class="{ 'input-danger': errors.email }"
                    allowClear
                  />
                  <div class="w-100"></div>
                  <small v-if="errors.email" class="text-danger">
                    {{ errors.email[0] }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span :class="{ 'text-danger': errors.department_id }"
                  >Vai trò:</span
                >
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-select
                    show-search
                    placeholder="Vai trò"
                    style="width: 100%"
                    :options="departments"
                    :filter-option="filterOption"
                    v-model:value="department_id"
                    :class="{ 'input-danger': errors.department_id }"
                  ></a-select>
                  <div class="w-100"></div>
                  <small v-if="errors.department_id" class="text-danger">
                    {{ errors.department_id[0] }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span :class="{ 'text-danger': errors.password }">
                  Mật khẩu:
                </span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-input-password
                    placeholder="Mật khẩu"
                    v-model:value="password"
                    :class="{ 'input-danger': errors.password }"
                  />
                  <div class="w-100"></div>
                  <small v-if="errors.password" class="text-danger">
                    {{ errors.password[0] }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span :class="{ 'text-danger': errors.password }">
                  Xác nhận mật khẩu:
                </span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <div class="row">
                <div class="col-12 col-sm-10">
                  <a-input-password
                    placeholder="Xác nhận mật khẩu"
                    v-model:value="password_confirmation"
                    :class="{ 'input-danger': errors.password }"
                  />
                  <div class="w-100"></div>
                  <small v-if="errors.password" class="text-danger">
                    {{ errors.password[0] }}
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
import BASE_URL from "../../../configs/api.js";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { UserOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    MyUpload,
    UserOutlined
  },
  data() {
    return {
      show: false,
      imgUrl: "",
    };
  },
  setup() {
    useMenu().onSelectedKeys(["admin-create-user"]);
    useMenu().onOpenKeys(["admin-users-sub"]);

    const router = useRouter();
    const users_status = ref([]);
    const departments = ref([]);
    const user = reactive({
      username: "",
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      department_id: [],
      status_id: [],
    });
    const errors = ref([]);

    const langExt = reactive({
      hint: "Nhấp hoặc kéo tệp vào đây để tải lên",
      preview: "Preview",
      error: {
        onlyImg: "Chỉ chọn hình ảnh",
        outOfSize: "Kích thước ảnh cho phép tối đa: ",
        lowestPx: "Kích thước của hình ảnh quá thấp. Dự kiến ít nhất: ",
      },
    });

    const getUsersCreate = () => {
      axios
        .get(`${BASE_URL}/users/create`)
        .then((res) => {
          users_status.value = res.data.users_status;
          departments.value = res.data.departments;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    const createUsers = async () => {
      try {
        message.loading({ content: "Loading...", key });
        const res = await axios.post(`${BASE_URL}/users`, user);
        if (res.status == 200) {
          message.success({ key, duration: 3, content: "Thêm thành công!" });
          router.push({ name: "admin-user" });
        }
      } catch (error) {
        message.destroy();
        errors.value = error.response.data.errors;
      }
    };

    const clearForm = () => {
      user.username = "";
      user.name = "";
      user.email = "";
      user.password = "";
      user.password_confirmation = "";
      user.department_id = [];
      user.status_id = [];
      errors.value = [];
    };

    getUsersCreate();

    return {
      departments,
      users_status,
      errors,
      ...toRefs(user),
      filterOption,
      createUsers,
      clearForm,
      langExt,
    };
  },
  methods: {
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
