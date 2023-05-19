<template>
  <form @submit.prevent="getVNPUrl()" class="h-100">
    <a-card title="Tạo mới thể loại sách" class="h-100">
      <div class="row">
        <div class="col-12">
          <div class="row mb-2 justify-content-center">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Giá tiền:</span>
              </label>
            </div>
            <div class="col-12 col-sm-6">
              <a-input
                type="number"
                min="0"
                placeholder="Giá tiền"
                v-model:value="data.amount"
                allowClear
              />
            </div>
          </div>

          <div class="row mb-2 justify-content-center">
            <div class="col-12 col-sm-3 text-start">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Phương thức thanh toán:</span>
              </label>
            </div>
            <div class="col-12 col-sm-6">
              <a-select
                show-search
                placeholder="Phương thức thanh toán"
                style="width: 100%"
                :options="bankCodes"
                :filter-option="filterOption"
                v-model:value="data.bankCode"
              />
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
            </div>
          </div>
        </div>
      </div>
    </a-card>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import { BASE_URL } from "../../../configs";
export default defineComponent({
  setup() {
    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return {
      filterOption,
    };
  },
  data() {
    return {
      data: {
        amount: "",
        bankCode: null,
        language:"vn"
      },
      bankCodes: [
        {
          value: "",
          label: "Cổng thanh toán VNPAYQR",
        },
        {
          value: "VNPAYQR",
          label: "Thanh toán qua ứng dụng hỗ trợ VNPAYQR",
        },
        {
          value: "VNBANK",
          label: "Thanh toán qua ATM-Tài khoản ngân hàng nội địa",
        },
        {
          value: "INTCARD",
          label: "Thanh toán qua thẻ quốc tế",
        },
      ],
    };
  },
  methods: {
    async getVNPUrl() {
      const res = await axios.post(`${BASE_URL}/payment/create-url`, this.data);
      console.log(res)
      if (res.status == 200) window.location.href = res.data.vnpUrl;
    },
  },
});
</script>

<style></style>
