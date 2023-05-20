// store/user.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    isLoggedIn: false,
  }),
  getters: {
    isAuthenticated: (state) => {
      return state.isLoggedIn;
    },
  },
  actions: {
    setToken(token) {
      this.token = token;
      this.isLoggedIn = true;
      localStorage.setItem("token", token);
    },
    logout() {
      this.token = null;
      this.isLoggedIn = false; 
      localStorage.removeItem("token");

      
    },
  },
});
