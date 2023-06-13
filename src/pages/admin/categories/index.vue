<template>
  <a-card title="Danh sách thể loại" class="roles h-100">
    <a-table
      class="h-100"
      :dataSource="categories"
      :columns="columns"
      :scroll="{ x: 576 }"
      bordered
    >
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.key === 'index'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-if="column.key === 'status'">
          <span v-if="record.statusSlug == 'hoat-dong'" class="text-primary">
            {{ record.status }}
          </span>
          <span v-else-if="record.statusSlug == 'tam-khoa'" class="text-danger">
            {{ record.status }}
          </span>
        </template>
        <template v-if="column.key === 'action'">
          <a-tooltip placement="topRight" title="Xem chi tiết">
            <a-button class="me-0 me-sm-1 mb-1 mb-sm-1">
              <eye-outlined />
            </a-button>
          </a-tooltip>
          <a-tooltip placement="topRight" title="Chỉnh sửa">
            <router-link
              :to="{
                name: 'admin-edit-categories',
                params: { id: record._id },
              }"
            >
              <a-button class="me-0 me-sm-1 mb-1 mb-sm-1" type="primary" ghost>
                <form-outlined />
              </a-button>
            </router-link>
          </a-tooltip>
          <a-tooltip placement="topRight" title="Xóa thể loại">
            <a-popconfirm
              title="Bạn có chắc chắn xóa thể loại này!"
              @confirm="deleteCategories(record._id)"
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
import { useMenuStore } from "../../../store/menu.js";
import { BASE_URL } from "../../../configs/index.js";
import { message } from "ant-design-vue";
import {
  FormOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { useAdminAuthStore } from "../../../store/admin/auth.js";

export default defineComponent({
  components: {
    FormOutlined,
    EyeOutlined,
    DeleteOutlined,
  },
  setup() {
    useMenuStore().onSelectedKeys(["admin-list-categories"]);
    useMenuStore().onOpenKeys(["admin-categories-sub"]);
  },
  data() {
    return {
      categories: [],
      columns: [
        {
          title: "#",
          key: "index",
          width: 40,
        },
        {
          title: "Vai trò",
          dataIndex: "name",
          key: "categories",
          width: 200,
        },
        {
          title: "Đường dẫn",
          dataIndex: "slug",
          key: "slug",
          width: 200,
        },
        {
          title: "Trạng thái",
          dataIndex: "status",
          key: "status",
          width: 200,
        },
        {
          title: "Công cụ",
          key: "action",
          width: 70,
          fixed: "right",
        },
      ],
    };
  },
  created() {
    document.title = "Danh sách thể loại";
    this.getCategories();
  },
  methods: {
    async getCategories() {
      try {
        const res = await axios.get(`${BASE_URL}/admin/categories`, {
          headers: {
            "x-auth-token": useAdminAuthStore().getToken,
          },
        });
        this.categories = res.data.categories;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCategories(id) {
      return new Promise(async (resolve) => {
        try {
          const res = await axios.delete(
            `${BASE_URL}/admin/categories/delete/${id}`,
            {
              headers: {
                "x-auth-token": useAdminAuthStore().getToken,
              },
            }
          );

          if (res.status == 200) {
            setTimeout(() => {
              resolve(true);
              const index = this.categories.findIndex(
                (cate) => cate._id === id
              );
              if (index !== -1) {
                this.categories.splice(index, 1);
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
.categories .ant-card-body {
  padding: 0;
}
.categories .ant-table-cell:nth-child(5) {
  padding-left: 10px !important;
  padding-right: 10px !important;
}
</style>
