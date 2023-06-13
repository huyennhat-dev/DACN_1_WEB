import { createApp } from "vue";
import App from "./App.vue";

import vue3GoogleLogin from "vue3-google-login";

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
  Rate,
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
  Skeleton,
  Form,
  Carousel,
  Tabs,
  Empty,
  Pagination,
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

import $ from "jquery";
window.jQuery = $;
window.$ = $;

/*import store */
import { useAuthStore } from "./store/auth";
import { useCartStore } from "./store/cart";
import { CLIENT_ID } from "./configs";
import { useAdminAuthStore } from "./store/admin/auth";

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(pinia);
app.use(vue3GoogleLogin, { clientId: CLIENT_ID });

app.use(Menu);
app.use(Button);
app.use(Pagination);
app.use(Layout);
app.use(Modal);
app.use(Drawer);
app.use(Table);
app.use(Card);
app.use(Skeleton);
app.use(Avatar);
app.use(Checkbox);
app.use(Input);
app.use(Image);
app.use(Tooltip);
app.use(Rate);
app.use(Result);
app.use(Tabs);
app.use(Select);
app.use(Form);
app.use(Affix);
app.use(Carousel);
app.use(Empty);
app.use(Popconfirm);
app.use(VueFullscreen);

const uToken = localStorage.getItem("uToken");
const aToken = localStorage.getItem("aToken");
if (uToken) {
  try {
    const tokenExpiration = jwtDecode(uToken).exp;
    const currentTimestamp = Date.now();
    if (tokenExpiration && tokenExpiration > currentTimestamp) {
      useAuthStore().setToken(uToken);
      useAuthStore().setUser(uToken);
      useCartStore().fetchCartData();
    } else {
      useAuthStore().logout();
    }
  } catch (error) {
    console.log(error);
    useAuthStore().logout();
  }
} else {
  useAuthStore().logout();
}

if (aToken) {
  try {
    const tokenExpiration = jwtDecode(aToken).exp;
    const currentTimestamp = Date.now();
    if (tokenExpiration && tokenExpiration > currentTimestamp) {
      useAdminAuthStore().setToken(aToken);
      useAdminAuthStore().setUser(aToken);
    } else {
      useAdminAuthStore().logout();
    }
  } catch (error) {
    console.log(error);
    useAdminAuthStore().logout();
  }
} else {
  useAdminAuthStore().logout();
}

app.mount("#app");
