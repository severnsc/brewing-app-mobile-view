import React from "react";
import PropTypes from "prop-types";
import { CREATE_USER } from "../../graphql";
import { graphql, compose } from "react-apollo";
import { CreateAccount } from "../../screens";
import { DASHBOARD } from "../../constants";
import { validateUsername } from "../../modules/validation";

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
  return (
    <CreateAccount
      createAccount={createAccount}
      onUsernameChange={validateUsername}
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
