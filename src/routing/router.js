import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const title = to.meta.title || 'Uranite'
  document.title = title
})

export default router
