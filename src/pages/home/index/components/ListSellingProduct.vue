<template>
    <div class="mt-3">
      <div class="list-products new-book col-12">
        <div class="list-products-body">
          <div
            class="w-100 list-products-heading d-flex mb-2 justify-content-between p-2"
          >
            <div class="title">Sách bán chạy</div>
            <div class="btn-more">Xem thêm <right-outlined /></div>
          </div>
          <div class="list-products-content">
            <div class="row">
              <div
                class="col-6 col-sm-2 mb-3 px-2 item"
                v-for="(product, index) of products"
                :key="index"
              >
                <the-product :product="product" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TheProduct from "./Product.vue";
  import { BASE_URL } from "../../../../configs";
  import { RightOutlined } from "@ant-design/icons-vue";
  
  export default {
    components: {
      TheProduct,
      RightOutlined,
    },
    data() {
      return {
        products: [],
      };
    },
    mounted() {
      this.getRecommentProduct();
    },
    created() {},
    methods: {
      async getRecommentProduct() {
        try {
          const res = await axios.get(`${BASE_URL}/home/index/recommend-product`);
          if (res.status == 200) {
            const pros = res.data.products;
            let quantity = 12;
            if (pros.length < 12) quantity = pros.length;
  
            for (let i = 0; i < quantity; i++) {
              this.products.push(pros[i]);
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  </script>
  
  <style>
  @media (max-width: 576px) {
    .new-book .list-products-content .item:nth-child(n + 7) {
      display: none;
    }
  }
  </style>
  