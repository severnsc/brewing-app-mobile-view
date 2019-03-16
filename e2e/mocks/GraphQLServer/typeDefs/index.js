import { makeExecutableSchema } from "apollo-server";
import userType from "./User";
import queryType from "./Query";
import mutationType from "./Mutation";

export default makeExecutableSchema({
  typeDefs: [queryType, mutationType, userType]
});
