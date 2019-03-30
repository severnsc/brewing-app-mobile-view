import * as validators from "../../../modules/validation";
import { GET_USER } from "../../queries";
import {
  NETWORK_ERROR,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  NON_MATCHING_PASSWORD,
  NON_UNIQUE_EMAIL
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
    passwordUser.errors.length + confirmPasswordUser.errors.length;
  if (totalErrors > 0) {
    return {
      ...user,
      errors: [
        ...user.errors,
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
  validatePassword,
  createUser
};
