import React from "react";
import PropTypes from "prop-types";
import { GET_USER, CREATE_USER } from "../../graphql";
import { graphql, compose } from "react-apollo";
import { CreateAccount } from "../../screens";

const CreateAccountContainer = ({
  data: {
    user: { username, email }
  },
  mutate
}) => {
  const createAccount = (
    usernameLoading,
    emailLoading,
    password,
    confirmPassword
  ) => {
    mutate({
      variables: {
        username,
        email,
        password,
        confirmPassword
      }
    });
  };
  return <CreateAccount createAccount={createAccount} />;
};

CreateAccountContainer.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      errors: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.arrayOf(
          PropTypes.shape({
            message: PropTypes.string,
            location: PropTypes.shape({
              node: PropTypes.string,
              field: PropTypes.string
            })
          })
        )
      ])
    })
  }).isRequired,
  mutate: PropTypes.func.isRequired
};

CreateAccountContainer.defaultProps = {
  data: {
    user: {
      username: "",
      email: "",
      errors: []
    }
  },
  mutate: () => {}
};

export default compose(
  graphql(GET_USER),
  graphql(CREATE_USER)
)(CreateAccountContainer);
