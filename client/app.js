import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './components/App'

var VueMaterial = require('vue-material')
require('vue-material/dist/vue-material.css')

import router from './router'
import store from './store'
sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

Vue.use(VueMaterial)

export {app, router, store}
