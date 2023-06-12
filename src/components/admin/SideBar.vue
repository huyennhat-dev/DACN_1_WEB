<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    width="300"
    :trigger="null"
    collapsible
    class="app-sider px-2 position-fixed"
  >
    <div class="side_bar-logo d-flex justify-content-center align-items-center">
      <img
        v-if="!collapsed"
        src="../../assets/images/logo.png"
        alt=""
        height="55"
      />
      <img
        v-if="collapsed"
        src="../../assets/images/logo_2.png"
        alt=""
        height="55"
      />
    </div>
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

      <a-sub-menu key="admin-order-sub">
        <template #icon><gold-outlined /></template>
        <template #title>Đơn hàng</template>
        <a-menu-item key="admin-orders-1" class="rounded-1 my-0 mt-1">
          <router-link :to="{ name: 'admin-orders-1' }">
            <inbox-outlined />
            <span>Đơn hàng đã gửi</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="admin-orders-2" class="rounded-1 my-1">
          <router-link :to="{ name: 'admin-orders-2' }">
            <interaction-outlined />
            <span>Đơn hàng đang chờ</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="admin-users-sub">
        <template #icon><user-outlined /> </template>
        <template #title>Tài khoản</template>
        <a-menu-item
          v-if="role == 'ADM'"
          key="admin-list-admin"
          class="rounded-1 my-0 mt-1"
        >
          <router-link :to="{ name: 'admin-list-admins' }">
            <team-outlined />
            <span>Danh sách quản trị viên</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="admin-list-user" class="rounded-1 my-0 mt-1">
          <router-link :to="{ name: 'admin-list-users' }">
            <team-outlined />
            <span>Danh sách khách hàng</span>
          </router-link>
        </a-menu-item>
        <a-menu-item
          v-if="role == 'ADM'"
          key="admin-create-user"
          class="rounded-1 my-1"
        >
          <router-link :to="{ name: 'admin-create-user' }">
            <user-add-outlined />
            <span>Thêm tài khoản</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="admin-product-sub">
        <template #icon><appstore-outlined /></template>
        <template #title>Sách</template>
        <a-menu-item key="admin-list-products" class="rounded-1 my-0 mt-1">
          <router-link :to="{ name: 'admin-list-products' }">
            <unordered-list-outlined />
            <span>Toàn bộ sách</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="admin-create-product" class="rounded-1 my-1">
          <router-link :to="{ name: 'admin-create-product' }">
            <plus-outlined />
            <span>Thêm mới sách</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="admin-categories-sub">
        <template #icon><deployment-unit-outlined /></template>
        <template #title>Thể loại sách</template>
        <a-menu-item key="admin-list-categories" class="rounded-1 my-0 mt-1">
          <router-link :to="{ name: 'admin-list-categories' }">
            <unordered-list-outlined />
            <span>Danh sách thể loại</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="admin-create-categories" class="rounded-1 my-1">
          <router-link :to="{ name: 'admin-create-categories' }">
            <plus-outlined />
            <span>Thêm thể loại</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>

      <!-- <a-sub-menu key="admin-roles-sub">
        <template #icon><apartment-outlined /></template>
        <template #title>Vai trò</template>
        <a-menu-item key="admin-list-roles" class="rounded-1 my-0 mt-1">
          <router-link :to="{ name: 'admin-list-roles' }">
            <unordered-list-outlined />
            <span>Danh sách vai trò</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="admin-create-role" class="rounded-1 my-1">
          <router-link :to="{ name: 'admin-create-role' }">
            <plus-outlined />
            <span>Thêm vai trò</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu> -->
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useMenuStore } from "../../store/menu.js";
import {
  UserOutlined,
  DashboardOutlined,
  UserAddOutlined,
  TeamOutlined,
  ApartmentOutlined,
  DeploymentUnitOutlined,
  UnorderedListOutlined,
  GoldOutlined,
  PlusOutlined,
  AppstoreOutlined,
  InboxOutlined,
  InteractionOutlined
} from "@ant-design/icons-vue";
import { useAdminAuthStore } from "../../store/admin/auth.js";

export default defineComponent({
  components: {
    UserOutlined,
    DashboardOutlined,
    UserAddOutlined,
    TeamOutlined,
    ApartmentOutlined,
    DeploymentUnitOutlined,
    UnorderedListOutlined,
    PlusOutlined,
    AppstoreOutlined,
    GoldOutlined,
    InboxOutlined,
    InteractionOutlined
  },
  props: {
    collapsed: Boolean,
    role: String,
  },
  setup() {
    return {
      ...storeToRefs(useMenuStore()),
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
  z-index: 998;
}

.side_bar-logo {
  height: 70px;
}
.ant-menu-dark .ant-menu-inline.ant-menu-sub {
  background: #15222f;
  border-radius: 0.25rem;
  padding: 0 0.25rem;
}
</style>
