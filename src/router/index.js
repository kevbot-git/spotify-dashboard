import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import Home from '../views/Home.vue';
import { store, mutations } from '../store';

const checkAuth = (to, next) => {
  if (!store.state.authToken && to.name !== 'auth') {
    next({
      name: 'auth',
      params: {
        redirect: to.fullPath,
      }
    });
    return;
  }
};

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'auth',
    path: '/auth',
    component: () => import('../views/Auth.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  checkAuth(to, next);

  next();
});

export default router;
