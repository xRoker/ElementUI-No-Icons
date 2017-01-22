import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './components/App'

// Apollo
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';
import { Client } from 'subscriptions-transport-ws'
import { print } from 'graphql-tag/printer';
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
const wsClient = new Client('ws://subscriptions.graph.cool/ciy2b682r0cj50147oosrzr1s');
const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/ciy2b682r0cj50147oosrzr1s',
})
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
)

const apolloClient = new ApolloClient({ 
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: r => r.id,
});

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

export {app, router, store}

function addGraphQLSubscriptions(networkInterface, wsClient) {
  if (!networkInterface) {
    throw new TypeError('addGraphQLSubscriptions requires a networkInterface')
  }

  if (!wsClient) {
    throw new TypeError('addGraphQLSubscriptions requires a wsClient')
  }

  return Object.assign(networkInterface, {
    subscribe(request, cb) {
      return wsClient.subscribe({
        ...request,
        query: print(request.query)
      }, cb)
    },
    unsubscribe(id) {
      wsClient.unsubscribe(id);
    },
  })
}
