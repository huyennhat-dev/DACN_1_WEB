<template>
  <div class="main container">
    <div class="row">
      <div class="col-12 py-3 py-sm-4 w-100">
        <div class="row w-100 p-0 p-sm-4 m-0 px-0 px-sm-5">
          <div class="bg-white brr-10 w-100 px-sm-5 px-3">
            <div class="checkout-header d-none d-sm-block col-12 pt-3 px-1">
              <div class="row">
                <div class="col-5">
                  <span class="fw-medium fs-6 text-black">Sản phẩm</span>
                </div>
                <div class="col-2">
                  <span class="fw-medium fs-6 text-secondary">Đơn giá</span>
                </div>
                <div
                  class="col-2 d-flex align-items-center justify-content-center"
                >
                  <span class="fw-medium fs-6 text-secondary">Số lượng</span>
                </div>
                <div
                  class="col-2 d-flex align-items-center justify-content-center"
                >
                  <span class="fw-medium fs-6 text-secondary">Thành tiền</span>
                </div>
                <div
                  class="col-1 d-flex align-items-center justify-content-center"
                >
                  <span class="fw-medium fs-6 text-secondary">Thao tác</span>
                </div>
              </div>
            </div>
            <div class="py-sm-3 p-0">
              <div
                v-for="(item, index) of carts"
                :key="item.product._id"
                class="checkout-item d-none d-sm-block col-12 py-3 px-1"
                :class="{ 'border-top': index != 0 }"
              >
                <div class="row">
                  <div class="col-5 col-auto d-flex align-items-center">
                    <div class="image brr-2 shadow-full me-3">
                      <img
                        :src="item.product.photos[0]"
                        class="brr-2"
                        width="90"
                        alt=""
                      />
                    </div>
                    <div class="item-body">
                      <div class="item-name text-overflow-2-lines mb-1">
                        <span class="fs-small fw-bold text-black">
                          {{ item.product.name }}
                        </span>
                      </div>
                      <div class="item-name text-overflow-2-lines mb-1">
                        <span class="fs-small fw-medium text-black">
                          Tác giả :
                        </span>
                        <span class="fs-small fst-italic fw-medium text-info">
                          {{ item.product.author }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-2 d-flex align-items-center">
                    <span class="fs-small fw-medium text-secondary">
                      {{
                        formatPrice(
                          item.product.price -
                            item.product.price * item.product.sale
                        )
                      }}
                    </span>
                  </div>
                  <div
                    class="col-2 d-flex align-items-center justify-content-center"
                  >
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
                      style="
                        width: 50px;
                        height: 25px;
                        cursor: default !important;
                      "
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
                  <div
                    class="col-2 d-flex align-items-center justify-content-center"
                  >
                    <span class="fs-small fw-medium text-secondary">
                      {{
                        formatPrice(
                          (item.product.price -
                            item.product.price * item.product.sale) *
                            item.quantity
                        )
                      }}
                    </span>
                  </div>
                  <div
                    class="col-1 d-flex align-items-center justify-content-center"
                  >
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
              <div
                v-for="(item, index) of carts"
                :key="item.product._id"
                class="col-12 d-block d-sm-none cart_item d-flex py-2 justify-content-between align-items-center"
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
                      style="
                        width: 50px;
                        height: 25px;
                        cursor: default !important;
                      "
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
          <div class="bg-white brr-10 w-100 px-3 px-sm-5 py-3 mt-3">
            <div>
              <div class="row">
                <div class="col-12 col-sm-8 mb-sm-0 mb-2">
                  <span class="fs-6 fw-medium text-black">
                    Địa chỉ nhận hàng
                  </span>
                </div>
                <div v-if="user == null">
                  <div class="col-12">
                    <span class="fs-small fw-medium text-secondary">
                      {{ user.name }}
                    </span>
                  </div>
                  <div class="col-12">
                    <span class="fs-small fw-medium text-secondary">
                      {{ user.phone }}
                    </span>
                  </div>
                  <div class="col-12">
                    <span
                      class="fs-small fw-bold text-decoration-underline text-secondary"
                    >
                      {{ user.address }}
                    </span>
                  </div>
                </div>
                <div v-else>
                  <div 
                  @click="this.$router.push({name:'account'})"
                  class="col-12 mt-2" style="cursor: pointer;">
                    <span
                      class="fs-small text-decoration-underline fw-medium fst-italic text-secondary"
                    >
                      Địa chỉ nhận hàng của bạn trống <edit-outlined class="ms-2 fs-6 text-black"/>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white brr-10 w-100 px-3 px-sm-5 py-3 mt-3">
            <div class="payment-method">
              <div class="row border-bottom pb-3">
                <div class="col-12 col-sm-8 mb-sm-0 mb-2">
                  <span class="fs-6 fw-medium text-black">
                    Phương thức thanh toán
                  </span>
                </div>
                <div class="col-12 col-sm-4">
                  <a-select
                    class="w-100"
                    v-model:value="order.paymentMethods"
                    placeholder="Chọn phương thức thanh toán"
                    :options="paymentMethodCodes"
                  ></a-select>
                  <div class="w-100"></div>
                  <small v-if="errors.paymentMethods" class="text-danger">
                    {{ errors.paymentMethods }}
                  </small>
                </div>
              </div>
              <div class="row my-3">
                <div class="col-8 d-none d-sm-block"></div>
                <div class="col-12 col-sm-4">
                  <div class="row mb-2">
                    <div class="col-6">
                      <span class="fs-small fw-medium text-secondary">
                        Tổng tiền hàng :
                      </span>
                    </div>
                    <div class="col-6">
                      <span class="fs-small fw-medium text-secondary">
                        {{ formatPrice(totalPrice) }}
                      </span>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-6">
                      <span class="fs-small fw-medium text-secondary">
                        Phí vận chuyển :
                      </span>
                    </div>
                    <div class="col-6">
                      <span class="fs-small fw-medium text-secondary">
                        {{ formatPrice(order.transportFee) }}
                      </span>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-6">
                      <span class="fs-small fw-medium text-secondary">
                        Tổng thanh toán :
                      </span>
                    </div>
                    <div class="col-6">
                      <span class="fs-small fw-medium text-secondary">
                        {{ formatPrice(totalPrice + order.transportFee) }}
                      </span>
                    </div>
                  </div>
                  <div class="w-75 mt-4 m-auto">
                    <a-button
                      class="pe-4 w-100 brr-5"
                      size="large"
                      danger
                      @click="checkOut"
                    >
                      <template #icon>
                        <shopping-outlined />
                      </template>
                      Thanh toán
                    </a-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useCartStore } from "../../../store/cart";
