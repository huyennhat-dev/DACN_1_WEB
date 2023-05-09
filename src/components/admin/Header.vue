<template>
  <a-layout-header
    :class="{ active: collapsed == true }"
    class="header bg-white shadow-full d-flex align-items-center p-0 justify-content-between position-fixed"
  >
    <menu-outlined
      @click="collapsed = !collapsed"
      class="trigger"
      v-on:click="handleClick"
    />

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
  </a-layout-header>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  MenuOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    MenuOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
  },
  methods: {
    handleClick(e) {
      this.$emit("handleClickCollapsed");
    },
  },
  setup() {
    const tonggle = ref(false);
    const collapsed = ref(false);

    return { tonggle, collapsed };
  },
});
</script>

<style>
.header {
  height: 50px;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  margin-left: 300px;
  transition: all 0.2s;
}

.header.active {
  margin-left: 80px;
  transition: all 0.2s;
}
</style>
