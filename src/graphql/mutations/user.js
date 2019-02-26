import gql from "graphql-tag";

export const UPDATE_USERNAME = gql`
  mutation updateUsername($username: String!) {
    updateUsername(username: $username) @client {
      user {
        username
        errors {
          message
          location {
            node
            field
          }
        }
      }
    }
  }
`;

export const VALIDATE_USERNAME = gql`
  mutation validateUsername($username: String!) {
    validateUsername(username: $username) @client {
      user {
        errors {
          message
          location {
            node
            field
          }
        }
      }
    }
  }
`;

export const VALIDATE_EMAIL = gql`
  mutation validateEmail($email: String!) {
    validateEmail(email: $email) @client {
      user {
        errors {
          message
          location {
            node
            field
          }
        }
      }
    }
  }
`;
