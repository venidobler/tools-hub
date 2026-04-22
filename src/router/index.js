import { createRouter, createWebHistory } from 'vue-router'
import JsonFormatter from '../views/JsonFormatter.vue'
import ColorConverter from '../views/ColorConverter.vue'
import Base64Converter from '../views/Base64Converter.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'json-formatter',
      component: JsonFormatter
    },
    { path: '/cores',
      name: 'color-converter',
      component: ColorConverter
    },
    { path: '/base64',
      name: 'base64',
      component: Base64Converter
    }
  ]
})

export default router