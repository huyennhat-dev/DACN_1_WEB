<template>
  <a-card title="Danh sách tài khoản" class="users h-100">
    <a-table
      class="h-100"
      :dataSource="users"
      :columns="columns"
      :scroll="{ x: 576 }"
      bordered
    >
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.key === 'index'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-if="column.key === 'avatar'">
          <a-image
            v-if="record.photo"
            :width="70"
            :src="record.photo"
            class="shadow-full brr-2"
          />
          <img
            v-if="!record.photo"
            width="70"
            class="shadow-full brr-2"
            src="../../../assets/images/image.png"
          />
        </template>
        <template v-if="column.key === 'phone'">
          <a :href="'tel:' + record.phone">
            {{ record.phone }}
          </a>
        </template>
        <template v-if="column.key === 'status'">
          <span v-if="record.statusSlug == 'hoat-dong'" class="text-info">
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
          
          <a-tooltip placement="topRight" title="Khóa tài khoản">
            <a-popconfirm
              title="Bạn có chắc chắn khóa người dùng này!"
              @confirm="lockUser(record._id)"
              okText="Khóa"
              placement="bottomLeft"
              okType="danger"
              cancelText="Hủy"
            >
              <a-button class="" danger>
                <lock-outlined />
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
import { BASE_URL } from "../../../configs/index.js";
import { useMenuStore } from "../../../store/menu.js";
import { message } from "ant-design-vue";

import { FormOutlined, EyeOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useAdminAuthStore } from "../../../store/admin/auth";
export default defineComponent({
  components: {
    FormOutlined,
    EyeOutlined,
    LockOutlined,
  },
  setup() {
    useMenuStore().onSelectedKeys(["admin-list-user"]);
    useMenuStore().onOpenKeys(["admin-users-sub"]);
  },
  data() {
    return {
      users: [],
      columns: [
        {
          title: "#",
          key: "index",
          width: 40,
        },
        {
          title: "Hình ảnh",
          dataIndex: "avatar",
          key: "avatar",
          width: 100,
        },
        {
          title: "Họ và Tên",
          dataIndex: "name",
          key: "name",
          width: 190,
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          width: 220,

          sorter: (a, b) => a.email.length - b.email.length,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Điện thoại",
          dataIndex: "phone",
          key: "phone",
          width: 110,
        },
        {
          title: "Tình trạng",
          dataIndex: "status",
          key: "status",
          width: 120,
          sorter: (a, b) => a.status.length - b.status.length,
          sortDirections: ["descend", "ascend"],
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
    document.title = "Danh sách người dùng";
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const res = await axios.get(`${BASE_URL}/admin/user/users`, {
          headers: {
            "x-auth-token": useAdminAuthStore().getToken,
          },
        });
        this.users = res.data.users;
      } catch (error) {
        console.log(error);
      }
    },
    async lockUser(id) {
      return new Promise(async (resolve) => {
        try {
          const res = await axios.put(
            `${BASE_URL}/admin/user/lock/${id}`,
            { headers: { "x-auth-token": useAdminAuthStore().getToken } }
          );
          if (res.status == 200) {
            setTimeout(() => {
              resolve(true);
              const index = this.users.findIndex((user) => user._id === id);
              if (index !== -1) {
                this.users.splice(index, 1);
                message.success({
                  content: "Khóa tài khoản thành công!",
                  duration: 3,
                });
              }
            }, 500);
          }
        } catch (error) {
          console.log(error);
        }
      });
    },
  },
});
</script>

<style>
.users .ant-card-body {
  padding: 0;
}

.users .ant-image-mask-info {
  font-size: 12px;
}
.users .ant-table-cell:nth-child(8) {
  padding-left: 10px !important;
  padding-right: 10px !important;
}
</style>
