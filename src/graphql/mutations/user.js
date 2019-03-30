import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      id
      username
      email
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
