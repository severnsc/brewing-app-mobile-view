import ApolloClient from "apollo-boost";
import { GRAPHQL_URI } from "../../constants";
import { resolvers, defaults } from "../../resolvers";
import typeDefs from "../../schema";

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
});

export default client;
