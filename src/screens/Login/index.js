import React from "react";
import PropTypes from "prop-types";
import { GradientView, TextInput, Button, Text } from "../../components";
import { KeyboardAvoidingView, View } from "react-native";
import styles from "./styles";
import { white, primary, INVALID_LOGIN, NETWORK_ERROR } from "../../constants";
import { AlertIOS, ActivityIndicator } from "react-native";
import _ from "lodash";

const alert = (title, message) => AlertIOS.alert(title, message);

const alertDebounced = _.debounce(alert, 1000, { leading: true });

const Login = ({
  isError,
  username,
  setUsername,
  password,
  setPassword,
  submit,
  forgotPassword,
  loading,
  loginError
}) => (
  <GradientView>
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.form}>
        {!!loginError && alertDebounced("Error!", loginError)}
        {isError ? (
          <Text danger={true} value={INVALID_LOGIN} testID="loginErrorText" />
        ) : null}
        <TextInput
          label="Username"
          onChange={setUsername}
          style={styles.input}
          value={username}
          testID="usernameInput"
        />
        <TextInput
          label="Password"
          password={true}
          onChange={setPassword}
          style={styles.input}
          value={password}
          testID="passwordInput"
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            value="Login"
            onPress={submit}
            success={true}
            textColor={white}
            testID="submitButton"
          />
        )}
        <Button
          value="Forgot password"
          onPress={forgotPassword}
          style={styles.forgotPassword}
          textColor={primary}
          testID="ToForgotPassword"
        />
      </View>
    </KeyboardAvoidingView>
  </GradientView>
);

Login.propTypes = {
  isError: PropTypes.bool,
  forgotPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  setPassword: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  loginError: PropTypes.string
};

Login.defaultProps = {
  isError: false,
  forgotPassword: () => {},
  setUsername: () => {},
  setPassword: () => {},
  submit: () => {}
};

export default Login;
