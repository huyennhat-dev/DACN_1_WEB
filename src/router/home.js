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
    ],
  },
];

export default home;
