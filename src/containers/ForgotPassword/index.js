import React, { useState } from "react";
import PropTypes from "prop-types";
import { ForgotPassword } from "../../screens";
import { graphql, compose } from "react-apollo";
import { FORGOT_PASSWORD } from "../../graphql";
import { FORGOT_PASSWORD_CONFIRM, NETWORK_ERROR } from "../../constants";
import { validateEmail } from "../../modules/validation";

export const ForgotPasswordContainer = ({
  mutate,
  navigation: { navigate }
}) => {
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = value => {
    setLoading(true);
    const isEmailValid = validateEmail(value);
    console.log("isEmailValid", isEmailValid);
    if (isEmailValid) {
      mutate({ variables: { email: value } })
        .then(() => navigate(FORGOT_PASSWORD_CONFIRM))
        .catch(() => setForgotPasswordError(NETWORK_ERROR));
    } else {
      setIsError(true);
    }
    setLoading(false);
  };
  return (
    <ForgotPassword
      onSubmit={onSubmit}
      isError={isError}
      value={value}
      onChange={setValue}
      loading={loading}
      forgotPasswordError={forgotPasswordError}
    />
  );
};

ForgotPasswordContainer.propTypes = {
  mutate: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

ForgotPasswordContainer.defaultProps = {
  mutate: () => {},
  navigation: {
    navigate: () => {}
  }
};

export default compose(graphql(FORGOT_PASSWORD))(ForgotPasswordContainer);
