<template>
  <form @submit.prevent="createProduct()" class="product h-100">
    <a-card title="Thêm sách mới" class="h-100">
      <div class="row">
        <div class="col-12 col-sm-6">
          <div class="row mb-2">
            <div class="col-12 mb-1">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Hình ảnh</span>
              </label>
            </div>
            <div class="col-12 preview-image-groups d-flex mb-1 flex-wrap">
              <a-image-preview-group v-if="product.photos.length > 0">
                <div
                  v-for="(image, index) in product.photos"
                  :key="index"
                  class="image-container"
                >
                  <a-image
                    :src="image"
                    :width="100"
                    :height="100"
                    class="brr-2 d-block shadow-full"
                  />

                  <div @click="removeImage(index)" class="btn-image-close">
                    <close-circle-outlined :style="{ color: '#d0011b' }" />
                  </div>
                </div>
              </a-image-preview-group>
              <div
                v-if="product.photos.length < 10"
                @click="toggleShow"
                class="choose-image shadow-full brr-2"
              >
                <div class="select-file brr-2"></div>
                <div class="choose-image-mask brr-2"></div>
                <div
                  class="row justify-content-center m-0 brr-2 position-absolute top-0 bottom-0"
                >
                  <div
                    class="col-12 m-0 d-flex align-items-end pb-2 justify-content-center"
                  >
                    <span>Chọn ảnh</span>
                  </div>
                  <div class="col-12 m-0 text-center">
                    <plus-circle-outlined class="choose-image-icon" />
                  </div>
                </div>
              </div>
              <div>
                <a-image
                  v-if="product.photos.length == 10"
                  :src="product.photos[4]"
                  :width="100"
                  :height="100"
                  class="brr-2 d-block shadow-full xc"
                />
              </div>
            </div>
            <div class="w-100"></div>
            <small v-if="errors.photos" class="text-danger">
              {{ errors.photos }}
            </small>
            <div
              v-if="product.photos.length > 0"
              class="col-12 fst-italic text-secondary"
            >
              <span> Chỉ được chọn tối đa 10 hình ảnh. Đã chọn </span>
              <span class="text-danger fw-bolder">{{ cropKey - 1 }} </span>
              <span> ảnh</span>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 mb-1">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Tên sách</span>
              </label>
            </div>
            <div class="col-12 mb-">
              <a-input
                placeholder="Tên sách"
                v-model:value="product.name"
                allowClear
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
                <span>Tên tác giả</span>
              </label>
            </div>
            <div class="col-12 mb-">
              <a-input
                placeholder="Tên tác giả"
                v-model:value="product.author"
                allowClear
                :class="{ 'input-danger': errors.author }"
              />
              <div class="w-100"></div>
              <small v-if="errors.author" class="text-danger">
                {{ errors.author }}
              </small>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 mb-1">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Thể loại sách</span>
              </label>
            </div>
            <div class="col-12 mb-1">
              <a-select
                show-search
                placeholder="Thể loại sách"
                style="width: 100%"
                :options="categories"
                :filter-option="filterOption"
                v-model:value="product.categories"
                :class="{ 'input-danger': errors.categories }"
              />
              <div class="w-100"></div>
              <small v-if="errors.categories" class="text-danger">
                {{ errors.categories }}
              </small>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 mb-1">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Giá bán</span>
              </label>
            </div>
            <div class="col-12 mb-">
              <a-input
                placeholder="Giá bán"
                v-model:value="product.price"
                allowClear
                type="number"
                :class="{ 'input-danger': errors.price }"
              />
              <div class="w-100"></div>
              <small v-if="errors.price" class="text-danger">
                {{ errors.price }}
              </small>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 mb-1">
              <label for="">
                <span class="text-danger me-2"></span>
                <span>Giảm giá</span>
              </label>
            </div>
            <div class="col-12 mb-">
              <a-input
                placeholder="Giảm giá"
                v-model:value="product.sale"
                allowClear
                type="number"
              />
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 mb-1">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Số lượng thêm</span>
              </label>
            </div>
            <div class="col-12 mb-">
              <a-input
                allowClear
                type="number"
                placeholder="Số lượng thêm"
                v-model:value="product.quantity"
                :class="{ 'input-danger': errors.quantity }"
              />
              <div class="w-100"></div>
              <small v-if="errors.quantity" class="text-danger">
                {{ errors.quantity }}
              </small>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12 mb-1">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Trạng thái sách</span>
              </label>
            </div>
            <div class="col-12 mb-1">
              <a-select
                show-search
                placeholder="Trạng thái sách"
                style="width: 100%"
                :options="status"
                :filter-option="filterOption"
                v-model:value="product.status"
                :class="{ 'input-danger': errors.status }"
              />
              <div class="w-100"></div>
              <small v-if="errors.status" class="text-danger">
                {{ errors.status }}
              </small>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="row mb-2">
            <div class="col-12 mb-1">
              <label for="">
                <span class="text-danger me-1">*</span>
                <span>Mô tả</span>
              </label>
            </div>
            <div class="col-12 mb-1">
              <ckeditor
                :editor="editor"
                v-model="product.description"
                :config="editorConfig"
              />
              <div class="w-100"></div>
              <small v-if="errors.description" class="text-danger">
                {{ errors.description }}
              </small>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 d-grid d-sm-flex justify-content-sm-end">
          <a-button htmlType="submit" type="primary" class="me-0 mb-2 mb-sm-0">
            <span>Lưu</span>
          </a-button>

          <a-button
            type="primary"
            danger
            ghost
            class="ms-sm-2"
            @click="clearForm"
          >
            <span>Hủy</span>
          </a-button>
        </div>
      </div>
    </a-card>
    <my-upload
      :key="cropKey"
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
  </form>
