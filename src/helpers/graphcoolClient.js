import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

const link = new HttpLink({ uri: process.env.REACT_APP_GRAPHCOOL_URI });

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id,
});

export default new ApolloClient({
  link,
  cache,
});
