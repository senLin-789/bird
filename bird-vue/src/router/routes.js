import LAYOUT from "@/layout/default/index.vue";

export const constantRoutes = [
  {
    path: "/user",
    component: LAYOUT,
    children: [
      {
        path: "setting",
        name: "user-setting",
        component: () => import("@/views/user/setting.vue"),
        meta: {
          title: "个人设置",
        },
      },
    ],
  },
  {
    path: "/people",
    name: "people",
    component: () => import("@/views/people/index.vue"),
    meta: {
      title: "人员管理",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/notFound.vue"),
  },
];
