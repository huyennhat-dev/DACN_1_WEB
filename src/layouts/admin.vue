<template>
  <fullscreen>
    <a-layout style="min-height: 100vh" has-sider class="container-fluid p-0">
      <side-bar
        v-bind:collapsed="collapsed"
        class="d-none d-sm-block"
        :role="user.role"
      />
      <the-header v-on:handleClickCollapsed="handleCollapsed" />

      <a-layout class="app-layout" :class="{ active: collapsed == true }">
        <a-layout-content
          class="body bg-white mx-3 my-3 p-3 shadow-full rounded-1"
        >
          <router-view />
        </a-layout-content>
        <the-footer />
      </a-layout>
    </a-layout>
  </fullscreen>
</template>

<script>
import { defineComponent, ref } from "vue";

import SideBar from "../components/admin/SideBar.vue";
import TheHeader from "../components/admin/Header.vue";
import TheFooter from "../components/admin/Footer.vue";
import { useAdminAuthStore } from "../store/admin/auth";
export default defineComponent({
  components: {
    SideBar,
    TheHeader,
    TheFooter,
  },
  setup() {
    const collapsed = ref(false);

    const handleCollapsed = () => {
      collapsed.value = !collapsed.value;
    };

    return { collapsed, handleCollapsed };
  },
  data() {
    return {
      user: {
        role: "",
      },
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      try {
        const isLogged = useAdminAuthStore().isAuthenticated;
        if (!isLogged) this.$router.push({ name: "admin-login" });
        else {
          const user = useAdminAuthStore().getUser;
          this.user.role = user.role;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style>
.body {
  min-height: 280px;
}
.app-layout {
  margin-top: 50px;
}
@media (max-width: 576px) {
  .body {
    margin: 0 !important;
    padding: 0 !important;
  }
}
@media (min-width: 576px) {
  .app-layout {
    margin-left: 300px;
    transition: all 0.2s;
  }
  .app-layout.active {
    margin-left: 80px;
    transition: all 0.2s;
  }
}
</style>
