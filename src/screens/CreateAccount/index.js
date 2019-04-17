import React from "react";
import { ActivityIndicator, View, AlertIOS } from "react-native";
import PropTypes from "prop-types";
import {
  Button,
  GradientView,
  ConfirmPasswordInput,
  TextInput
} from "../../components";
import { KeyboardAvoidingView } from "react-native";
import styles from "../styles";
import { white } from "../../constants";

const CreateAccount = ({
  createAccount,
  createAccountError,
  username,
  usernameError,
  setUsername,
  usernameLoading,
  email,
  emailError,
  setEmail,
  emailLoading,
  password,
  passwordError,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  createAccountLoading
}) => (
  <GradientView>
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.form}>
        {createAccountError && AlertIOS.alert("Error!", createAccountError)}
        <TextInput
          label="Username"
          testID="signupUsername"
          errorTestID="usernameInputError"
          style={styles.input}
          value={username}
          isError={!!usernameError}
          errorText={usernameError}
          loading={usernameLoading}
          onChange={setUsername}
        />
        <TextInput
          label="Email"
          testID="signupEmail"
          errorTestID="emailInputError"
          style={styles.input}
          value={email}
          isError={!!emailError}
          errorText={emailError}
          onChange={setEmail}
          loading={emailLoading}
        />
        <TextInput
          label="Password"
          testID="signupPassword"
          password={true}
          style={styles.input}
          value={password}
          isError={!!passwordError}
          errorText={passwordError}
          onChange={setPassword}
        />
        <ConfirmPasswordInput
          testID="signupConfirmPassword"
          password={password}
          value={confirmPassword}
          onChange={setConfirmPassword}
          style={styles.input}
        />
        {createAccountLoading ? (
          <ActivityIndicator />
        ) : (
          <Button
            testID="signupFormButton"
            textTestID="signupFormButtonText"
            success={createAccountLoading}
            disabled={createAccountLoading}
            textColor={white}
            value="Sign Up"
            onPress={createAccount}
            style={styles.button}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  </GradientView>
);

CreateAccount.propTypes = {
  createAccount: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  usernameError: PropTypes.string,
  setUsername: PropTypes.func.isRequired,
  usernameLoading: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  emailError: PropTypes.string,
  setEmail: PropTypes.func.isRequired,
  emailLoading: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
  passwordError: PropTypes.string,
  setPassword: PropTypes.func.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
  createAccountLoading: PropTypes.bool.isRequired
};

CreateAccount.defaultProps = {
  createAccount: () => {},
  username: "",
  usernameError: null,
  setUsername: () => {},
  usernameLoading: false,
  email: "",
  emailError: null,
  setEmail: () => {},
  emailLoading: false,
  password: "",
  passwordError: null,
  setPassword: () => {},
  confirmPassword: "",
  setConfirmPassword: () => {},
  createAccountLoading: false
};

export default CreateAccount;
