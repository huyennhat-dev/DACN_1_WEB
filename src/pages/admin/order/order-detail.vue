<template>
  <div class="position-relative">
    <a-card
      :title="'Chi tiết đơn hàng : ' + this.$route.params.id"
      class="order-detail h-100"
    >
      <div v-if="order != null" class="row my-4">
        <form @submit.prevent="updateOrder()">
          <div class="col-12">
            <div class="row">
              <div class="col-5">
                <div class="px-4 d-flex">
                  <p class="fs-6">Người đặt :</p>
                  <p class="fs-6 ms-2 fw-bold">{{ order.user.name }}</p>
                </div>

                <div class="px-4 d-flex">
                  <p class="fs-6">Địa chỉ :</p>
                  <p class="fs-6 ms-2 fw-bold">
                    {{ order.user.address }}
                  </p>
                </div>
                <div class="px-4 d-flex">
                  <p class="fs-6">Số điện thoại :</p>
                  <p class="fs-6 ms-2 fw-bold">{{ order.user.phone }}</p>
                </div>

                <div class="px-4 d-flex">
                  <p class="fs-6">Thời gian :</p>
                  <p class="fs-6 ms-2 fw-bold">
                    {{ formatTime(order.createdAt) }}
                  </p>
                </div>
              </div>
              <div class="col-5">
                <div class="px-4 d-flex">
                  <p class="fs-6">Tổng tiền :</p>
                  <p class="fs-6 ms-2 fw-bold">
                    {{ fomated(order.totalPrice) }}
                  </p>
                </div>
                <div class="px-4 d-flex">
                  <p class="fs-6">Trạng thái :</p>
                  <a-select
                    style="width: 200px"
                    class="ms-2 brr-5"
                    :options="orderStatus"
                    :filter-option="filterOption"
                    v-model:value="statusId"
                  />
                </div>
                <div class="px-4 w-100">
                  <a-button
                    class="brr-5"
                    ghost
                    type="primary"
                    danger
                    htmlType="submit"
                  >
                    Cập nhật
                  </a-button>
                  <a-button
                    @click="showModal"
                    class="brr-5 ms-2"
                    ghost
                    type="primary"
                  >
                    Xuất hóa đơn
                  </a-button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <a-table
          class="h-100"
          :dataSource="order.products"
          :columns="columns"
          :scroll="{ x: 576 }"
          bordered
        >
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key == 'index'">
              <span>{{ index + 1 }}</span>
            </template>
            <template v-if="column.key == 'photo'">
              <div
                class="w-100 preview-image-groups d-flex justify-content-center"
              >
                <a-image-preview-group v-if="record.product.photos.length > 0">
                  <a-image
                    v-for="(image, index) in record.product.photos"
                    :key="index"
                    :width="100"
                    :height="100"
                    :src="image"
                    class="shadow-full brr-2"
                  />
                </a-image-preview-group>

                <img
                  v-if="!record.product.photos[0]"
                  width="70"
                  class="shadow-full brr-2"
                  src="../../../assets/images/image.png"
                />
              </div>
            </template>
            <template v-if="column.key == 'name'">
              <span>{{ record.product.name }}</span>
            </template>
            <template v-if="column.key == 'price'">
              <span>{{ fomated(record.price) }}</span>
            </template>
            <template v-if="column.key == 'totalPrice'">
              <span>{{ fomated(record.price * record.quantity) }}</span>
            </template>
          </template>
        </a-table>
      </div>
    </a-card>
    <a-modal
      v-model:visible="visible"
      title="Hóa đơn"
      width="80%"
      wrap-class-name="full-modal"
      @ok="downloadPDF"
      okText="Xuất hóa đơn"
      okType="danger"
    >
      <div id="invoice">
        <the-bill :order="order"/>
      </div>
    </a-modal>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import { defineComponent, ref } from "vue";
import { BASE_URL } from "../../../configs/index.js";
import { useAdminAuthStore } from "../../../store/admin/auth.js";
import { formattedPrice } from "../../../utils/formatPrice";
import { message } from "ant-design-vue";
import TheBill from "./components/TheBill.vue";
export default defineComponent({
  components: { TheBill },
  setup() {
    const fomated = (price) => formattedPrice(price);

    const columns = [
      {
        title: "#",
        key: "index",
        width: 40,
      },
      {
        title: "Hình ảnh",
        key: "photo",
        dataIndex: "photo",
        width: 100,
      },
      {
        title: "Tên",
        key: "name",
        dataIndex: "name",
        width: 150,
      },
      {
        title: "Giá",
        key: "price",
        dataIndex: "price",
        width: 100,
      },

      {
        title: "Số lương",
        key: "quantity",
        dataIndex: "quantity",
        width: 100,
      },
      {
        title: "Tổng tiền",
        key: "totalPrice",
        dataIndex: "totalPrice",
        sorter: (a, b) => a.totalPrice - b.totalPrice,
        sortDirections: ["descend", "ascend"],
        width: 120,
      },
    ];
    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };
    return { columns, filterOption, fomated, visible, showModal };
  },
  data() {
    return {
      order: null,
      orderStatus: [],
      statusId: null,
    };
  },
  created() {
    this.setupOrderDetail();
  },
  methods: {
    async downloadPDF() {
      const element = document.getElementById("invoice");
      const options = {
        filename: `Don_Hang${this.$route.params.id}_.pdf`,
        output: "save",
        initFrom: "content",
      };
      await html2pdf().set(options).from(element).save();
    },
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
    async setupOrderDetail() {
      try {
        const rs = await axios.get(
          `${BASE_URL}/admin/orders/detail/${this.$route.params.id}`,
          {
            headers: {
              "x-auth-token": useAdminAuthStore().getToken,
            },
          }
        );
        this.orderStatus = rs.data.orderStatus;
        this.order = rs.data.order;
        this.statusId = rs.data.order.orderStatus._id;
        // this.order.user = rs.data.order.user;
        console.log(rs.data.order);
      } catch (error) {
        console.log(error);
      }
    },
    async updateOrder() {
      try {
        const rs = await axios.put(
          `${BASE_URL}/admin/orders/update/${this.$route.params.id}`,
          { orderStatus: this.statusId },
          { headers: { "x-auth-token": useAdminAuthStore().getToken } }
        );
        if (rs.status == 200) {
          message.success({
            content: "Cập nhật thành công!",
            duration: 3,
          });
          setTimeout(() => {
            this.$router.push({ name: "admin-orders-1" });
          }, 500);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style>
.order-detail .ant-card-body {
  padding: 0;
}
</style>
