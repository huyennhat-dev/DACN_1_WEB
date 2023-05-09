import { createApp } from "vue";
import App from "./App.vue";

/* import the pinia */
import { createPinia } from "pinia";

/* import the router */
import router from "./router/index.js";

/* import the axios */
import axios from "axios";
window.axios = axios;

/**import the fullscreen */
import VueFullscreen from 'vue-fullscreen'

/* import the boostrap */
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";

/* import the antdesign */
import {
  Menu,
  Drawer,
  Button,
  Card,
  Table,
  Avatar,
  Select,
  Checkbox,
  Input,
  Popconfirm,
  Layout
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

/* import the fontawesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, fab, far);

/* import app style */
import "./assets/css/style.css";

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(createPinia());
app.use(Menu);
app.use(Button);
app.use(Layout);
app.use(Drawer);
app.use(Table);
app.use(Card);
app.use(Avatar);
app.use(Checkbox);
app.use(Input);
app.use(Select);
app.use(Popconfirm);
app.use(VueFullscreen)
app.mount("#app");
