import React from "react";
import { ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";
import { TextInput } from "../../components";
import { compose, graphql } from "react-apollo";
import { GET_USER, VALIDATE_EMAIL, UPDATE_EMAIL } from "../../graphql";
import debounce from "lodash.debounce";
import styles from "./styles";

const EmailInput = ({
  testID,
  style,
  data: {
    user: { email, errors }
  },
  updateEmail,
  validateEmail,
  validationLoading,
  onValidationChange
}) => {
  const debounced = debounce(
    email =>
      validateEmail({ variables: { email } })
        .then(() => onValidationChange(false))
        .catch(err => err),
    1000
  );
  const onChange = email => {
    updateEmail({ variables: { email } });
    onValidationChange(true);
    debounced(email);
  };
  let isError = false;
  let errorText = "";
  const emailErrors = errors.filter(error => error.location.field === "email");
  if (emailErrors.length > 0) {
    isError = true;
    errorText = emailErrors.pop().message;
  }
  return (
    <View>
      <TextInput
        onChange={onChange}
        value={email}
        testID={testID}
        style={style}
        label="Email"
        isError={validationLoading ? false : isError}
        errorText={validationLoading ? "" : errorText}
      />
      {validationLoading ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : null}
    </View>
  );
};

EmailInput.propTypes = {
  testID: PropTypes.string,
  style: PropTypes.object,
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
  updateEmail: PropTypes.func.isRequired,
  validateEmail: PropTypes.func.isRequired,
  validationLoading: PropTypes.bool,
  onValidationChange: PropTypes.func.isRequired
};

EmailInput.defaultProps = {
  data: {
    user: {
      username: "",
      email: "",
      errors: []
    }
  },
  validateEmail: () => {},
  updateEmail: () => {},
  validationLoading: false,
  onValidationChange: () => {}
};

export default compose(
  graphql(GET_USER),
  graphql(VALIDATE_EMAIL, { name: "validateEmail" }),
  graphql(UPDATE_EMAIL, { name: "updateEmail" })
)(EmailInput);
