import userResolvers from "./user";

const resolvers = {
  Mutation: {
    ...userResolvers
  }
};

export default resolvers;
