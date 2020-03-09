/*
 * @Author: Caven
 * @Date: 2019-12-23 13:38:32
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-08 16:56:30
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    children: [
      {
        path: '/map',
        name: 'map',
        component: () => import('../views/map/index.vue')
      },
      {
        path: '/layer',
        name: 'layer',
        component: () => import('../views/layer/index.vue')
      },
      {
        path: '/scene',
        name: 'scene',
        component: () => import('../views/scene/index.vue')
      },
      {
        path: '/tool',
        name: 'tool',
        component: () => import('../views/tool/index.vue')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('../views/setting/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
