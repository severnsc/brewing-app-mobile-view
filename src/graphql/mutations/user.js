import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) @client {
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

export const CREATE_USER_REMOTE = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      id
      username
      email
    }
  }
`;

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

export const LOGIN_USER = gql`
  mutation Login($user: UserLoginInput!) {
    login(user: $user) {
      id
      username
      email
    }
  }
`;
