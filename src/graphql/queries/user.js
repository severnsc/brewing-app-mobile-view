import gql from "graphql-tag";

export const GET_USER = gql`
  query {
    user @client {
      id
      username
      email
      errors {
        message
        location {
          node
          field
        }
      }
    }
  }
`;
