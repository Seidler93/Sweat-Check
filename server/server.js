// const express = require('express');
// const { ApolloServer, PubSub } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');
// const path = require('path');
// const { authMiddleware } = require('./utils/auth')
// const { SubscriptionServer } = require('subscriptions-transport-ws')
// const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');
// const { createServer } = require('http')
// const { makeExecutableSchema } = require('@graphql-tools/schema');
// const { execute, subscribe } = require('graphql')
// const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
// const WebSocketServer = require('ws');
// const { useServer } = require('graphql-ws/lib/use/ws');
// const cors = require('cors');
// const mongoose = require('mongoose');


// const app = express();

// // Save the returned server's info so we can shutdown this server later
// const server = new ApolloServer({
//   // typeDefs,
//   // resolvers,
//   schema,
//   plugins: [
//     // Proper shutdown for the HTTP server.
//     ApolloServerPluginDrainHttpServer({ httpServer }),

//     // Proper shutdown for the WebSocket server.
//     {
//       async serverWillStart() {
//         return {
//           async drainServer() {
//             await serverCleanup.dispose();
//           },
//         };
//       },
//     },
//   ],
// });

// // Create our WebSocket server using the HTTP server we just set up.
// const wsServer = new WebSocketServer({
//   server: server,
//   path: '/subscriptions',
// });

// const serverCleanup = useServer({ schema }, wsServer);

// const startApolloServer = async () => {
//   await server.start();

//   app.use(express.urlencoded({ extended: false }));
//   app.use(express.json());

//   app.use('/graphql', expressMiddleware(server, {
//     context: authMiddleware
//   }));

//   if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')));

//     app.get('*', (req, res) => {
//       res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//     });
//   }

//   app.use(cors());


//   db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//       console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//     });
//   });
// };

// // Call the async function to start the server
// startApolloServer();



// (async function() {
//   const app = express()

//   const httpsServer = createServer(app)

//   const schema = makeExecutableSchema({
//     typeDefs, 
//     resolvers
//   })

//   const subscriptionServer = SubscriptionServer.create(
//     { schema, execute, subscribe },
//     { server: httpsServer, path: '/graphql'}
//   )

//   const server = new ApolloServer({
//     schema, 
//     plugins: [
//       {
//         async serverWillStart() {
//           return {
//             async drainServer() {
//               subscriptionServer.close()
//             }
//           }
//         }
//       }
//     ]
//   })

//   await server.start()
//   server.applyMiddleware({ app })

//   mongoose.connect((process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sweat-check-db'), {useNewUrlParser: true});

//   const PORT = 4000;

//   httpsServer.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//     console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//   })
// })();

// const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
// const WebSocketServer = require('ws');
// const { useServer } = require('graphql-ws/lib/use/ws');
// const cors = require('cors');
// const express = require('express');
// const { ApolloServer, PubSub } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');
// const path = require('path');
// const { authMiddleware } = require('./utils/auth')
// const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');
// const { createServer } = require('http')
// const { makeExecutableSchema } = require('@graphql-tools/schema');
// const { execute, subscribe } = require('graphql')

// const PORT = process.env.PORT || 3001;

// // Create the schema, which will be used separately by ApolloServer and
// // the WebSocket server.
// const schema = makeExecutableSchema({ typeDefs, resolvers });

// // Create an Express app and HTTP server; we will attach both the WebSocket
// // server and the ApolloServer to this HTTP server.
// const app = express();
// const httpServer = createServer(app);

// // console.log(httpServer);
// console.log(`WebSocket server will listen at ws://localhost:${PORT}/subscriptions`);

// // Create our WebSocket server using the HTTP server we just set up.
// const wsServer = new WebSocketServer({
//   server: httpServer,
//   path: '/subscriptions',
// });
// // Save the returned server's info so we can shutdown this server later
// const serverCleanup = useServer({ schema }, wsServer);

// // Set up ApolloServer.
// const server = new ApolloServer({
//   schema,
//   introspection: true,
//   plugins: [
//     // Proper shutdown for the HTTP server.
//     ApolloServerPluginDrainHttpServer({ httpServer }),

//     // Proper shutdown for the WebSocket server.
//     {
//       async serverWillStart() {
//         return {
//           async drainServer() {
//             await serverCleanup.dispose();
//           },
//         };
//       },
//     },
//   ],
// });

// const startApolloServer = async () => {
//   try {
//     await server.start();
  
//     app.use(express.urlencoded({ extended: false }));
//     app.use(express.json());
  
//     app.use('/graphql', expressMiddleware(server, {
//       context: authMiddleware
//     }));

//     if (process.env.NODE_ENV === 'production') {
//       app.use(express.static(path.join(__dirname, '../client/dist')));
  
//       app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//       });
//     }
  
//     // Now that our HTTP server is fully set up, we can listen to it.
//     db.once('open', () => {
//       httpServer.listen(PORT, () => {
//         console.log(`API server running on port ${PORT}!`);
//         console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//       });
//     });
//   } catch (error) {
//     console.error('Error starting Apollo Server:', error);
//   }
// }

// // Call the async function to start the server
// startApolloServer();

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth')

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();