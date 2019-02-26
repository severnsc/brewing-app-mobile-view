import gql from "graphql-tag";

export const GET_USER = gql`
  query User(
    $excludeUsername: Boolean
    $excludeEmail: Boolean
    $excludeErrors: Boolean
  ) {
    user @client {
      id
      username @skip(if: $excludeUsername)
      email @skip(if: $excludeEmail)
      errors @skip(if: $excludeErrors) {
        message
        location {
          node
          field
        }
      }
    }
  }
`;
