import * as validators from "../../../modules/validation";
import { GET_USER } from "../../queries";
import {
  NETWORK_ERROR,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  NON_MATCHING_PASSWORD,
  NON_UNIQUE_USERNAME,
  NON_UNIQUE_EMAIL,
  EMPTY_USERNAME
} from "../../../constants/errorMessages";
import { CREATE_USER_REMOTE } from "../../mutations";

const updateUser = async (_, { edit }, { cache }) => {
  const { user } = await cache.readQuery({ query: GET_USER });
  const data = {
    user: {
      ...user,
      ...edit
    }
  };
  await cache.writeQuery({ query: GET_USER, data });
  return data.user;
};

const validateEmail = async (_, { email }, { cache }) => {
  const { user } = await cache.readQuery({
    query: GET_USER,
    variables: { excludeEmail: true, excludeUsername: true }
  });
  const isEmailValid = !!validators.validateEmail(email);
  if (!isEmailValid) {
    const error = {
      __typename: "Error",
      message: INVALID_EMAIL,
      location: {
        __typename: "Location",
        node: "user",
        field: "email"
      }
    };
    const data = {
      user: {
        ...user,
        errors: [...user.errors, error]
      }
    };
    await cache.writeQuery({
      query: GET_USER,
      data,
      variables: { excludeEmail: true, excludeUsername: true }
    });
    return data.user;
  }
  return validators
    .isEmailUnique(email)
    .then(async bool => {
      if (bool) {
        const data = {
          user: {
            ...user,
            errors: !!user.errors.length
              ? user.errors.filter(error => error.location.field !== "email")
              : []
          }
        };
        await cache.writeQuery({
          query: GET_USER,
          data,
          variables: { excludeEmail: true, excludeUsername: true }
        });
        return data.user;
      } else {
        const error = {
          __typename: "Error",
          message: NON_UNIQUE_EMAIL,
          location: {
            __typename: "Location",
            node: "user",
            field: "email"
          }
        };
        const data = {
          user: {
            ...user,
            errors: [...user.errors, error]
          }
        };
        await cache.writeQuery({
          query: GET_USER,
          data,
          variables: { excludeEmail: true, excludeUsername: true }
        });
        return data.user;
      }
    })
    .catch(async err => {
      const error = {
        __typename: "Error",
        message: NETWORK_ERROR,
        location: {
          __typename: "Location",
          node: "user",
          field: "email"
        }
      };
      const data = {
        user: {
          ...user,
          errors: [...user.errors, error]
        }
      };
      await cache.writeQuery({
        query: GET_USER,
        data,
        variables: { excludeEmail: true, excludeUsername: true }
      });
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
    await cache.writeQuery({ query: GET_USER, data });
    return data.user;
  } else {
    const error = {
      __typename: "Error",
      message: INVALID_PASSWORD,
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
    await cache.writeQuery({ query: GET_USER, data });
    return data.user;
  }
};

const createUser = async (_, { user: userInput }, { cache, client }) => {
  const { user } = await cache.readQuery({ query: GET_USER });
  const emailUser = await validateEmail(
    _,
    { email: userInput.email },
    { cache }
  );
  const passwordUser = await validatePassword(
    _,
    { password: userInput.password },
    { cache }
  );

  const { confirmPassword, ...newUserInput } = userInput;
  const { password } = userInput;
  const confirmPasswordError = {
    __typename: "Error",
    message: NON_MATCHING_PASSWORD,
    location: {
      __typename: "Location",
      node: "user",
      field: "confirmPassword"
    }
  };
  const confirmPasswordUser =
    confirmPassword !== password
      ? { ...user, errors: [...user.errors, confirmPasswordError] }
      : user;
  const totalErrors =
    emailUser.errors.length +
    passwordUser.errors.length +
    confirmPasswordUser.errors.length;
  if (totalErrors > 0) {
    return {
      ...user,
      errors: [
        ...user.errors,
        ...emailUser.errors,
        ...passwordUser.errors,
        ...confirmPasswordUser.errors
      ]
    };
  }
  return client
    .mutate({
      mutation: CREATE_USER_REMOTE,
      variables: {
        user: newUserInput
      }
    })
    .then(async ({ data: { createUser } }) => {
      await cache.writeQuery({
        query: GET_USER,
        data: { user: { ...user, ...createUser } }
      });
      return { ...createUser, errors: [] };
    })
    .catch(e => {
      return {
        ...user,
        errors: [
          {
            __typename: "Error",
            message: NETWORK_ERROR,
            location: {
              __typename: "Location",
              node: "user",
              field: "createUser"
            }
          }
        ]
      };
    });
};

export default {
  updateUser,
  validateEmail,
  validatePassword,
  createUser
};
