<template>
  <div class="main container search-page py-4" style="">
    <div class="row bg-white brr-10 p-3">
      <div class="search-product-header col-12 d-flex align-items-center border-bottom pb-3">
        <div class="sort-title me-5">
          <filter-outlined class="fw-bold fs-5" />
          <span class="fs-6 fw-bold">Sắp xếp theo </span>
        </div>
        <a-button
          v-for="item of sortList"
          :key="item.key"
          class="brr-10 px-4 me-3"
          :class="{ active: item.key == activeSortKey }"
          @click="sortProduct(item.key)"
        >
          {{ item.title }}
        </a-button>
      </div>
      <div class="col-12">
        <div class="row py-3">
          <div
            v-for="product of products"
            :key="product._id"
            class="col-6 col-sm-2 mb-4"
          >
            <the-product :product="product" class="shadow-full brr-10" />
          </div>
        </div>
      </div>
      <div v-if="totalCount > 24" class="col-12 text-center">
        <a-pagination
          v-model:current="page"
          :total="totalCount"
          :show-size-changer="false"
          v-model:pageSize="pageSize"
          @change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { BASE_URL } from "../../../configs";
import { FilterOutlined } from "@ant-design/icons-vue";
import TheProduct from "../index/components/Product.vue";

export default defineComponent({
  components: {
    FilterOutlined,
    TheProduct,
  },
  data() {
    return {
      searchValue: this.$route.query.key,
      products: [],
      sortList: [
        {
          title: "Chung",
          key: "all",
        },
        {
          title: "Đánh giá",
          key: "star",
        },
        {
          title: "Giá tiền",
          key: "price",
        },
        {
          title: "Bán chạy",
          key: "selling",
        },
      ],
      filterProducts: [],
      activeSortKey: "all",
      page: 1,
      totalCount: 0,
      pageSize: 0,
    };
  },
  watch: {
    "$route.query.key"(newVal, oldVal) {
      this.searchValue = newVal;
      this.getProducts();
    },
  },

  mounted() {
    this.page = this.$route.query.page || 1;
    this.getProducts();
  },
  methods: {
    sortProduct(key) {
      this.activeSortKey = key;
      switch (key) {
        case "all":
          this.products.sort((a, b) => a.createdAt - b.createdAt);
          break;
        case "price":
          this.products.sort((a, b) => b.price - a.price);
          break;
        case "star":
          this.products.sort((a, b) => b.star - a.star);
          break;
        case "selling":
          this.products.sort((a, b) => b.purchases - a.purchases);
          break;
      }
    },

    async changePage() {
      if (this.$route.name == "search") {
        this.$router.replace({
          query: { ...this.$route.query, page: this.page },
        });
      }
      this.getProducts();
    },
    async getProducts() {
      try {
        if (this.$route.name != "search") return;
        const rs = await axios.get(
          `${BASE_URL}/home/product/search/search?key=${this.searchValue}&page=${this.page}`
        );
        if (rs.status == 200) {
          this.products = rs.data.products;
          this.totalCount = rs.data.totalCount;
          this.pageSize = rs.data.pageSize;
          console.log(this.products);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style>
.search-page .ant-btn.active {
  color: var(--primary-color);
  border-color: var(--primary-color);
  background: #fff;
  pointer-events: none;
}
.search-page .ant-btn:hover,
.ant-btn:focus {
  color: var(--primary-color);
  border-color: var(--primary-color);
  background: #fff;
}
.search-page .ant-pagination-prev button,
.search-page .ant-pagination-next button,
.search-page .ant-pagination-item {
  border-radius: 10px;
  transition: all 0.3s;
}
.search-page .ant-pagination-prev button:hover,
.search-page .ant-pagination-next button:hover,
.search-page .ant-pagination-item:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transition: all 0.3s;
}
.search-page .ant-pagination-item-active {
  border-color: var(--primary-color);
  color: var(--primary-color);
}
.search-page .ant-pagination-item-active a {
  color: var(--primary-color);
}
.ant-pagination-disabled .ant-pagination-item-link,
.ant-pagination-disabled:hover .ant-pagination-item-link {
  color: rgba(0, 0, 0, 0.25);
  border-color: #d9d9d9 !important;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .search-product-header {
    overflow-y: scroll;
  }
  .search-product-header .sort-title span:last-child{
    display: none;
  }
  
}
</style>
