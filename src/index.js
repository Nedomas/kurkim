import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink } from 'apollo-client-preset'

import store, { history } from './store';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const link = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI });
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client} key='apolloProvider'>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ApolloProvider>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
