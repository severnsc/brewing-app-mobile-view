import { ApolloServer, AuthenticationError } from "apollo-server";
import schema from "./typeDefs";

const mockUser = {
  id: "1",
  username: "username",
  email: "email@example.com"
};

const mocks = {
  Mutation: () => ({
    login: (parent, args, context, info) => {
      if (context.valid) {
        return mockUser;
      } else {
        throw new AuthenticationError("invalid credentials!");
      }
    }
  })
};

let httpServer;
export const startServer = (context = { valid: true }) => {
  const server = new ApolloServer({ schema, mocks, context });
  server.listen().then(({ url, server }) => {
    console.log(`🚀  Server ready at ${url}`);
    httpServer = server;
  });
};

export const stopServer = () =>
  new Promise((resolve, reject) => httpServer.close(() => resolve()));
