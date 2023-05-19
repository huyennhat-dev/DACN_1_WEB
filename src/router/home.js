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
