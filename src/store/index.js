import { defineStore } from "pinia";

export const useIndexStore = defineStore("indexStore", {
  state: () => ({
    searchValue: "",
  }),
  getters: {
    getSearchValue: (state) => {
      return state.searchValue;
    },
  },

  actions: {
    setSarchValue(data) {
      this.sếtarchValue = data;
    },
  },
});
