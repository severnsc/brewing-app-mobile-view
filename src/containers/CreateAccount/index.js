import React from "react";
import PropTypes from "prop-types";
import { CREATE_USER } from "../../graphql";
import { graphql, compose } from "react-apollo";
import { CreateAccount } from "../../screens";
import { DASHBOARD } from "../../constants";
import {
  validateUsername,
  validateEmail,
  isEmailUnique
} from "../../modules/validation";

const CreateAccountContainer = ({ mutate, navigation }) => {
  const createAccount = ({ username }, { email }, password, confirmPassword) =>
    mutate({
      variables: {
        user: {
          username,
          email,
          password: password.value,
          confirmPassword: confirmPassword.value
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
  const onEmailChange = email => {
    const result = { valid: true, unique: true };
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) return { ...result, valid: false };
    return isEmailUnique(email).then(bool => ({ ...result, unique: bool }));
  };
  return (
    <CreateAccount
      createAccount={createAccount}
      onUsernameChange={validateUsername}
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
