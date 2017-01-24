import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './components/App'
import {VueApollo, apolloClient} from 'apollo-config'

// Flex layout
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

export {app, router}