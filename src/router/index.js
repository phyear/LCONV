import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/DataConv/DataMain.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/About.vue')
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('../components/Contact.vue')
      },
      {
        path: '/changelog',
        name: 'Changelog',
        component: () => import('../components/Changelog.vue')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('../components/Setting.vue')
      },
  ]
})

export default router