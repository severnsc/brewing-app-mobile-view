import gql from "graphql-tag";

export const GET_USER = gql`
  query User(
    $excludeUsername: Boolean = false
    $excludeEmail: Boolean = false
    $excludeErrors: Boolean = false
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
