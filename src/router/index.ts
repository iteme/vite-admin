import type { RouteRecordRaw } from 'vue-router';

import { createRouter, createWebHashHistory } from 'vue-router';

import DefaultLayout from '@/layouts/DefaultLayout.vue';

import BlankLayout from '@/layouts/BlankLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      title: 'app.route.title.empty',
    },
    component: DefaultLayout,
    children: [
      {
        path: '/config/dict',
        component: () => import('@/views/config/dict/index.vue'),
      },
      {
        path: '/system/user',
        component: () => import('@/views/system/user/index.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        meta: {
          title: 'app.route.title.notFound',
        },
        component: () => import('@/views/error/404.vue'),
      },
    ],
  },
  {
    path: '/auth',
    meta: {
      title: 'app.route.title.empty',
    },
    component: BlankLayout,
    children: [
      {
        path: '/auth/login',
        meta: {
          title: 'app.route.title.empty',
        },
        component: () => import('@/views/auth/login/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
