import gql from "graphql-tag";

const queryType = gql`
  type Query {
    user: User
  }
`;

export default queryType;
