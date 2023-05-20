<template>
  <form @submit.prevent="updateRole()" class="h-100">
    <a-card title="Chỉnh sửa vai trò" class="h-100">
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
import { useRoute, useRouter } from "vue-router";

const key = "updateRole";

export default defineComponent({
  setup() {
    useMenuStore().onSelectedKeys(["admin-create-role"]);
    useMenuStore().onOpenKeys(["admin-roles-sub"]);

    const route = useRoute();
    const router = useRouter();
    return {
      route,
      router,
    };
  },
  data() {
    return {
      role: { name: "" },
      errors: { name: "" },
    };
  },
  created() {
    document.title = "Chỉnh sửa vai trò";
    this.getRole();
  },
  methods: {
    async getRole() {
      try {
        const res = await axios.get(
          `${BASE_URL}/admin/role/edit/${this.route.params.id}`
        );
        if (res.status == 200) {
          const data = res.data.data;
          this.role.name = data.name;
        }
      } catch (error) {
        console.log(error);
      }
    },
    validate() {
      let inValid = true;
      this.errors = { name: "" };

      if (!this.role.name) {
        this.errors.name = "Tên vai trò không được để trống!";
        inValid = false;
      }
      return inValid;
    },

    async updateRole() {
      if (this.validate()) {
        try {
          message.loading({ content: "Đang tải...", key, duration: 100000 });
          const res = await axios.put(
            `${BASE_URL}/admin/role/edit/${this.route.params.id}`,
            this.role
          );
          if (res.status == 200) {
            setTimeout(() => {
              this.router.push({ name: "admin-list-roles" });
              message.success({
                content: "Sửa thành công!",
                key,
                duration: 3,
              });
            }, 500);
          }
        } catch (error) {
          console.log(error);
          message.destroy();
        }
      }
    },
    clearForm() {},
  },
});
</script>

<style></style>
