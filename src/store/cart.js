import { defineStore } from "pinia";
import { BASE_URL } from "../configs";
import { useAuthStore } from "./auth";

export const useCartStore = defineStore("cart", {
  state: () => ({
    carts: [],
    totalPrice: 0,
  }),
  getters: {
    getCartData: (state) => {
      return state.carts;
    },
    getTotalPrice: (state) => {
      return state.totalPrice;
    },
  },
  actions: {
    async increase(id) {
      const existingProduct = this.carts.find((item) => item.product._id == id);
      if (existingProduct) {
        existingProduct.quantity += 1;
        await this.updateQuantity(id, existingProduct.quantity);
      }
      this.handleTotalPrice();
    },
    async decrease(id) {
      const existingProduct = this.carts.find((item) => item.product._id == id);
      if (existingProduct) {
        existingProduct.quantity -= 1;
        if (existingProduct.quantity <= 0) await this.delToCart(id);
        else await this.updateQuantity(id, existingProduct.quantity);
      }
      this.handleTotalPrice();
    },
    async fetchCartData() {
      try {
        const res = await axios.get(`${BASE_URL}/home/cart/show`, {
          headers: { "x-auth-token": useAuthStore().getToken },
        });
        if (res.status == 200) {
          this.carts = res.data.carts;
          this.handleTotalPrice();
        }
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      }
    },
    async addToCart(product, quantity) {
      try {
        const res = await axios.post(
          `${BASE_URL}/home/cart/create`,
          { id: product._id, quantity },
          { headers: { "x-auth-token": useAuthStore().getToken } }
        );
        if (res.status == 200) {
          const existingProduct = this.carts.find(
            (item) => item.product._id == product._id
          );

          if (existingProduct) existingProduct.quantity += quantity;
          else this.carts.push({ product: product, quantity });
          this.handleTotalPrice();
          return true;
        }
      } catch (error) {
        console.error("Failed add to cart ", error);
        return false;
      }
    },
    async delToCart(id) {
      try {
        const res = await axios.delete(`${BASE_URL}/home/cart/delete/${id}`, {
          headers: { "x-auth-token": useAuthStore().getToken },
        });
        if (res.status == 200) {
          for (let i = 0; i < this.carts.length; i++) {
            if (this.carts[i].product._id === id) {
              this.carts.splice(i, 1);
              break;
            }
          }
          this.handleTotalPrice();
          return true;
        }
      } catch (error) {
        console.error("Failed to delete cart ", error);
        return false;
      }
    },
    async updateQuantity(id, quantity) {
      try {
        const res = await axios.put(
          `${BASE_URL}/home/cart/update-quantity`,
          { id, quantity },
          { headers: { "x-auth-token": useAuthStore().getToken } }
        );
        if (res.status == 200) return true;
      } catch (error) {
        console.error("Failed add to cart ", error);
      }
    },
    handleTotalPrice() {
      this.totalPrice = 0;
      for (const cart of this.carts) {
        const price =
          (cart.product.price - cart.product.price * cart.product.sale) *
          cart.quantity;
        this.totalPrice += price;
      }
    },
  },
});
