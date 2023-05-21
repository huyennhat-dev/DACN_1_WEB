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
        path: "payment",
        name: "payment",
        component: () => import("../pages/home/payment/payment.vue"),
      },
      {
        path: "payment/success",
        name: "payment-success",
        component: () => import("../pages/home/payment/success.vue"),
      },
    ],
  },
];

export default home;
