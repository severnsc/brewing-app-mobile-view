import { ApolloServer } from "apollo-server";
import schema from "./typeDefs";

const server = new ApolloServer({ schema, mocks: true });

let httpServer;
export const startServer = () => {
  server.listen().then(({ url, server }) => {
    console.log(`🚀  Server ready at ${url}`);
    httpServer = server;
  });
};

export const stopServer = () =>
  new Promise((resolve, reject) => httpServer.close(() => resolve()));
