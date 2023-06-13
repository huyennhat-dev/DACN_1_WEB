<template>
  <div>
    <a-layout-header
      :class="{ active: collapsed == true }"
      class="header bg-white shadow-full d-flex align-items-center p-0 justify-content-between position-fixed"
    >
      <menu-outlined
        @click="collapsed = !collapsed"
        class="trigger d-none d-sm-block"
        v-on:click="handleClick"
      />

      <menu-outlined class="trigger d-block d-sm-none" @click="showDrawer" />
      <div>
        <a-tooltip title="Đăng xuất">
          <export-outlined class="fs-6" @click="logOut()" />
        </a-tooltip>
        <fullscreen-exit-outlined
          v-if="tonggle == true"
          class="trigger"
          v-fullscreen
          @click="tonggle = !tonggle"
        />
        <fullscreen-outlined
          v-if="tonggle == false"
          class="trigger"
          v-fullscreen
          @click="tonggle = !tonggle"
        />
      </div>
    </a-layout-header>
    <a-drawer v-model:visible="visible" width="300" placement="left">
      <side-bar />
    </a-drawer>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import SideBar from "./SideBar.vue";
import {
  MenuOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExportOutlined,
} from "@ant-design/icons-vue";
import { useAdminAuthStore } from "../../store/admin/auth";
export default defineComponent({
  components: {
    MenuOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    SideBar,
    ExportOutlined,
  },
  methods: {
    handleClick(e) {
      this.$emit("handleClickCollapsed");
    },
    logOut() {
      useAdminAuthStore().logout();
      this.$router.push({ path: "/admin/login" });
    },
  },
  setup() {
    const tonggle = ref(false);
    const collapsed = ref(false);
    const visible = ref(false);
    const showDrawer = () => {
      visible.value = true;
    };

    return { tonggle, collapsed, showDrawer, visible };
  },
});
</script>

<style>
.header {
  height: 50px;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
}
@media (min-width: 576px) {
  .header {
    margin-left: 300px;
    transition: all 0.2s;
  }

  .header.active {
    margin-left: 80px;
    transition: all 0.2s;
  }
}
</style>
