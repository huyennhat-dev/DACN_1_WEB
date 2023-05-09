<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    width="300"
    :trigger="null"
    collapsible
    class="app-sider px-2 position-fixed"
  >
    <div class="side_bar-logo"></div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      theme="dark"
      mode="inline"
    >
      <a-menu-item key="admin-dashboard" class="rounded-1">
        <router-link :to="{ name: 'admin-dashboard' }">
          <dashboard-outlined />
          <span>Dashboard</span>
        </router-link>
      </a-menu-item>

      <a-sub-menu key="admin-users-sub">
        <template #icon><user-outlined /> </template>
        <template #title>Quản lý người dùng</template>
        <a-menu-item key="admin-list-user" class="rounded-1 my-0 mt-1">
          <router-link :to="{ name: 'admin-list-users' }">
            <team-outlined />
            <span>Danh sách người dùng</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="admin-create-user" class="rounded-1 my-1">
          <router-link :to="{ name: 'admin-create-user' }">
            <user-add-outlined />
            <span>Thêm người dùng</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useMenu } from "../../store/use-menu.js";
import {
  UserOutlined,
  DashboardOutlined,
  UserAddOutlined,
  TeamOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    UserOutlined,
    DashboardOutlined,
    UserAddOutlined,
    TeamOutlined,
  },
  props: {
    collapsed: Boolean,
  },
  setup() {
    return {
      ...storeToRefs(useMenu()),
    };
  },
});
</script>

<style>
.app-sider {
  overflow: auto;
  height: 100vh;
  left: 0;
  top: 0;
  bottom: 0;
}

.side_bar-logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
.ant-menu-dark .ant-menu-inline.ant-menu-sub {
  background: #15222f;
  border-radius: 0.25rem;
  padding: 0 0.25rem;
}
</style>
