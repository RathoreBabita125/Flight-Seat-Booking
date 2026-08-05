import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './client/client.ts';
import { store } from './redux/store.ts';
import { Provider } from "react-redux";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <StrictMode>
        <App />
      </StrictMode>,
    </ApolloProvider>
  </Provider>
)