</template>

<script>
import { defineComponent, reactive } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import MyUpload from "vue-image-crop-upload";
import { useMenuStore } from "../../../store/menu.js";
import { message } from "ant-design-vue";

import {
  FileImageOutlined,
  LeftOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons-vue";
import { BASE_URL } from "../../../configs/index.js";
import { useAdminAuthStore } from "../../../store/admin/auth.js";
const key = "createProduct";
export default defineComponent({
  components: {
    MyUpload,
    FileImageOutlined,
    PlusCircleOutlined,
    LeftOutlined,
    CloseCircleOutlined,

    ckeditor: CKEditor.component,
  },
  setup() {
    useMenuStore().onSelectedKeys(["admin-create-product"]);
    useMenuStore().onOpenKeys(["admin-product-sub"]);

    const langExt = reactive({
      hint: "Nhấp hoặc kéo tệp vào đây để tải lên",
      preview: "Preview",
      error: {
        onlyImg: "Chỉ chọn hình ảnh",
        outOfSize: "Kích thước ảnh cho phép tối đa: ",
        lowestPx: "Kích thước của hình ảnh quá thấp. Dự kiến ít nhất: ",
      },
    });

    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    return { langExt, filterOption };
  },
  data() {
    return {
      cropKey: 1,
      show: false,
      editor: ClassicEditor,
      editorConfig: {
        height: "500px",
      },
      product: {
        name: "",
        photos: [],
        author: "",
        price: "",
        sale: "",
        quantity: "",
        description: "",
        categories: null,
        status: null,
      },
      categories: [],
      status: [],
      errors: {
        name: "",
        photos: "",
        author: "",
        price: "",
        quantity: "",
        description: "",
        categories: "",
        status: "",
      },
    };
  },

  created() {
    document.title = "Thêm mới sách";
    this.setupCreate();
  },
  methods: {
    removeImage(i) {
      this.product.photos.splice(i, 1);
    },
    async setupCreate() {
      try {
        const res = await axios.get(`${BASE_URL}/admin/product/create`, {
          headers: { "x-auth-token": useAdminAuthStore().getToken },
        });
        this.status = res.data.data.status;
        this.categories = res.data.data.categories;
      } catch (error) {
        console.log(error);
      }
    },
    validate() {
      let inValid = true;

      if (!this.product.name) {
        this.errors.name = "Tên sách không thể bỏ trống!";
        inValid = false;
      } else if (
        this.product.name.length < 4 ||
        this.product.name.length > 5000
      ) {
        this.errors.name = "Độ dài tên sách không hợp lệ!";
        inValid = false;
      }

      if (this.product.photos.length < 1) {
        this.errors.photos = "Tối thiểu phải chọn 1 hình ảnh!";
        inValid = false;
      } else if (this.product.photos.length > 10) {
        this.errors.photos = "Tối đa chỉ được chọn 10 hình ảnh!";
        inValid = false;
      }

      if (!this.product.author) {
        this.errors.author = "Tên tác giả không thể bỏ trống!";
        inValid = false;
      } else if (
        this.product.author.length < 4 ||
        this.product.author.length > 100
      ) {
        this.errors.author = "Độ dài tên tác giả không hợp lệ!";
        inValid = false;
      }

      if (this.product.price < 1) {
        this.errors.price = "Giá thấp nhất không thể bằng 0";
        inValid = false;
      }

      if (this.product.quantity < 1) {
        this.errors.quantity = "Số lượng thấp nhất không thể bằng 0";
        inValid = false;
      }

      if (
        this.product.description.length < 6 ||
        this.product.description.length > 5000
      ) {
        this.errors.description = "Độ dài mô tả không hợp lệ!";
        inValid = false;
      }

      if (!this.product.categories) {
        this.errors.categories = "Thể loại sách không được để trống!";
        inValid = false;
      }

      if (!this.product.status) {
        this.errors.status = "Tình trạng không được để trống!";
        inValid = false;
      }

      return inValid;
    },

    async createProduct() {
      if (this.validate()) {
        try {
          message.loading({ content: "Đang tải...", key, duration: 100000 });
          const res = await axios.post(
            `${BASE_URL}/admin/product/create`,
            this.product,
            { headers: { "x-auth-token": useAdminAuthStore().getToken } }
          );
          if (res.status == 200) {
            setTimeout(() => {
              message.success({
                content: "Thêm thành công!",
                key,
                duration: 3,
              });
            }, 500);
            this.clearForm();
          }
        } catch (error) {
          console.log(error);
          message.destroy();
        }
      }
    },

    clearForm() {
      this.product.name = "";
      this.product.photos = [];
      this.product.author = "";
      this.product.categories = null;
      this.product.price = "";
      this.product.quantity = "";
      this.product.status = null;
      this.product.description = "";
    },
    toggleShow() {
      this.show = !this.show;
    },

    cropSuccess(val) {
      if (this.cropKey < 10) this.cropKey++;
      this.product.photos.push(val);
    },
  },
});
</script>

<style>
.product .ck-editor__editable {
  min-height: 485px;
}
.product .ant-image {
  margin-right: 0.5rem;
}
.product .choose-image {
  height: 100px;
  width: 100px;
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.product .choose-image .select-file {
  width: 100px;
  height: 100px;
  vertical-align: middle;
}

.product .choose-image-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s;
}

.product .choose-image:hover .choose-image-mask {
  opacity: 1;
}
.product .choose-image span {
  color: #000;
  transition: all ease-in-out 0.3s;
}
.product .choose-image:hover span {
  color: #fff;
}

.product .choose-image-icon {
  font-size: 20px;
  color: #50acfb !important;
  transition: all ease-in-out 0.3s;
}
.product .choose-image:hover .choose-image-icon {
  color: #fff !important;
}
.product .ant-image-mask {
  border-radius: 2px;
}
@media (max-width: 576px) {
  .product .preview-image-groups .ant-image:nth-child(n + 4) {
    display: none;
  }
}
@media (min-width: 576px) {
  .product .preview-image-groups .ant-image:nth-child(n + 5) {
    display: none !important;
  }
}

.product .image-container {
  position: relative;
}
.product .image-container .btn-image-close {
  position: absolute;
  top: -8px;
  left: -6px;
  width: 14px;
  height: 14px;
  border-radius: 50px;
  background-color: #fff;
  display: flex;
  cursor: pointer;
  box-shadow: 0px 0px 4px 1px rgba(255, 0, 0, 0.56) !important;
}
</style>
