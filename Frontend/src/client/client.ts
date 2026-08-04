import { InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client";
import { ApolloClient } from "@apollo/client";

export const client=new ApolloClient({
    link: new HttpLink({
        uri:'http://localhost:4000/graphql',
        credentials:'include'
    }),
    cache: new InMemoryCache()
});