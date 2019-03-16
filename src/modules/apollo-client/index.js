import ApolloClient from "apollo-boost";
import { GRAPHQL_URI } from "../../constants";
import { resolvers, defaults, typeDefs } from "../../graphql";

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  clientState: {
    defaults,
    resolvers,
    typeDefs
  },
  request: operation => operation.setContext({ client })
});

export default client;
