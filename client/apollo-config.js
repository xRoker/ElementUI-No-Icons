import ApolloClient, { createNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';
import { Client } from 'subscriptions-transport-ws'
import { print } from 'graphql-tag/printer';

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


// Subscriptions
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

export {VueApollo, apolloClient}