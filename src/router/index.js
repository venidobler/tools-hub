import { createRouter, createWebHistory } from 'vue-router'
import JsonFormatter from '../views/JsonFormatter.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'json-formatter',
      component: JsonFormatter
    }
  ]
})

export default router