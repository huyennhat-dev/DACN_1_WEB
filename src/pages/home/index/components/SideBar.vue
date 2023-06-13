<template>
  <div class="side-bar w-100">
    <div class="side-bar_body">
      <div class="side-bar_header px-2">
        <a-input
          v-model:value="searchValue"
          @change="changeSearchValue"
          class="brr-5"
          size="large"
          placeholder="Tìm kiếm danh mục sách..."
        >
          <template #suffix>
            <search-outlined class="text-primary" />
          </template>
        </a-input>
      </div>
      <div
        class="side-bar_content"
        :class="{
          'h-100 d-flex justify-content-center align-items-center':
            filteredCategories.length <= 0,
        }"
      >
        <div v-if="filteredCategories.length > 0">
          <div
            v-for="category of filteredCategories"
            :key="category._id"
            class="side-bar_item mb-1"
          >
            <router-link
              :to="{ name: 'category', params: { slug: category.slug } }"
              class="w-100"
            >
              <div class="side-bar_item_body">
                <tag-outlined class="me-2" />
                {{ category.name }}
              </div>
            </router-link>
          </div>
        </div>
        <a-empty v-else description="Không có danh mục này!" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { SearchOutlined, TagOutlined } from "@ant-design/icons-vue";
import { BASE_URL } from "../../../../configs";
import unidecode from "unidecode";

export default defineComponent({
  components: {
    TagOutlined,
    SearchOutlined,
  },

  data() {
    return {
      searchValue: "",
      categories: [],
      filteredCategories: [],
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      try {
        const rs = await axios.get(`${BASE_URL}/home/index/categories`);
        if (rs.status == 200) {
          this.categories = rs.data.categories.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          if (!this.searchValue) {
            this.filteredCategories = this.categories;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    changeSearchValue() {
      this.filteredCategories = this.categories.filter((category) =>
        unidecode(category.name.toLowerCase()).includes(
          unidecode(this.searchValue.toLowerCase())
        )
      );
    },
  },
});
</script>

<style>
.side-bar {
  height: 350px;
}
.side-bar .side-bar_body {
  height: 100%;
  padding: 15px 10px;
  border-radius: 10px;
  background-color: #fff;
}

.side-bar .side-bar_header {
  text-align: center;
}
.side-bar .side-bar_content {
  max-height: 90%;
  padding: 10px 5px;
  overflow-y: scroll;
}
.side-bar .side-bar_content::-webkit-scrollbar {
  width: 0;
}

.side-bar .side-bar_item {
  height: 40px;
  width: 100%;
  display: flex;
  border-radius: 8px;
  align-items: center;
  text-align: center;
}
.side-bar .side-bar_item_body {
  padding: 8px;
  font-size: 15px;
  height: 40px;
  width: 100%;
  cursor: pointer;
  color: #000;
  display: flex;
  border-radius: 8px;
  justify-content: start;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  transition: all 0.2s;
}
.side-bar .side-bar_item_body:hover {
  box-shadow: 0px 0px 5px 2px rgba(101, 101, 101, 0.15) !important;
  transition: all 0.2s;
}

.side-bar .side-bar_item_body:active {
  width: 98%;
  height: 95%;
  transition: all 0.2s;
}
</style>
