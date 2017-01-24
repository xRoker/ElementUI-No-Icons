import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './components/App'
import {VueApollo, apolloClient} from 'apollo-config'

// Vue Material
const VueMaterial = require('vue-material')
require('vue-material/dist/vue-material.css')
require('../static/css/layout.css')

// Element UI
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Element)
// Router
import router from './router/router'

const app = new Vue({
  router,
  ...App
})

// Install the vue plugin
Vue.use(VueApollo, {
  apolloClient,
});


// Vue Material
Vue.use(VueMaterial)
// Vue.use(VueMaterial.MdCore) //Required to boot vue material
// Vue.use(VueMaterial.MdButton)
// Vue.use(VueMaterial.MdIcon)
// Vue.use(VueMaterial.MdToolbar)
// Vue.use(VueMaterial.MdWhiteframe)

export {app, router}