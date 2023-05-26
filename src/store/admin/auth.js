import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";

export const useAdminAuthStore = defineStore("adminAuth", {
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
        localStorage.setItem("aToken", token);
      }
    },
    setUser(token) {
      const user = jwtDecode(token).sub;
      this.user = user;
    },
    logout() {
      this.token = null;
      this.isLoggedIn = false;
      localStorage.clear();
    },
  },
});
