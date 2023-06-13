// store/user.js
import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";
import { BASE_URL } from "../configs";

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
    async setUser(token) {
      const rs = await axios.get(`${BASE_URL}/home/auth/get-info`, {
        headers: { "x-auth-token": token },
      });
      this.user = rs.data.user;
    },
    logout() {
      this.token = null;
      this.isLoggedIn = false;
      useCartStore().carts = [];
      localStorage.clear();
    },
  },
});
