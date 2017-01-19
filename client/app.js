import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './components/App'

var VueMaterial = require('vue-material')
require('vue-material/dist/vue-material.css')
require('../static/css/layout.css')

import router from './router/router'
import store from './store'
sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})


// Vue Material
// Vue.use(VueMaterial)
Vue.use(VueMaterial.MdCore) //Required to boot vue material
Vue.use(VueMaterial.MdButton)
Vue.use(VueMaterial.MdIcon)
Vue.use(VueMaterial.MdToolbar)
Vue.use(VueMaterial.MdWhiteframe)

export {app, router, store}
