<template>
  <div class="main container detail" style="">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12 col-sm-9 detail-body">
            <div class="col-12 py-4">
              <the-product-detail
                :defaultPhoto="defaultPhoto"
                :photos="product.photos"
                :name="product.name"
                :author="product.author"
                :star="product.star"
                :sale="product.sale"
                :price="product.price"
                :quantity="product.quantity"
                :purchases="product.purchases"
                :tag="product.tag"
              />
            </div>
            <div class="col-12 pb-2">
              <the-product-desc v-bind:description="product.description" />
            </div>
            <div class="col-12 pb-2">
              <the-product-evaluate />
            </div>
          </div>
          <div class="col-12 col-sm-3 m-0">
            <the-same-author />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { BASE_URL } from "../../../configs";
import TheSameAuthor from "./components/SameAuthor.vue";
import TheProductDesc from "./components/ProductDesc.vue";
import TheProductDetail from "./components/ProductDetail.vue";
import TheProductEvaluate from "./components/ProductEvaluate.vue";
export default defineComponent({
  components: {
    TheSameAuthor,
    TheProductDesc,
    TheProductDetail,
    TheProductEvaluate,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    return {
      route,
      router,
    };
  },
  data() {
    return {
      defaultPhoto: "",
      product: {
        name: "",
        photos: [],
        author: "",
        price: 0,
        sale: 0,
        quantity: 0,
        purchases: 0,
        star: 0,
        description: "",
        tag: "",
      },
    };
  },

  created() {
    this.getDetailData();
  },
  methods: {
    async getDetailData() {
      try {
        const res = await axios.get(
          `${BASE_URL}/home/product/${this.route.params.id}`
        );

        if (res.status == 200) {
          this.product.photos = res.data.product.photos;
          this.product.name = res.data.product.name;
          this.product.author = res.data.product.author;
          this.product.price = res.data.product.price;
          this.product.star = res.data.product.star;
          this.product.sale = res.data.product.sale;
          this.product.quantity = res.data.product.quantity;
          this.product.purchases = res.data.product.purchases;
          this.product.description = res.data.product.description;
          this.product.tag = res.data.product.categories.name;
          this.defaultPhoto = res.data.product.photos[0];
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style>
.main.detail {
  height: calc(100vh - var(--header-height));
}

.main.detail .detail-body {
  height: calc(100vh - var(--header-height));
  overflow-y: scroll;
}

.main.detail .detail-body::-webkit-scrollbar {
  width: 0;
}

.book-detail,
.book-desc {
  background-color: #fff;
}
</style>
