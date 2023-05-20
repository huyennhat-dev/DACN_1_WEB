<template>
  <form @submit.prevent="createRole()" class="h-100">
    <a-card title="Tạo mới vai trò" class="h-100">
      <div class="row">
        <div class="col-12">
          <div class="row mb-2 justify-content-center">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Tên vai trò:</span>
              </label>
            </div>
            <div class="col-12 col-sm-6">
              <a-input
                placeholder="Tên vai trò"
                v-model:value="role.name"
                allowClear
                :class="{ 'input-danger': errors.name }"
              />
              <div class="w-100"></div>
              <small v-if="errors.name" class="text-danger">
                {{ errors.name }}
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

const key = "createRole";

export default defineComponent({
  setup() {
    useMenuStore().onSelectedKeys(["admin-create-role"]);
    useMenuStore().onOpenKeys(["admin-roles-sub"]);
  },
  data() {
    return {
      role: { name: "" },
      errors: { name: "" },
    };
  },
  created() {
    document.title = "Thêm vai trò";
  },
  methods: {
    validate() {
      let inValid = true;
      this.errors = { name: "" };

      if (!this.role.name) {
        this.errors.name = "Tên vai trò không được để trống!";
        inValid = false;
      }
      return inValid;
    },
    async createRole() {
      if (this.validate()) {
        try {
          message.loading({ content: "Đang tải...", key, duration: 100000 });

          const res = await axios.post(
            `${BASE_URL}/admin/role/create`,
            this.role
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
          if (error) {
            this.errors.name = "Vai trò đã tồn tại!";
          }
          message.destroy();
        }
      }
    },

    clearForm() {
      (this.role.name = ""), (this.errors.name = "");
    },
  },
});
</script>
<style></style>
