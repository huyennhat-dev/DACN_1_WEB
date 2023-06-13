const admin = [
  {
    path: "/admin/login",
    name: "admin-login",
    component: () => import("../pages/admin/auth/login.vue"),
  },
  {
    path: "/admin",
    component: () => import("../layouts/admin.vue"),
    children: [
      {
        path: "",
        name: "admin-dashboard",
        component: () => import("../pages/admin/dashboard/index.vue"),
      },
      {
        path: "orders-1",
        name: "admin-orders-1",
        component: () => import("../pages/admin/order/index.vue"),
      },
      {
        path: "orders-2",
        name: "admin-orders-2",
        component: () => import("../pages/admin/order/index-2.vue"),
      },
      {
        path: "order/:id",
        name: "admin-order-detail",
        component: () => import("../pages/admin/order/order-detail.vue"),
      },
      {
        path: "admins",
        name: "admin-list-admins",
        component: () => import("../pages/admin/user/index.vue"),
      },
      {
        path: "users",
        name: "admin-list-users",
        component: () => import("../pages/admin/user/users.vue"),
      },
      {
        path: "user/create",
        name: "admin-create-user",
        component: () => import("../pages/admin/user/create.vue"),
      },
      {
        path: "user/edit/:id",
        name: "admin-edit-user",
        component: () => import("../pages/admin/user/edit.vue"),
      },
      //Role manage
      // {
      //   path: "roles",
      //   name: "admin-list-roles",
      //   component: () => import("../pages/admin/role/index.vue"),
      // },
      // {
      //   path: "role/create",
      //   name: "admin-create-role",
      //   component: () => import("../pages/admin/role/create.vue"),
      // },
      // {
      //   path: "role/edit/:id",
      //   name: "admin-edit-role",
      //   component: () => import("../pages/admin/role/edit.vue"),
      // },
      //Categories manage
      {
        path: "categories",
        name: "admin-list-categories",
        component: () => import("../pages/admin/categories/index.vue"),
      },
      {
        path: "category/create",
        name: "admin-create-categories",
        component: () => import("../pages/admin/categories/create.vue"),
      },
      {
        path: "category/edit/:id",
        name: "admin-edit-categories",
        component: () => import("../pages/admin/categories/edit.vue"),
      },
      //Products manage
      {
        path: "product",
        name: "admin-list-products",
        component: () => import("../pages/admin/product/index.vue"),
      },
      {
        path: "product/create",
        name: "admin-create-product",
        component: () => import("../pages/admin/product/create.vue"),
      },
      {
        path: "product/edit/:id",
        name: "admin-edit-product",
        component: () => import("../pages/admin/product/edit.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../pages/404.vue"),
  },
];

export default admin;
