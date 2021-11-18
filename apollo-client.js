//import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import * as Realm from "realm-web";

export const APP_ID = "testapplication-wsiae";
const app = new Realm.App({ id: APP_ID });

async function getValidAccessToken() {
    // Guarantee that there's a logged in user with a valid access token
    if (!app.currentUser) {
      // If no user is logged in, log in an anonymous user. The logged in user will have a valid
      // access token.
      await app.logIn(Realm.Credentials.anonymous());
    } else {
      // An already logged in user's access token might be stale. To guarantee that the token is
      // valid, we refresh the user's custom data which also refreshes their access token.
      await app.currentUser.refreshCustomData();
    }
    
   // console.log(app.currentUser)
    return app.currentUser.accessToken;
  }
/*
const client = new ApolloClient({
    uri: `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`,
    cache: new InMemoryCache(),
});
*/
const client = new ApolloClient({
    link: new HttpLink({
      uri: `https://ap-southeast-1.aws.realm.mongodb.com/api/client/v2.0/app/testapplication-wsiae/graphql`,
      // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
      // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
      // access token before sending the request.
      fetch: async (uri, options) => {
        const accessToken = await getValidAccessToken();
        options.headers.Authorization = `Bearer ${accessToken}`;
        return fetch(uri, options);
      },
    }),
    cache: new InMemoryCache()
  });


export default client;