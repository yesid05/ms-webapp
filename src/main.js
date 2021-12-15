import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { setContext } from '@apollo/client/link/context';

// HTTP connection to the API
// https://pharos.sh/creacion-de-api-graphql-con-vue-js-y-apollo-client/
// https://www.learmoreseekmore.com/2021/08/vue3-consume-graphql-endpoint-using-vue-apollo.html
const httpLink = createHttpLink({
    // You should use an absolute URL here
    //uri: 'http://localhost:4000/graphql',
    uri: 'https://mision-tic-api-gateway-yca.herokuapp.com/graphql',
  })
  
  // Cache implementation
  const cache = new InMemoryCache()
  
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Token ${token}` : "",
      }
    }
  });

  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  })

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

createApp(App)
    .use(router)
    .use(apolloProvider)
    .mount('#app')
