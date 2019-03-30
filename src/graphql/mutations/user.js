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

export const LOGIN_USER = gql`
  mutation Login($user: UserInput!) {
    login(user: $user) {
      id
      username
      email
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      email
    }
  }
`;
