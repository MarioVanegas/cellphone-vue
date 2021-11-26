import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( /* webpackChunkName: "home" */ '../views/Home.vue')
  },  
  {
    path: '/anuncio/:id',
    name: 'Anuncio',
    component: () => import( /* webpackChunkName: "anuncio" */ '../views/Anuncio.vue')
  },
  {
    path: '/carrito',
    name: 'Carrito',
    component: () => import( /* webpackChunkName: "carrito" */ '../views/Carrito.vue')
  },
  {
    path: '/estadisticas',
    name: 'Estadisticas',
    component: () => import( /* webpackChunkName: "estadisticas" */ '../views/Estadisticas.vue')
  },
  {
    path: '*',
    name: 'Error404',
    component: () => import( /* webpackChunkName: "error404" */ '../views/Error404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
