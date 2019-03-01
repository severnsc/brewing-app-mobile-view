import gql from "graphql-tag";

export const UPDATE_USER = gql`
  mutation updateUser($edit: UserEdit!) {
    updateUser(edit: $edit) @client {
      user {
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

export const VALIDATE_PASSWORD = gql`
  mutation validatePassword($password: String!) {
    validatePassword(password: $password) @client {
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
