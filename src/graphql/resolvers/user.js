import * as validators from "../../modules/validation";
import { GET_USER } from "../queries";

const validateUsername = (_, { username }, { cache }) => {
  validators.validateUsername(username).then(bool => {
    const { user } = cache.readQuery({ query: GET_USER });
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
