import gql from "graphql-tag";

const mutationType = gql`
  type Mutation {
    createUser(user: UserInput!): User
    login(user: UserInput!): User
    forgotPassword(email: String!): User
  }
`;

export default mutationType;
