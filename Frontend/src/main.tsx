import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client/react'
import { client } from './client/client.ts'

createRoot(document.getElementById('root')!).render(
  
  <ApolloProvider client={client}>
    <StrictMode>
      <App />
    </StrictMode>,
  </ApolloProvider>
)
