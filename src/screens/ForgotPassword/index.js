import React from "react";
import PropTypes from "prop-types";
import { GradientView, TextInput, Button, Text } from "../../components";
import {
  KeyboardAvoidingView,
  ActivityIndicator,
  AlertIOS,
  View
} from "react-native";
import styles from "../styles";
import { INVALID_EMAIL, white } from "../../constants";
import _ from "lodash";

const alert = (title, message) => AlertIOS.alert(title, message);

const alertDebounced = _.debounce(alert, 1000, { leading: true });

const ForgotPassword = ({
  onSubmit,
  isError,
  onChange,
  value,
  loading,
  forgotPasswordError
}) => {
  const _onSubmit = () => onSubmit(value);
  return (
    <GradientView>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.form}>
          {!!forgotPasswordError &&
            alertDebounced("Error!", forgotPasswordError)}
          <TextInput
            errorText={isError ? INVALID_EMAIL : ""}
            isError={isError}
            onChange={onChange}
            label="Email"
            value={value}
            style={styles.input}
            errorTestID="invalidEmailError"
            testID="forgotPasswordInput"
          />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Button
              success={true}
              textColor={white}
              value="Send Email"
              onPress={_onSubmit}
              testID="forgotPasswordButton"
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </GradientView>
  );
};

ForgotPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  loading: PropTypes.bool
};

ForgotPassword.defaultProps = {
  onSubmit: () => {},
  onChange: () => {},
  isError: false,
  value: "",
  loading: false
};

export default ForgotPassword;
