import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuId", {
  state: () => ({
    selectedKeys: [],
    openKeys: [],
  }),

  actions: {
    onSelectedKeys(data) {
      this.selectedKeys = data;
    },

    onOpenKeys(data) {
      this.openKeys = data;
    },
  },
});
