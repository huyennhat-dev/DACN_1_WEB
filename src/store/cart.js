import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    carts: [],
  }),

  actions: {
    addToCart(data) {
      return this.carts.push(data);
    },
    getCartData() {
      return this.carts;
    },
  },
});
