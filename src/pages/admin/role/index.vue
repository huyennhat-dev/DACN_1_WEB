<template>
  <a-card title="Danh sách vai trò" class="roles h-100">
    <a-table
      class="h-100"
      :dataSource="roles"
      :columns="columns"
      :scroll="{ x: 576 }"
      bordered
    >
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.key === 'index'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-if="column.key === 'action'">
          <a-tooltip placement="topRight" title="Xem chi tiết">
            <a-button class="me-0 me-sm-1 mb-1 mb-sm-1">
              <eye-outlined />
            </a-button>
          </a-tooltip>
          <a-tooltip placement="topRight" title="Chỉnh sửa">
            <router-link
              :to="{ name: 'admin-edit-role', params: { id: record._id } }"
            >
              <a-button class="me-0 me-sm-1 mb-1 mb-sm-1" type="primary" ghost>
                <form-outlined />
              </a-button>
            </router-link>
          </a-tooltip>
          <a-tooltip placement="topRight" title="Xóa tài khoản">
            <a-popconfirm
              title="Bạn có chắc chắn xóa vai trò này!"
              @confirm="deleteRole(record._id)"
              okText="Xóa"
              placement="bottomLeft"
              okType="danger"
              cancelText="Hủy"
            >
              <a-button class="" danger>
                <delete-outlined />
              </a-button>
            </a-popconfirm>
          </a-tooltip>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { defineComponent } from "vue";
import { BASE_URL } from "../../../configs";
import { useMenuStore } from "../../../store/menu.js";
import { message } from "ant-design-vue";
import {
  FormOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    FormOutlined,
    EyeOutlined,
    DeleteOutlined,
  },
  setup() {
    useMenuStore().onSelectedKeys(["admin-list-roles"]);
    useMenuStore().onOpenKeys(["admin-roles-sub"]);
  },
  data() {
    return {
      roles: [],
      columns: [
        {
          title: "#",
          key: "index",
          width: 40,
        },
        {
          title: "Vai trò",
          dataIndex: "name",
          key: "role",
        },
        {
          title: "Đường dẫn",
          dataIndex: "slug",
          key: "slug",
        },
        {
          title: "Công cụ",
          key: "action",
          width: 170,
        },
      ],
    };
  },
  created() {
    document.title = "Danh sách vai trò";
    this.getRoles();
  },
  methods: {
    async getRoles() {
      try {
        const res = await axios.get(`${BASE_URL}/admin/role`);
        this.roles = res.data.roles;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteRole(id) {
      return new Promise(async (resolve) => {
        try {
          const res = await axios.delete(`${BASE_URL}/admin/role/delete/${id}`);

          if (res.status == 200) {
            setTimeout(() => {
              resolve(true);
              const index = this.roles.findIndex((role) => role._id === id);
              if (index !== -1) {
                this.roles.splice(index, 1);
                message.success({
                  content: "Xóa vai trò thành công!",
                  duration: 3,
                });
              }
            }, 500);
          }
        } catch (error) {
          if (!error.response.data.status && error.response.status == 401) {
            setTimeout(() => {
              resolve(true);

              message.warning({
                content: error.response.data.message,
                duration: 3,
              });
            }, 500);
          }
        }
      });
    },
  },
});
</script>
<style>
.roles .ant-card-body {
  padding: 0;
}
.roles .ant-table-cell:nth-child(4) {
  padding-left: 10px !important;
  padding-right: 10px !important;
}
</style>
