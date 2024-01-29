// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import UserProvider from '../src/utils/UserContext';

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
//   HttpLink, 
//   split
// } from '@apollo/client';
// import { getMainDefinition } from '@apollo/client/utilities';
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { createClient } from 'graphql-ws';
// import { setContext } from '@apollo/client/link/context';
// import { Outlet } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import Auth from '../src/utils/auth'
// import Header from './components/Header';

// const wsLink = new GraphQLWsLink(createClient({
//   url: 'ws://localhost:3001/subscriptions',
// }));

// // Construct our main GraphQL API endpoint
// // const httpLink = createHttpLink({
// //   uri: '/graphql',
// // });

// const httpLink = new HttpLink({
//   uri: 'http://localhost:3001/graphql',
// });

// // The split function takes three parameters:
// //
// // * A function that's called for each operation to execute
// // * The Link to use for an operation if the function returns a "truthy" value
// // * The Link to use for an operation if the function returns a "falsy" value
// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('id_token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const client = new ApolloClient({
//   // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
//   link: authLink.concat(splitLink),
//   // link: authLink.concat(httpLink),
//   // link: splitLink,
//   cache: new InMemoryCache(),
// });

// export default function App() {
//   console.log(Auth.loggedIn());
//   return (
//     <ApolloProvider client={client}>
//       <UserProvider>
//         {Auth.loggedIn() ? (
//           <>
//             <Header/>
//             <Outlet/> 
//           </> 
//         ) : (
//           <LoginPage/> 
//         )}
//       </UserProvider>
//     </ApolloProvider>
//   );
// }


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProvider from '../src/utils/UserContext';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Auth from '../src/utils/auth'
import Header from './components/Header';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  console.log(Auth.loggedIn());
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        {Auth.loggedIn() ? (
          <>
            <Header/>
            <Outlet/> 
          </> 
        ) : (
          <LoginPage/> 
        )}
      </UserProvider>
    </ApolloProvider>
  );
}


