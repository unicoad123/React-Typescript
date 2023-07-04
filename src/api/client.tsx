import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://z0xi8qy1ga.execute-api.us-east-1.amazonaws.com/dev/graphql',
    cache: new InMemoryCache(),
});

export default client;
