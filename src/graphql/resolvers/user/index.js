import * as validators from "../../../modules/validation";
import { GET_USER } from "../../queries";

const validateUsername = async (_, { username }, { cache }) => {
  const { user } = await cache.readQuery({ query: GET_USER });
  return validators
    .validateUsername(username)
    .then(bool => {
      if (bool) {
        const data = {
          user: {
            ...user,
            username,
            errors: user.errors.filter(err => err.location.field !== "username")
          }
        };
        cache.writeQuery({ query: GET_USER, data });
        return data.user;
      } else {
        const error = {
          __typename: "Error",
          message: "Username is already taken! Try another username.",
          location: {
            __typename: "Location",
            node: "user",
            field: "username"
          }
        };
        const data = {
          user: {
            ...user,
            username,
            errors: [...user.errors, error]
          }
        };
        cache.writeQuery({ query: GET_USER, data });
        return data.user;
      }
    })
    .catch(err => {
      const error = {
        __typename: "Error",
        message: "There was a problem with the network. Try again.",
        location: {
          __typename: "Location",
          node: "user",
          field: "username"
        }
      };
      const data = {
        user: {
          ...user,
          username,
          errors: [...user.errors, error]
        }
      };
      cache.writeQuery({ query: GET_USER, data });
      return data.user;
    });
};

const validateEmail = async (_, { email }, { cache }) => {
  const { user } = await cache.readQuery({ query: GET_USER });
  const isEmailValid = !!validators.validateEmail(email);
  if (!isEmailValid) {
    const error = {
      __typename: "Error",
      message: "Email is not valid!",
      location: {
        __typename: "Location",
        node: "user",
        field: "email"
      }
    };
    const data = {
      user: {
        ...user,
        email,
        errors: [...user.errors, error]
      }
    };
    cache.writeQuery({ query: GET_USER, data });
    return data.user;
  }
  return validators
    .isEmailUnique(email)
    .then(bool => {
      if (bool) {
        const data = {
          user: {
            ...user,
            email,
            errors: !!user.errors.length
              ? user.errors.filter(error => error.location.field !== "email")
              : []
          }
        };
        cache.writeQuery({ query: GET_USER, data });
        return data.user;
      } else {
        const error = {
          __typename: "Error",
          message: "Email is already taken! Try another email.",
          location: {
            __typename: "Location",
            node: "user",
            field: "email"
          }
        };
        const data = {
          user: {
            ...user,
            email,
            errors: [...user.errors, error]
          }
        };
        cache.writeQuery({ query: GET_USER, data });
        return data.user;
      }
    })
    .catch(err => {
      const error = {
        __typename: "Error",
        message: "There was a problem with the network. Try again.",
        location: {
          __typename: "Location",
          node: "user",
          field: "email"
        }
      };
      const data = {
        user: {
          ...user,
          email,
          errors: [...user.errors, error]
        }
      };
      cache.writeQuery({ query: GET_USER, data });
      return data.user;
    });
};

const validatePassword = async (_, { password }, { cache }) => {
  const { user } = await cache.readQuery({ query: GET_USER });
  const isPasswordValid = validators.validatePassword(password);
  if (isPasswordValid) {
    const data = {
      user: {
        ...user,
        errors: !!user.errors.length
          ? user.errors.filter(error => error.location.field !== "password")
          : []
      }
    };
    cache.writeQuery({ query: GET_USER, data });
    return data.user;
  } else {
    const error = {
      __typename: "Error",
      message: "Password is too short!",
      location: {
        __typename: "Location",
        node: "user",
        field: "password"
      }
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
};

export default {
  validateUsername,
  validateEmail,
  validatePassword
};