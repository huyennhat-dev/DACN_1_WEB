const home = [
  {
    path: "/",
    component: () => import("../layouts/home.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("../pages/home/index/index.vue"),
      },
      {
        path: "account",
        name: "account",
        component: () => import("../pages/home/auth/index.vue"),
      },
      {
        path: "search",
        name: "search",
        component: () => import("../pages/home/search/index.vue"),
      },
      {
        path: "book/detail/:id",
        name: "detail",
        component: () => import("../pages/home/detail/index.vue"),
      },
      {
        path: "checkout",
        name: "checkout",
        component: () => import("../pages/home/checkout/index.vue"),
      },

      {
        path: "checkout/success",
        name: "checkout-success",
        component: () => import("../pages/home/checkout/success.vue"),
      },
      {
        path: "checkout/error",
        name: "checkout-error",
        component: () => import("../pages/home/checkout/error.vue"),
      },
      {
        path: "order",
        name: "order",
        component: () => import("../pages/home/order/index.vue"),
      },
      {
        path: "category/:slug",
        name: "category",
        component: () => import("../pages/home/categories/index.vue"),
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import("../pages/404.vue"),
  },
];

export default home;
