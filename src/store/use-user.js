// store/user.js
import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => ({
    userInfo: null,
  }),
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      console.log('ok')
    },
  },
});
