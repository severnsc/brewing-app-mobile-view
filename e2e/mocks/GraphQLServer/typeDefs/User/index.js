import gql from "graphql-tag";

const userType = gql`
  type User {
    id: ID
    username: String
    email: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
`;

export default userType;
