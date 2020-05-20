import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('../views/Home/home')
const classify = () => import('../views/Classify/classify')
const cart = () => import('../views/Cart/cart')
const profile = () => import('../views/Profile/profile')
const Detail = () => import('../views/detail/Detail')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/classify',
      component: classify
    },
    {
      path: '/cart',
      component: cart
    },
    {
      path: '/profile',
      component: profile
    },
    {
      path: '/detail/:iid',
      component: Detail
    }
  ]
})

