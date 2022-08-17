import * as VueRouter from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/pages/HomePage.vue'),
  },
];
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
