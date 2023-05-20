import { createApp } from "vue";
import App from "./App.vue";

/* import the pinia */
import { createPinia } from "pinia";
const pinia = createPinia();
/* import the router */
import router from "./router/index.js";

/* import the axios */
import axios from "axios";
window.axios = axios;

/**import the fullscreen */
import VueFullscreen from "vue-fullscreen";

import jwtDecode from "jwt-decode";

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
  Layout,
  Tooltip,
  Image,
  Result,
  Affix,
  Modal,
  Form,
  Carousel,
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

import { useAuthStore } from "./store/auth";
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(pinia);

app.use(Menu);
app.use(Button);
app.use(Layout);
app.use(Modal);
app.use(Drawer);
app.use(Table);
app.use(Card);
app.use(Avatar);
app.use(Checkbox);
app.use(Input);
app.use(Image);
app.use(Tooltip);
app.use(Result);
app.use(Select);
app.use(Form);
app.use(Affix);
app.use(Carousel);
app.use(Popconfirm);
app.use(VueFullscreen);

const token = localStorage.getItem("token");
const authStore = useAuthStore();
if (token) {
  const tokenExpiration = jwtDecode(token).exp;
  const currentTimestamp = Date.now();
  if (tokenExpiration && tokenExpiration > currentTimestamp) {
    authStore.setToken(token);
  } else {
    authStore.logout();
  }
} else {
  authStore.logout();
}

app.mount("#app");
