import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login-index.vue')
  },
  {
    path: '/',
    component: () => import('../views/layout/layout-index.vue'),
    children: [
      {
        path: '', // 默认子组件
        name: 'home',
        component: () => import('../views/home/home-index.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('../views/qa/qa-index.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('../views/video/video-index.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('../views/my/my-index.vue')
      }

    ]
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
