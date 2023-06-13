<template>
  <a-card title="Toàn bộ sách" class="products h-100">
    <a-table
      class="h-100"
      :dataSource="products"
      :columns="columns"
      :scroll="{ x: 576 }"
      bordered
    >
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.key === 'index'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-if="column.key === 'photos'">
          <div class="w-100 preview-image-groups d-flex justify-content-center">
            <a-image-preview-group v-if="record.photos.length > 0">
              <a-image
                v-for="(image, index) in record.photos"
                :key="index"
                :width="100"
                :height="100"
                :src="image"
                class="shadow-full brr-2"
              />
            </a-image-preview-group>

            <img
              v-if="!record.photos[0]"
              width="70"
              class="shadow-full brr-2"
              src="../../../assets/images/image.png"
            />
          </div>
        </template>
        <template v-if="column.key === 'price'">
          <span>{{ fomated(record.price) }}</span>
        </template>
        <template v-if="column.key === 'sale'">
          <span>{{ (record.sale * 100).toFixed(0) }} % </span>
        </template>

        <template v-if="column.key === 'quantity'">
          <div class="w-100 d-flex justify-content-center">
            {{ record.quantity }}
          </div>
          <div
            v-if="record.quantity < 10"
            class="text-danger text-center fw-bolder fst-italic"
          >
            Sắp hết
          </div>
        </template>
        <template v-if="column.key === 'status'">
          <span v-if="record.statusSlug == 'hoat-dong'" class="text-primary">
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
          <a-tooltip placement="topRight" title="Chỉnh sửa">
            <router-link
              :to="{ name: 'admin-edit-product', params: { id: record._id } }"
            >
              <a-button class="me-0 me-sm-1 mb-1 mb-sm-1" type="primary" ghost>
                <form-outlined />
              </a-button>
            </router-link>
          </a-tooltip>
          <a-tooltip placement="topRight" title="Xóa sách">
            <a-popconfirm
              title="Bạn có chắc chắn xóa sách này!"
              @confirm="deleteProduct(record._id)"
              okText="Xóa"
              placement="bottomLeft"
              okType="danger"
              cancelText="Hủy"
            >
              <a-button class="" danger>
                <delete-outlined />
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
import { useMenuStore } from "../../../store/menu";
import { BASE_URL } from "../../../configs";
import { formattedPrice } from "../../../utils/formatPrice";
import { message } from "ant-design-vue";

import {
  FormOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { useAdminAuthStore } from "../../../store/admin/auth";
export default defineComponent({
  components: {
    FormOutlined,
    EyeOutlined,
    DeleteOutlined,
  },
  setup() {
    useMenuStore().onSelectedKeys(["admin-list-products"]);
    useMenuStore().onOpenKeys(["admin-product-sub"]);
    const fomated = (price) => formattedPrice(price);

    const columns = [
      {
        title: "#",
        key: "index",
        width: 40,
      },
      {
        title: "Hình ảnh",
        key: "photos",
        dataIndex: "photos",
        width: 110,
      },
      {
        title: "Tên sách",
        key: "name",
        dataIndex: "name",
        width: 180,
      },
      {
        title: "Giá",
        key: "price",
        dataIndex: "price",
        width: 100,
        sorter: (a, b) => a.price - b.price,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Giảm giá",
        key: "sale",
        dataIndex: "sale",
        width: 70,
      },
      {
        title: "Bán ra",
        key: "purchases",
        dataIndex: "purchases",
        width: 70,
        sorter: (a, b) => a.purchases - b.purchases,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Kho còn",
        key: "quantity",
        dataIndex: "quantity",
        width: 70,
        sorter: (a, b) => a.quantity - b.quantity,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Trạng thái",
        key: "status",
        dataIndex: "status",
        width: 100,
      },
      {
        title: "Công cụ",
        key: "action",
        dataIndex: "action",
        width: 70,
        fixed: "right",
      },
    ];
    return { columns, fomated };
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    document.title = "Toàn bộ sách";
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/admin/product`, {
          headers: {
            "x-auth-token": useAdminAuthStore().getToken,
          },
        });
        this.products = res.data.products;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduct(id) {
      return new Promise(async (resolve) => {
        try {
          const res = await axios.delete(
            `${BASE_URL}/admin/product/delete/${id}`,
            {
              headers: {
                "x-auth-token": useAdminAuthStore().getToken,
              },
            }
          );

          if (res.status == 200) {
            setTimeout(() => {
              resolve(true);
              const index = this.products.findIndex((pro) => pro._id === id);
              if (index !== -1) {
                this.products.splice(index, 1);
                message.success({
                  content: "Xóa vai trò thành công!",
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
.products .ant-card-body {
  padding: 0;
}

.products .ant-image-mask-info {
  font-size: 12px;
}
.products .ant-table-cell:nth-child(8) {
  padding-left: 10px !important;
  padding-right: 10px !important;
}
.products .ant-table-cell:nth-child(6) {
  position: relative;
}
.products .preview-image-groups .ant-image:nth-child(n + 2) {
  display: none !important;
}
</style>
