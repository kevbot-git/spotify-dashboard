import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import Home from '../views/Home.vue';
import { store, mutations } from '../store';
import { decodeHashFragment } from '../helpers';

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
    beforeEnter(to, from, next) {
      const { access_token: accessToken } = decodeHashFragment(to.hash);
      if (accessToken) {
        next(to.fullPath.replace(/^\//g, '/auth'));
        return;
      }

      checkAuth(to, next);

      next();
    }
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

export default router;
