import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/Home/home'
import second from '@/view/Second/second'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/second',
      name: 'second',
      component: second
    }
  ]
})
