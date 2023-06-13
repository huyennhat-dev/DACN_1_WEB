<template>
  <div class="main container detail" style="">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12 py-4">
            <div class="px-3 py-5 bg-white brr-10">
              <div class="row justify-content-center">
                <div class="col-12 col-sm-10">
                  <div class="row">
                    <div
                      class="col-12 col-sm-4 d-flex justify-content-center align-items-center"
                    >
                      <div
                        class="position-relative rounded-circle p-1 border-3 border border-secondary"
                      >
                        <img
                          class="rounded-circle w-100"
                          :src="
                            photo ??
                            'https://res.cloudinary.com/huyennhat/image/upload/v1686667560/image_tlxum4.png'
                          "
                        />
                        <div
                          @click="toggleShow"
                          style="right: 20px; cursor: pointer"
                          class="position-absolute bottom-0 rounded-circle p-2 bg-primary"
                        >
                          <camera-filled class="fs-2 text-white" />
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-12 col-sm-8 border-none border-sm-left border-secondary px-5"
                    >
                      <div class="row mb-2">
                        <div class="col-12 mb-1">
                          <label for="">
                            <span class="text-danger me-1">*</span>
                            <span>Tên của bạn</span>
                          </label>
                        </div>
                        <div class="col-12 mb-">
                          <a-input
                            allowClear
                            placeholder="Tên của bạn"
                            v-model:value="name"
                            :class="{ 'input-danger': errors.name }"
                          />
                          <div class="w-100"></div>
                          <small v-if="errors.name" class="text-danger">
                            {{ errors.name }}
                          </small>
                        </div>
                      </div>
                      <div class="row mb-2">
                        <div class="col-12 mb-1">
                          <label for="">
                            <span class="text-danger me-1">*</span>
                            <span>Email</span>
                          </label>
                        </div>
                        <div class="col-12 mb-">
                          <a-input
                            allowClear
                            type="number"
                            disabled
                            placeholder="Email"
                            v-model:value="email"
                          />
                        </div>
                      </div>
                      <div class="row mb-2">
                        <div class="col-12 mb-1">
                          <label for="">
                            <span class="text-danger me-1">*</span>
                            <span>Số điện thoại</span>
                          </label>
                        </div>
                        <div class="col-12 mb-">
                          <a-input
                            allowClear
                            type="number"
                            placeholder="Số điện thoại"
                            v-model:value="phone"
                            :class="{ 'input-danger': errors.phone }"
                          />
                          <div class="w-100"></div>
                          <small v-if="errors.phone" class="text-danger">
                            {{ errors.phone }}
                          </small>
                        </div>
                      </div>
                      <div class="row mb-2">
                        <div class="col-12 mb-1">
                          <label for="">
                            <span class="text-danger me-1">*</span>
                            <span>Địa chỉ</span>
                          </label>
                        </div>
                        <div class="col-12 mb-">
                          <a-input
                            allowClear
                            placeholder="Địa chỉ"
                            v-model:value="address"
                            :class="{ 'input-danger': errors.address }"
                          />
                          <div class="w-100"></div>
                          <small v-if="errors.address" class="text-danger">
                            {{ errors.address }}
                          </small>
                        </div>
                      </div>
                      <div class="row my-4">
                        <div class="col-12 mb-">
                          <a-button type="primary" class="brr-5" ghost>
                            Cập nhật
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
      </div>
    </div>
    <my-upload
      field="img"
      @crop-success="cropSuccess"
      v-model="show"
      :width="400"
      :height="400"
      img-format="png"
      :maxSize="2048"
      langType="vi"
      :langExt="langExt"
      :withCredentials="true"
    />
  </div>
</template>

<script>
import MyUpload from "vue-image-crop-upload";
import { defineComponent, reactive } from "vue";

import { CameraFilled } from "@ant-design/icons-vue";
import { useAuthStore } from "../../../store/auth";
export default {
  components: {
    CameraFilled,
    MyUpload,
  },
  setup() {
    const langExt = reactive({
      hint: "Nhấp hoặc kéo tệp vào đây để tải lên",
      preview: "Preview",
      error: {
        onlyImg: "Chỉ chọn hình ảnh",
        outOfSize: "Kích thước ảnh cho phép tối đa: ",
        lowestPx: "Kích thước của hình ảnh quá thấp. Dự kiến ít nhất: ",
      },
    });
    return { langExt };
  },
  data() {
    return {
      show: false,
      photo: null,
      name: null,
      phone: null,
      address: null,
      email: null,
      errors: {
        name: null,
        phone: null,
        address: null,
      },
    };
  },

  created() {
    this.setUserInfor();
  },
  methods: {
    setUserInfor() {
      const user = useAuthStore().getUser;
      if (!user) return this.$router.push({ name: "index" });
      this.name = user.name;
      this.photo = user.photo;
      this.phone = user.phone;
      this.email = user.email;
      this.address = user.address;
    },
    toggleShow() {
      this.show = !this.show;
    },

    cropSuccess(val) {
      this.photo = val;
    },
  },
};
</script>

<style></style>
