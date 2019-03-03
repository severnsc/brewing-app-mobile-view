import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../components";
import { graphql, compose } from "react-apollo";
import { GET_USER, VALIDATE_PASSWORD } from "../../graphql";

const PasswordInputContainer = ({
  onChange,
  value,
  testID,
  style,
  data,
  mutate
}) => {
  const passwordErrors = data.user.errors.filter(
    err => err.location.field === "password"
  );
  const isError = passwordErrors.length > 0;
  const errorText = isError ? passwordErrors[0].message : "";
  const onPasswordChange = password => {
    onChange(password);
    mutate({ variables: { password } });
  };
  return (
    <TextInput
      onChange={onPasswordChange}
      value={value}
      testID={testID}
      errorTestID="passwordInputError"
      style={style}
      isError={isError}
      errorText={errorText}
      label="Password"
      password
    />
  );
};

PasswordInputContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  testID: PropTypes.string,
  style: PropTypes.object,
  data: PropTypes.shape({
    user: PropTypes.shape({
      errors: PropTypes.arrayOf(
        PropTypes.shape({
          message: PropTypes.string,
          location: PropTypes.shape({
            node: PropTypes.string,
            field: PropTypes.string
          })
        })
      ).isRequired
    }).isRequired
  }).isRequired,
  mutate: PropTypes.func.isRequired
};

PasswordInputContainer.defaultProps = {
  onChange: () => {},
  value: "",
  data: {
    user: {
      errors: []
    }
  },
  mutate: () => {}
};

export default compose(
  graphql(GET_USER, {
    variables: { excludeUsername: true, excludeEmail: true }
  }),
  graphql(VALIDATE_PASSWORD)
)(PasswordInputContainer);
