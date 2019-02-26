import React from "react";
import { ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { TextInput } from "../../components";
import { graphql, compose } from "react-apollo";
import { VALIDATE_USERNAME, UPDATE_USERNAME, GET_USER } from "../../graphql";
import debounce from "lodash.debounce";

const Container = ({
  updateUsername,
  validateUsername,
  validationLoading,
  onValidationChange,
  data: {
    user: { username, errors }
  },
  testID,
  style
}) => {
  const debouncedValidateUsername = debounce(
    username =>
      validateUsername({ variables: { username } }).then(() =>
        onValidationChange(false)
      ),
    1000
  );
  const debouncedOnValidationChange = debounce(
    () => onValidationChange(true),
    1000,
    {
      leading: true,
      trailing: false
    }
  );
  const onChange = username => {
    updateUsername({ variables: { username } });
    debouncedOnValidationChange();
    debouncedValidateUsername(username);
  };
  let isError = false;
  let usernameError = "";
  const usernameErrors = errors.filter(
    err => err.location.field === "username"
  );
  if (usernameErrors.length > 0) {
    isError = true;
    usernameError = usernameErrors.pop().message;
  }

  return (
    <React.Fragment>
      <TextInput
        isError={validationLoading ? false : isError}
        errorText={validationLoading ? "" : usernameError}
        onChange={onChange}
        value={username || ""}
        testID={testID}
        style={style}
        label="Username"
      />
      {validationLoading ? <ActivityIndicator /> : null}
    </React.Fragment>
  );
};

Container.propTypes = {
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
  updateUsername: PropTypes.func.isRequired,
  validateUsername: PropTypes.func.isRequired,
  validationLoading: PropTypes.bool,
  onValidationChange: PropTypes.func.isRequired,
  testID: PropTypes.string,
  style: PropTypes.object
};

Container.defaultProps = {
  data: {
    user: {
      username: "",
      email: "",
      errors: []
    }
  },
  updateUsername: () => {},
  validateUsername: () => {},
  validationLoading: false,
  onValidationChange: () => {}
};

const UsernameInput = compose(
  graphql(UPDATE_USERNAME, { name: "updateUsername" }),
  graphql(VALIDATE_USERNAME, { name: "validateUsername" }),
  graphql(GET_USER)
)(Container);

export default UsernameInput;
