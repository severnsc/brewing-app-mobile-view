import gql from "graphql-tag";

export const VALIDATE_USERNAME = gql`
  mutation validateUsername($username: String!) {
    validateUsername(username: $username) @client {
      user {
        errors
      }
    }
  }
`;

export const VALIDATE_EMAIL = gql`
  mutation validateEmail($email: String!) {
    validateEmail(email: $email) @client {
      user {
        errors
      }
    }
  }
`;
