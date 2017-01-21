import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './components/App'

// Apollo
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';
// Vue Material
var VueMaterial = require('vue-material')
require('vue-material/dist/vue-material.css')
require('../static/css/layout.css')
// Router
import router from './router/router'
// import store from './store'
// sync(store, router)

const app = new Vue({
  router,
  // store,
  ...App
})

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/ciy2b682r0cj50147oosrzr1s',
  }),
  dataIdFromObject: r => r.id,
});

// Install the vue plugin
Vue.use(VueApollo, {
  apolloClient,
});


// Vue Material
// Vue.use(VueMaterial)
Vue.use(VueMaterial.MdCore) //Required to boot vue material
Vue.use(VueMaterial.MdButton)
Vue.use(VueMaterial.MdIcon)
Vue.use(VueMaterial.MdToolbar)
Vue.use(VueMaterial.MdWhiteframe)

export {app, router, store}
