import { Outlet } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import axios from "axios";
import { setContext } from "@apollo/client/link/context";
import "./App.css";
import Header from "./components/Header/index";

// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("token");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const errorLink = onError(({ graphQLErrors, operation, forward }) => {
//   // Check if there are any graphQL errors
//   if (graphQLErrors) {
//     for (let err of graphQLErrors) {
//       // Look for UNAUTHENTICATED error
//       if (err.extensions?.code === "UNAUTHENTICATED") {
//         // Attempt to obtain a new token using the refresh token
//         return new Promise((resolve, reject) => {
//           axios
//             .post("/refresh_token" /* Your refresh token payload */)
//             .then((response) => {
//               const { token } = response.data;
//               localStorage.setItem("token", token);

//               // Update the headers with new token
//               operation.setContext(({ headers = {} }) => ({
//                 headers: {
//                   ...headers,
//                   authorization: `Bearer ${token}`,
//                 },
//               }));

//               // Retry the request with the new token
//               resolve(forward(operation));
//             })
//             .catch((error) => {
//               reject(error);
//             });
//         });
//       }
//     }
//   }
// });

// const client = new ApolloClient({
//   // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
//   // link: authLink.concat(httpLink),
//   link: ApolloLink.from([errorLink, authLink, httpLink]),
//   cache: new InMemoryCache(),
// });

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
export default function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="App">
        <Outlet />
      </div>
    </ApolloProvider>
  );
}
