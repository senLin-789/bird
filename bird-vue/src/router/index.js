import { createRouter, createWebHistory } from "vue-router";
import { constantRoutes } from "./routes";

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: constantRoutes,
});

export default router;