import { formattedPrice } from "../../../utils/formatPrice";
import { notification } from "ant-design-vue";
import {
  PlusOutlined,
  MinusOutlined,
  ShoppingOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import { BASE_URL } from "../../../configs";
import { useAuthStore } from "../../../store/auth";
export default defineComponent({
  components: {
    ShoppingOutlined,
    PlusOutlined,
    MinusOutlined,
    DeleteOutlined,
    EditOutlined,
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
    const paymentMethodCodes = ref([
      {
        value: "COD",
        label: "Thanh toán khi nhận hàng",
      },
      {
        value: "VNP",
        label: "Cổng thanh toán VNPAYQR",
      },
    ]);
    return {
      carts,
      totalPrice,
      paymentMethodCodes,
      focus,
    };
  },
  data() {
    return {
      order: {
        paymentMethods: null,
        transportFee: 0,
      },
      user: null,
      errors: {
        paymentMethods: "",
      },
    };
  },
  created() {
    this.checkLogin();
    this.setUserInfo();
  },
  methods: {
    checkLogin() {
      const user = useAuthStore().getUser;
      if (!user) return this.$router.push({ name: "index" });
    },
    setUserInfo() {
      this.user = useAuthStore().getUser;
    },
    validate() {
      this.errors.paymentMethods = "";

      let inValid = true;
      if (!this.order.paymentMethods) {
        this.errors.paymentMethods = "Vui lòng chọn phương thức thanh toán!";
        inValid = false;
      }
      return inValid;
    },
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

    formatPrice(price) {
      return formattedPrice(price);
    },

    async checkOut() {
      try {
        if (this.validate()) {
          switch (this.order.paymentMethods) {
            case "COD":
              this.codMethod();
              break;
            case "VNP":
              this.vnpayMethod();
              break;
            default:
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async vnpayMethod() {
      try {
        const products = [];
        for (const item of this.carts) {
          const data = {
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price - item.product.price * item.product.sale,
          };
          products.push(data);
        }

        const res = await axios.post(
          `${BASE_URL}/home/order/create-url`,
          {
            products,
            totalPrice: this.totalPrice,
            paymentMethod: this.order.paymentMethods,
          },
          { headers: { "x-auth-token": useAuthStore().getToken } }
        );
        if (res.status == 200) window.location.href = res.data.vnpUrl;
      } catch (error) {
        console.log(error);
      }
    },
    async codMethod() {
      notification.error({
        description: "Hiẹn tại shop không hỗ trợ phương thức thanh toán này!",
        duration: 3,
      });
    },
  },
});
</script>

<style></style>
