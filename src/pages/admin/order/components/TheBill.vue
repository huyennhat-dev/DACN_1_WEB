<template>
  <div class="row">
    <div class="col-12 p-5">
      <div class="border border-black p-5">
        <div class="row border-bottom py-3">
          <div
            class="col-6 text-center d-flex align-items-center justify-content-center"
          >
            <div class="mb-3">
              <img
                src="../../../../assets/images/logo.png"
                alt=""
                width="200"
              />
            </div>
          </div>
          <div class="col-6 text-center">
            <div id="barcode" class="">
              <canvas style="max-width: 90%" ref="barcodeCanvas"></canvas>
            </div>
            <div class="d-flex ps-2 justify-content-center">
              <!-- <p class="fs-6 text-black fw-semibold">Mã đơn hàng:</p> -->
              <p class="ms-2 fs-6 text-black fw-semibold text-uppercase">
                {{ this.order._id }}
              </p>
            </div>
          </div>
        </div>
        <div class="row border-bottom py-3">
          <div class="col-6">
            <p class="mb-1 fs-6 text-black fw-semibold">Từ:</p>
            <p class="mb-1 fs-6 text-black fw-medium">Metruyenchu.vn</p>
            <p class="mb-1 fs-6 text-black fw-medium">
              Đ/c : 470 Trần Đại Nghĩa, P.Hòa Hải, Q.Ngũ Hành Sơn, TP.Đà Nẵng
            </p>
          </div>
          <div class="col-6">
            <p class="mb-1 fs-6 text-black fw-semibold">Đến:</p>
            <p class="mb-1 fs-6 text-black fw-medium">
              Anh/Chị : {{ this.order.user.name }}
            </p>
            <p class="mb-1 fs-6 text-black fw-medium">
              Sđt : {{ this.order.user.phone }}
            </p>
            <p class="mb-1 fs-6 text-black fw-medium">
              Đ/c : {{ this.order.user.address }}
            </p>
          </div>
        </div>
        <div
          class="row border-bottom py-3 position-relative overflow-y-scroll"
          style="min-height: 400px; max-height: 400px"
        >
          <div class="col-12">
            <p class="mb-1 fs-6 text-black fw-semibold">
              Nội dung đơn hàng (Tổng SL sản phẩm :
              {{ this.order.products.length }})
            </p>
            <div
              v-for="(pro, index) of this.order.products"
              :key="pro._id"
              class="d-flex my-2"
            >
              <p class="fs-6 text-black fw-bold">{{ index + 1 }}</p>
              <p class="ms-2 fs-6 text-black fw-medium">
                {{ pro.product.name }}
              </p>
              <p class="ms-2 fs-6 text-black fw-medium">
                Số lượng : {{ pro.quantity }}
              </p>
            </div>
          </div>
          <div class="col-12 position-absolute bottom-0">
            <p class="mb-1 fs-6 text-black fw-medium fst-italic">
              Một số sản phẩm có thể bị ẩn do danh sách quá dài
            </p>
          </div>
        </div>
        <div class="row py-3">
          <div class="col-6 text-center">
            <p class="mb-1 fs-6 text-black fw-semibold">Tổng tiền</p>
            <p class="mb-1 fs-4 text-black fw-bold">{{ fomated(this.order.totalPrice) }}</p>
          </div>
          <div class="col-6 text-center">
            <p class="mb-1 fs-6 text-black fw-semibold">
              Xác nhận của cửa hàng
            </p>
            <div>
              <img
                src="../../../../assets/images/logo.png"
                alt=""
                width="150"
              />
            </div>
            <p class="mb-1 fs-5 text-black fw-semibold fst-italic">
              metruyenchu.vn
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JsBarcode from "jsbarcode";
import { formattedPrice } from "../../../../utils/formatPrice";

export default {
  setup() {
    const fomated = (price) => formattedPrice(price);
    return { fomated };
  },
  mounted() {
    const barcodeValue = this.order._id;
    JsBarcode(this.$refs.barcodeCanvas, barcodeValue, {
      format: "CODE128",
      displayValue: false,
    });
  },
  props: {
    order: Object,
  },
};
</script>

<style></style>
