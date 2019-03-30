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
import { PasswordInput } from "../../containers";
import { KeyboardAvoidingView } from "react-native";
import styles from "../styles";
import {
  white,
  NETWORK_ERROR,
  NON_UNIQUE_USERNAME,
  INVALID_EMAIL,
  NON_UNIQUE_EMAIL
} from "../../constants";

const CreateAccount = ({ createAccount, onUsernameChange, onEmailChange }) => (
  <GradientView>
    <KeyboardAvoidingView style={styles.container}>
      <Form
        testID="signupForm"
        initialValues={[
          {
            id: "1",
            value: { username: "", error: "", validationLoading: false }
          },
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
            password,
            confirmPassword,
            createAccountLoading
          ] = values;
          const {
            value: {
              username,
              error: usernameError,
              validationLoading: usernameValidationLoading
            }
          } = usernameInput;
          const {
            value: {
              email,
              error: emailError,
              validationLoading: emailValidationLoading
            }
          } = emailInput;
          const submit = () => {
            onChange("5", true);
            onSubmit()
              .then(() => onChange("5", false))
              .catch(() => {
                onChange("5", false);
                AlertIOS.alert("Error!", NETWORK_ERROR);
              });
          };
          const _onUsernameChange = username => {
            onChange("1", {
              username,
              validationLoading: true,
              error: ""
            });
            onUsernameChange(username)
              .then(bool =>
                onChange("1", {
                  username,
                  validationLoading: false,
                  error: bool ? "" : NON_UNIQUE_USERNAME
                })
              )
              .catch(() =>
                onChange("1", {
                  username,
                  validationLoading: false,
                  error: NETWORK_ERROR
                })
              );
          };
          const _onEmailChange = email => {
            onChange("2", {
              email,
              validationLoading: true,
              error: ""
            });
            onEmailChange(email)
              .then(({ valid, unique }) => {
                if (!valid) {
                  return onChange("2", {
                    email,
                    validationLoading: false,
                    error: INVALID_EMAIL
                  });
                }
                if (!unique) {
                  return onChange("2", {
                    email,
                    validationLoading: false,
                    error: NON_UNIQUE_EMAIL
                  });
                }
                return onChange("2", {
                  email,
                  validationLoading: false,
                  error: ""
                });
              })
              .catch(() =>
                onChange("2", {
                  email,
                  validationLoading: false,
                  error: NETWORK_ERROR
                })
              );
          };
          return (
            <React.Fragment>
              <TextInput
                id="1"
                label="Username"
                testID="signupUsername"
                errorTestID="usernameInputError"
                style={styles.input}
                value={username}
                isError={!!usernameError}
                errorText={usernameError}
                loading={usernameValidationLoading}
                onChange={_onUsernameChange}
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
              <PasswordInput
                id="3"
                testID="signupPassword"
                onChange={value => onChange("3", value)}
                value={password && password.value}
                style={styles.input}
              />
              <ConfirmPasswordInput
                id="4"
                testID="signupConfirmPassword"
                password={password && password.value}
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
  onUsernameChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired
};

CreateAccount.defaultProps = {
  createAccount: () => {},
  onUsernameChange: () => {},
  onEmailChange: () => {}
};

export default CreateAccount;
