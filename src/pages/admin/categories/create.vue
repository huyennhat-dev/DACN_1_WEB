<template>
  <form @submit.prevent="createCategories()" class="h-100">
    <a-card title="Tạo mới thể loại sách" class="h-100">
      <div class="row">
        <div class="col-12">
          <div class="row mb-2 justify-content-center">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Tên thể loại:</span>
              </label>
            </div>
            <div class="col-12 col-sm-6">
              <a-input
                placeholder="Tên thể loại"
                v-model:value="categories.name"
                allowClear
                :class="{ 'input-danger': errors.name }"
              />
              <div class="w-100"></div>
              <small v-if="errors.name" class="text-danger">
                {{ errors.name }}
              </small>
            </div>
          </div>
          <div class="row mb-2 justify-content-center">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Trạng thái:</span>
              </label>
            </div>
            <div class="col-12 col-sm-6">
              <a-select
                show-search
                placeholder="Trạng thái"
                style="width: 100%"
                :options="status"
                :filter-option="filterOption"
                v-model:value="categories.status"
                :class="{ 'input-danger': errors.status }"
              ></a-select>
              <div class="w-100"></div>
              <small v-if="errors.status" class="text-danger">
                {{ errors.status }}
              </small>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-0 col-sm-3"></div>
            <div
              class="col-12 col-sm-6 d-grid d-sm-flex justify-content-sm-end mt-3 mt-sm-0"
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
import { defineComponent } from "vue";

import { useMenuStore } from "../../../store/menu.js";
import { BASE_URL } from "../../../configs/index.js";
import { message } from "ant-design-vue";
import { useAdminAuthStore } from "../../../store/admin/auth.js";

const key = "createCategories";

export default defineComponent({
  setup() {
    useMenuStore().onSelectedKeys(["admin-create-categories"]);
    useMenuStore().onOpenKeys(["admin-categories-sub"]);

    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return {
      filterOption,
    };
  },
  data() {
    return {
      categories: { name: "", status: null },
      errors: { name: "", status: "" },
      status: [],
    };
  },
  created() {
    document.title = "Thêm thể loại sách";
    this.setupCategories();
  },
  methods: {
    async setupCategories() {
      try {
        const res = await axios.get(`${BASE_URL}/categories/create`, {
          headers: {
            "x-auth-token": useAdminAuthStore().getToken,
          },
        });
        this.status = res.data.data.status;
      } catch (error) {
        console.log(error);
      }
    },
    validate() {
      let inValid = true;
      this.errors = { name: "" };

      if (!this.categories.name) {
        this.errors.name = "Tên thể loại không được để trống!";
        inValid = false;
      } else if (this.categories.name.length > 50) {
        this.errors.name = "Tên thể loại quá dài!";
        inValid = false;
      } else if (this.categories.name.length < 3) {
        this.errors.name = "Tên thể loại quá ngắn!";
        inValid = false;
      }
      if (!this.categories.status) {
        this.errors.status = "Trạng thái không được để trống!";
        inValid = false;
      }
      return inValid;
    },
    async createCategories() {
      if (this.validate()) {
        try {
          message.loading({ content: "Đang tải...", key, duration: 100000 });

          const res = await axios.post(
            `${BASE_URL}/categories/create`,
            this.categories,
            {
              headers: {
                "x-auth-token": useAdminAuthStore().getToken,
              },
            }
          );
          if (res.status == 200) {
            setTimeout(() => {
              message.success({
                content: "Thêm thành công!",
                key,
                duration: 3,
              });
              this.clearForm();
            }, 500);
          }
        } catch (error) {
          if (error) {
            this.errors.name = "Thể loại đã tồn tại!";
          }
          message.destroy();
        }
      }
    },

    clearForm() {
      this.categories.name = "";
      this.errors.name = "";
      this.categories.status = null;
      this.errors.status = "";
    },
  },
});
</script>

<style></style>
