import { createRouter, createWebHistory } from 'vue-router'
//import Home from '../views/Home.vue'
import RutaLista from '../components/RutaLista'
import RutaDetalle from '../components/RutaDetalle'
import Inicio from '../components/Inicio'
import Registrarse from '../components/Registrarse'
import Salir from '../components/Salir'


const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/registrarse',
    name: 'Registrarse',
    component: Registrarse
  },
  {
    path: '/lista',
    name: 'RutaLista',
    component: RutaLista
  },
  {
    path: '/detalle/:id',
    name: 'RutaDetalle',
    component: RutaDetalle
  },
  {
    path: '/salir',
    name: 'Salir',
    component: Salir
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
