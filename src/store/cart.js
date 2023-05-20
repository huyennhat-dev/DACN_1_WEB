import { defineStore } from "pinia";
import { BASE_URL } from "../configs";
import { useAuthStore } from "./auth";

export const useCartStore = defineStore("cart", {
  state: () => ({
    carts: [],
  }),
  getters: {
    getCartData: (state) => {
      return state.carts;
    },
  },
  actions: {
    async fetchCartData() {
      try {
        const res = await axios.get(`${BASE_URL}/home/cart/show`, {
          headers: { "x-auth-token": useAuthStore().getToken },
        });
        this.carts = res.data.carts;
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      }
    },
    addToCart(data) {
      const existingProduct = this.carts.find(
        (item) => item.product === data.product
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.carts.push(data);
      }
    },
  },
});
