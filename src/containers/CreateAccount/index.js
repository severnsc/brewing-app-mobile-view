import React from "react";
import PropTypes from "prop-types";
import { CREATE_USER } from "../../graphql";
import { graphql, compose } from "react-apollo";
import { CreateAccount } from "../../screens";
import {
  DASHBOARD,
  NETWORK_ERROR,
  NON_UNIQUE_USERNAME,
  NON_UNIQUE_EMAIL,
  INVALID_EMAIL
} from "../../constants";
import {
  validateUsername,
  validateEmail,
  isEmailUnique
} from "../../modules/validation";

const CreateAccountContainer = ({ mutate, navigation }) => {
  const createAccount = (
    { username },
    { email },
    { value: password },
    { value: confirmPassword }
  ) => {
    if (password !== confirmPassword) return Promise.resolve();
    return mutate({
      variables: {
        user: {
          username,
          email,
          password,
          confirmPassword
        }
      }
    }).then(({ data: { createUser } }) => {
      if (createUser.errors.length === 0) {
        navigation.navigate(DASHBOARD);
      }
      if (createUser.errors.find(err => err.location.field === "createUser")) {
        return Promise.reject();
      }
      return createUser;
    });
  };
  const onUsernameChange = username => {
    return validateUsername(username)
      .then(bool => (bool ? "" : NON_UNIQUE_USERNAME))
      .catch(() => Promise.reject(new Error(NETWORK_ERROR)));
  };
  const onEmailChange = email => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) return Promise.resolve(INVALID_EMAIL);
    return isEmailUnique(email)
      .then(bool => (bool ? "" : NON_UNIQUE_EMAIL))
      .catch(() => Promise.reject(new Error(NETWORK_ERROR)));
  };
  return (
    <CreateAccount
      createAccount={createAccount}
      onUsernameChange={onUsernameChange}
      onEmailChange={onEmailChange}
    />
  );
};

CreateAccountContainer.propTypes = {
  mutate: PropTypes.func.isRequired
};

CreateAccountContainer.defaultProps = {
  mutate: () => {}
};

export default compose(graphql(CREATE_USER))(CreateAccountContainer);
