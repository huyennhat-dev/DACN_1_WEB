<template>
  <div class="cart-drawer p-1 h-100 w-100">
    <div
      v-if="carts.length <= 0"
      class="h-100 w-100 d-flex align-items-center justify-content-center"
    >
      <a-empty :image="simpleImage" description="Chưa có sản phẩm nào!" />
    </div>
    <div v-else class="position-relative h-100">
      <div
        class="row cart-drawer-body position-relative h-100 w-100 m-0"
        :class="{ active: carts.length >= 5 }"
      >
        <div class="position-absolute top-0 p-0 ps-1">
          <div
            v-for="(item, index) in carts"
            :key="item.product._id"
            class="col-12 cart_item d-flex py-2 justify-content-between align-items-center"
            :class="{
              ' border-top': index != 0,
              active: index + 1 == carts.length,
            }"
          >
            <div class="cart_item-img brr-5 shadow-full p1">
              <img :src="item.product.photos[0]" class="brr-5" width="80" />
            </div>
            <div class="cart_item-body flex-grow-1 px-2">
              <div class="item-name text-overflow-2-lines mb-1">
                <span class="fs-small fw-bold text-black">
                  {{ item.product.name }}
                </span>
              </div>
              <div class="d-fex align-items-center mb-1">
                <span class="fs-6 fw-bold me-3">{{
                  formatPrice(
                    (item.product.price -
                      item.product.price * item.product.sale) *
                      item.quantity
                  )
                }}</span>
                <span
                  v-if="item.product.sale"
                  class="text-secondary text-decoration-line-through fst-italic fs-small"
                >
                  {{ formatPrice(item.product.price * item.quantity) }}
                </span>
              </div>
              <div class="d-flex align-items-center">
                <a-button
                  v-if="item.quantity > 1"
                  class="rounded-circle text-black"
                  style="width: 25px; height: 25px"
                  @click="decrease(item.product._id)"
                >
                  <template #icon>
                    <minus-outlined style="font-size: 10px" />
                  </template>
                </a-button>
                <a-popconfirm
                  v-else
                  title="Bạn có muốn xóa?"
                  placement="topLeft"
                  ok-text="Xóa"
                  cancel-text="Hủy"
                  @confirm="decrease(item.product._id)"
                  class="rounded-circle"
                >
                  <a-button
                    class="rounded-circle text-black"
                    style="width: 25px; height: 25px"
                  >
                    <template #icon>
                      <minus-outlined style="font-size: 10px" />
                    </template>
                  </a-button>
                </a-popconfirm>
                <a-input
                  v-model:value="item.quantity"
                  style="width: 50px; height: 25px; cursor: default !important"
                  class="text-center mx-1 text-primary bg-white"
                  type="number"
                  min="1"
                  disabled
                />
                <a-button
                  class="rounded-circle text-black"
                  style="width: 25px; height: 25px"
                  @click="increase(item.product._id)"
                >
                  <template #icon>
                    <plus-outlined style="font-size: 10px" />
                  </template>
                </a-button>
              </div>
            </div>
            <div class="delete-button">
              <a-popconfirm
                title="Bạn có muốn xóa?"
                placement="topLeft"
                ok-text="Xóa"
                cancel-text="Hủy"
                @confirm="deleteCartItem(item.product._id)"
                class="brr-5"
              >
                <a-button type="primary" ghost danger class="brr-5">
                  <template #icon>
                    <delete-outlined />
                  </template>
                </a-button>
              </a-popconfirm>
            </div>
          </div>
        </div>
      </div>
      <div
        class="row w-100 position-absolute bottom-0 cart-drawer-total pb-2 bg-white"
      >
        <div class="col-12 text-center border-top">
          <div class="my-3">
            <span class="text-black fw-medium fs-6 text-right w-100">
              Tổng tiền :
            </span>
            <span class="text-primary fw-semibold fs-6 text-right w-100">
              {{ formatPrice(totalPrice) }}
            </span>
          </div>
          <a-button class="brr-5 px-5" size="large" danger @click="checkOut">
            <template #icon>
              <shopping-outlined />
            </template>
            <span>Đặt hàng</span>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
import { useCartStore } from "../../store/cart";
import { formattedPrice } from "../../utils/formatPrice";

import {
  ShoppingOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";

export default defineComponent({
  components: {
    ShoppingOutlined,
    DeleteOutlined,
    MinusOutlined,
    PlusOutlined,
  },
  setup() {
    const carts = ref(useCartStore().getCartData);

    watch(
      () => useCartStore().carts,
      (nVal) => (carts.value = nVal)
    );

    const totalPrice = ref(useCartStore().getTotalPrice);

    watch(
      () => useCartStore().totalPrice,
      (nVal) => (totalPrice.value = nVal)
    );
    return { carts, totalPrice };
  },
  data() {
    return {
      simpleImage:
        "https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original",
    };
  },
  created() {},
  methods: {
    async increase(id) {
      await useCartStore().increase(id);
    },
    async decrease(id) {
      await useCartStore().decrease(id);
    },

    async deleteCartItem(id) {
      const res = await useCartStore().delToCart(id);
      if (res) {
        notification.success({
          description: "Xóa thành công!",
          duration: 3,
        });
      } else
        notification.warning({
          description: "Xóa không thành công, có lỗi xảy ra!",
          duration: 3,
        });
    },
    checkOut(e) {
      this.$router.push({ name: "checkout" });
      this.$emit("handleClickToggleCartDrawer");
    },
    formatPrice(price) {
      return formattedPrice(price);
    },
  },
});
</script>
<style>
.cart-drawer-body.active {
  overflow-y: scroll;
  height: auto;
}
.cart-drawer-body.active::-webkit-scrollbar {
  width: 10px;
}
.cart-drawer-body .item-name {
  height: 40px;
  align-items: center;
}

.cart-drawer .cart-drawer-total {
  left: 0;
  right: 0;
  margin: auto;
}

.cart-drawer .cart_item.active {
  margin-bottom: 115px;
}

@media (max-width: 567px) {
  .cart-drawer .ant-drawer-body {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
