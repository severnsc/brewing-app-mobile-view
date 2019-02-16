import * as validators from "../../modules/validation";
import { GET_USER } from "../queries";

const validateUsername = (_, { username }, { cache }) => {
  const { user } = cache.readQuery({ query: GET_USER });
  validators.validateUsername(username).then(bool => {
    if (bool) {
      return user;
    } else {
      const error = {
        __typename: "Error",
        message: "Username is already taken! Try another username.",
        node: "user",
        field: "username"
      };
      const data = {
        user: {
          ...user,
          errors: [...user.errors, error]
        }
      };
      cache.writeQuery({ query: GET_USER, data });
      return data.user;
    }
  });
};

const validateEmail = (_, { email }, { cache }) => {
  const { user } = cache.readQuery({ query: GET_USER });
  const isEmailValid = !!validators.validateEmail(email);
  if (!isEmailValid) {
    const error = {
      __typename: "Error",
      message: "Email is not valid!",
      node: "user",
      field: "email"
    };
    const data = {
      user: {
        ...user,
        errors: [...user.errors, error]
      }
    };
    cache.writeQuery({ query: GET_USER, data });
    return data.user;
  }
  validators.isEmailUnique(email).then(bool => {
    if (bool) {
      return user;
    } else {
      const error = {
        __typename: "Error",
        message: "Email is already taken! Try another email.",
        node: "user",
        field: "email"
      };
      const data = {
        user: {
          ...user,
          errors: [...user.errors, error]
        }
      };
      cache.writeQuery({ query: GET_USER, data });
      return data.user;
    }
  });
};
