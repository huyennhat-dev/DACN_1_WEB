// store/user.js
import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";

export const useAuthStore = defineStore("uAuth", {
  state: () => ({
    token: null,
    isLoggedIn: false,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => {
      return state.isLoggedIn;
    },
    getToken: (state) => {
      return state.token;
    },
    getUser: (state) => {
      return state.user;
    },
  },
  actions: {
    setToken(token) {
      if (token) {
        this.token = token;
        this.isLoggedIn = true;
        localStorage.setItem("uToken", token);
      }
    },
    setUser(token) {
      const user = jwtDecode(token).sub;
      this.user = user;
    },
    logout() {
      this.token = null;
      this.isLoggedIn = false;
      useCartStore().carts = [];
      localStorage.clear();
    },
  },
});
