import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/main'
import Home from '../views/home'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '',
      component: Main,
      children: [
        {
          path: '/',
          component: Home
        }
      ]
    },
  ]
})
