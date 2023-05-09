const admin = [
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
        path: "users",
        name: "admin-list-users",
        component: () => import("../pages/admin/user/index.vue"),
      },
      {
        path: "user/create",
        name: "admin-create-user",
        component: () => import("../pages/admin/user/create.vue"),
      },
    ],
  },
];

export default admin;
