<template>
  <div class="main container" style="">
    <div class="row order">
      <div class="col-12 py-4 h-100 w-100">
        <div class="brr-10 bg-white h-100 w-100 p-3">
          <div class="order-header">
            <span class="fs-5 fw-bold text-black"> Danh sách đơn hàng </span>
          </div>
          <a-tabs v-model:activeKey="activeKey" size="large">
            <a-tab-pane
              v-for="pane of panes"
              class="p-2"
              :key="pane.key"
              :tab="pane.title"
            >
              <div
                class="brr-5 shadow-full mb-3 p-2"
                v-for="(item, index) of pane.content"
                :key="index"
              >
                <div
                  class="item-header w-100 px-3 py-2 d-flex justify-content-between border-bottom"
                >
                  <div class="border-1 border px-2 brr-5">
                    {{ index + 1 }}
                  </div>
                  <span class="fs-6 fw-medium textblack">
                    {{ formatTime(item.createdAt) }}
                  </span>
                </div>
                <div
                  class="item-body row d-flex"
                  :class="{ active: activeIndex == index }"
                >
                  <div class="col-12 col-sm-8">
                    <div
                      v-for="(pro, index) of item.item"
                      :key="pro.product._id"
                      class="col-12 px-4 py-1 d-flex position-relative"
                      :class="{ 'border-top': index > 0 }"
                    >
                      <div class="item-image brr-2 border" style="padding: 1px">
                        <img
                          :src="pro.product.photos[0]"
                          class="brr-2"
                          width="70"
                        />
                      </div>
                      <div class="ms-2">
                        <span class="fs-small fw-bold text-black">
                          {{ pro.product.name }}
                        </span>

                        <div class="d-flex">
                          <span class="fs-small fw-medium text-black">
                            Giá tiền :
                          </span>
                          <span class="ms-1 fs-small fw-medium text-primary">
                            {{ fomated(pro.price) }}
                          </span>
                        </div>
                        <div class="d-flex">
                          <span class="fs-small fw-medium text-black">
                            Số lượng :
                          </span>
                          <span class="ms-1 fs-small fw-medium text-primary">
                            {{ pro.quantity }}
                          </span>
                        </div>
                      </div>
                      <div
                        v-if="pane.key == 'da-nhan-hang'"
                        class="position-absolute my-2"
                        style="right: 0; top: 15px"
                      >
                        <a-button
                          type="primary"
                          danger
                          ghost
                          class="brr-5"
                          @click="vote(item.id)"
                        >
                          Đánh giá
                        </a-button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-12 col-sm-4 d-flex align-items-center justify-content-center"
                  >
                    <div class="row">
                      <div class="col-12 w-100 text-center">
                        <span class="fs-6 fw-medium text-secondary-emphasis">
                          <dollar-outlined /> Tổng tiền
                        </span>
                      </div>
                      <div class="col-12 w-100 text-center">
                        <span class="fs-5 fw-medium text-primary">
                          {{ fomated(item.totalPrice) }}</span
                        >
                      </div>
                      <div
                        v-if="pane.key == 'dang-van-chuyen'"
                        class="col-12 w-100 text-center my-2"
                      >
                        <a-button
                          type="primary"
                          danger
                          ghost
                          class="brr-5"
                          @click="receive(item.id)"
                        >
                          Đã nhận hàng
                        </a-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { BASE_URL } from "../../../configs";
import { useAuthStore } from "../../../store/auth";
import { formattedPrice } from "../../../utils/formatPrice";
import { DollarOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

export default defineComponent({
  components: {
    DollarOutlined,
  },
  setup() {
    return {};
  },
  data() {
    return {
      panes: [],
      activeKey: "",
      activeIndex: null,
    };
  },
  created() {
    this.getAllData();
  },
  methods: {
    viewMore(index) {
      this.activeIndex = index;
    },
    fomated(price) {
      if (price) return formattedPrice(price);
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
    async getAllData() {
      try {
        const res = await axios.get(`${BASE_URL}/home/order/user-order`, {
          headers: { "x-auth-token": useAuthStore().getToken },
        });
        console.log(res.data);
        if (res.status == 200) {
          for (const tab of res.data.orderStatus) {
            const data = {
              title: tab.name,
              content: [],
              key: tab.slug,
            };
            this.panes.push(data);
          }
          this.activeKey = this.panes[0].key;
          for (const order of res.data.orders) {
            const items = [];
            for (const pro of order.products) items.push(pro);

            const data = {
              id: order._id,
              item: items,
              totalPrice: order.totalPrice,
              createdAt: order.createdAt,
            };

            for (const tab of this.panes) {
              if (order.orderStatus.slug == tab.key) {
                tab.content.push(data);
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async receive(id) {
      try {
        await axios.put(
          `${BASE_URL}/admin/orders/update/${id}`,
          { orderStatus: "da-nhan-hang" },
          { headers: { "x-auth-token": useAuthStore().getToken } }
        );
        message.success({
          content: "Cập nhật thành công!",
          duration: 3,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style>
.ant-tabs-large > .ant-tabs-nav .ant-tabs-tab.ant-tabs-tab-active {
  border-bottom: 2px solid red !important;
}
</style>
