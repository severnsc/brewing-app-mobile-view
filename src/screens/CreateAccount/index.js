import React from "react";
import { ActivityIndicator, AlertIOS, View } from "react-native";
import PropTypes from "prop-types";
import {
  Form,
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
  username,
  usernameError,
  setUsername,
  onEmailChange,
  onPasswordChange
}) => (
  <GradientView>
    <KeyboardAvoidingView style={styles.container}>
      <Form
        testID="signupForm"
        initialValues={[
          { id: "1", value: "" },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ]}
        onSubmit={createAccount}
        style={styles.form}
      >
        {(values, onChange, onSubmit) => {
          const [
            usernameInput,
            emailInput,
            passwordInput,
            confirmPassword,
            createAccountLoading
          ] = values;
          const {
            value: { validationLoading: usernameValidationLoading }
          } = usernameInput;
          const {
            value: {
              email,
              error: emailError,
              validationLoading: emailValidationLoading
            }
          } = emailInput;
          const {
            value: { password, error: passwordError }
          } = passwordInput;
          const submit = () => {
            onChange("5", true);
            onSubmit()
              .then(() => onChange("5", false))
              .catch(({ message }) => {
                onChange("5", false);
                AlertIOS.alert("Error!", message);
              });
          };
          const _onEmailChange = email => {
            onChange("2", {
              email,
              validationLoading: true,
              error: ""
            });
            onEmailChange(email)
              .then(message => {
                onChange("2", {
                  email,
                  validationLoading: false,
                  error: message
                });
              })
              .catch(({ message }) =>
                onChange("2", {
                  email,
                  validationLoading: false,
                  error: message
                })
              );
          };
          _onPasswordChange = password => {
            onChange("3", {
              password,
              error: onPasswordChange(password)
            });
          };
          return (
            <React.Fragment>
              <TextInput
                label="Username"
                testID="signupUsername"
                errorTestID="usernameInputError"
                style={styles.input}
                value={username}
                isError={!!usernameError}
                errorText={usernameError}
                loading={usernameValidationLoading}
                onChange={setUsername}
              />
              <TextInput
                id="2"
                label="Email"
                testID="signupEmail"
                errorTestID="emailInputError"
                style={styles.input}
                value={email}
                isError={!!emailError}
                errorText={emailError}
                onChange={_onEmailChange}
                loading={emailValidationLoading}
              />
              <TextInput
                id="3"
                label="Password"
                testID="signupPassword"
                password={true}
                style={styles.input}
                value={password}
                isError={!!passwordError}
                errorText={passwordError}
                onChange={_onPasswordChange}
              />
              <ConfirmPasswordInput
                id="4"
                testID="signupConfirmPassword"
                password={password}
                value={confirmPassword && confirmPassword.value}
                onChange={value => onChange("4", value)}
                style={styles.input}
              />
              {createAccountLoading && createAccountLoading.value ? (
                <ActivityIndicator />
              ) : (
                <Button
                  testID="signupFormButton"
                  textTestID="signupFormButtonText"
                  success={createAccountLoading && !createAccountLoading.value}
                  disabled={createAccountLoading && createAccountLoading.value}
                  textColor={white}
                  value="Sign Up"
                  onPress={submit}
                  style={styles.button}
                />
              )}
            </React.Fragment>
          );
        }}
      </Form>
    </KeyboardAvoidingView>
  </GradientView>
);

CreateAccount.propTypes = {
  createAccount: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  usernameError: PropTypes.string,
  setUsername: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired
};

CreateAccount.defaultProps = {
  createAccount: () => {},
  username: "",
  usernameError: null,
  setUsername: () => {},
  onEmailChange: () => {},
  onPasswordChange: () => {}
};

export default CreateAccount;
