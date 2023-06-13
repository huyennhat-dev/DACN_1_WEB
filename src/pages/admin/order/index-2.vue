<template>
  <a-card title="Danh sách đơn hàng" class="orders h-100">
    <div>
      <!-- Thêm thẻ div ở đây -->
      <a-table
        class="h-100"
        :dataSource="orders"
        :columns="columns"
        :scroll="{ x: 576 }"
        bordered
      >
        <template #bodyCell="{ column, index, record }">
          <template v-if="column.key == 'index'">
            <span>{{ index + 1 }}</span>
          </template>
          <template v-if="column.key == 'status'">
            <div class="d-flex justify-content-center">
              <a-button
                :class="{
                  'ant-btn-primary': record.orderStatus.slug == 'da-huy',
                  'ant-btn-dangerous':
                    record.orderStatus.slug == 'da-thanh-toan',
                }"
                ghost
                class="brr-5"
              >
                {{ record.orderStatus.name }}
              </a-button>
            </div>
          </template>
          <template v-if="column.key == 'user'">
            <span>{{ record.user.name }}</span>
            <br />
            <span>{{ record.user.phone }}</span>
            <br />
            <span>{{ record.user.address }}</span>
          </template>
          <template v-if="column.key == 'time'">
            <span>{{ formatTime(record.createdAt) }}</span>
          </template>
          <template v-if="column.key == 'productQuantity'">
            <span>{{ record.products.length }}</span>
          </template>
          <template v-if="column.key == 'totalPrice'">
            <span>{{ fomated(record.totalPrice) }}</span>
          </template>
          <template v-if="column.key == 'action'">
            <a-tooltip placement="topRight" title="Xem chi tiết">
              <router-link
                :to="{ name: 'admin-order-detail', params: { id: record._id } }"
              >
                <a-button class="" type="primary" ghost>
                  <eye-outlined />
                </a-button>
              </router-link>
            </a-tooltip>
          </template>
        </template>
      </a-table>
    </div>
    <!-- Thêm thẻ div ở đây -->
  </a-card>
</template>

<script>
import { defineComponent } from "vue";
import { BASE_URL } from "../../../configs/index.js";
import { useAdminAuthStore } from "../../../store/admin/auth.js";
import { useMenuStore } from "../../../store/menu.js";
import { EyeOutlined } from "@ant-design/icons-vue";
import { formattedPrice } from "../../../utils/formatPrice";

export default defineComponent({
  components: {
    EyeOutlined,
  },
  setup() {
    useMenuStore().onSelectedKeys(["admin-orders-2"]);
    useMenuStore().onOpenKeys(["admin-order-sub"]);
    const fomated = (price) => formattedPrice(price);

    const columns = [
      {
        title: "#",
        key: "index",
        width: 40,
      },
      {
        title: "Mã đơn",
        key: "_id",
        dataIndex: "_id",
        width: 200,
      },
      {
        title: "Trạng thái",
        key: "status",
        dataIndex: "status",
        width: 150,
        sorter: (a, b) => a.orderStatus.slug.length - b.orderStatus.slug.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Người đặt",
        key: "user",
        dataIndex: "user",
        width: 300,
      },
      {
        title: "Thời gian",
        key: "time",
        dataIndex: "time",
        width: 140,
      },
      {
        title: "Số hàng",
        key: "productQuantity",
        dataIndex: "productQuantity",
        width: 100,
        sorter: (a, b) => a.products.length - b.products.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Tổng tiền",
        key: "totalPrice",
        dataIndex: "totalPrice",
        sorter: (a, b) => a.totalPrice - b.totalPrice,
        sortDirections: ["descend", "ascend"],
        width: 120,
      },
      {
        title: "Công cụ",
        key: "action",
        fixed: "right",
        dataIndex: "action",
        width: 90,
      },
    ];

    return { columns, fomated };
  },
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    formatTime(time) {
      const mongoTime = new Date(time);
      const gmtPlus7Time = new Date(mongoTime.getTime());

      const formattedTime = `
      ${gmtPlus7Time.getHours()}:${gmtPlus7Time.getMinutes()}
      ${gmtPlus7Time.getDate()}-${
        gmtPlus7Time.getMonth() + 1
      }-${gmtPlus7Time.getFullYear()}`;
      return formattedTime;
    },
    async getOrders() {
      try {
        const res = await axios.get(`${BASE_URL}/admin/orders/orders-2`, {
          headers: {
            "x-auth-token": useAdminAuthStore().getToken,
          },
        });
        this.orders = res.data.orders;
        console.log(this.orders);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style>
.orders .ant-card-body {
  padding: 0;
}
</style>
