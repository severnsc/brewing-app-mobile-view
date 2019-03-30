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
import { EmailInput, PasswordInput } from "../../containers";
import { KeyboardAvoidingView } from "react-native";
import styles from "../styles";
import { white, NETWORK_ERROR, NON_UNIQUE_USERNAME } from "../../constants";

const CreateAccount = ({ createAccount, onUsernameChange }) => (
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
            emailValidationLoading,
            password,
            confirmPassword,
            createAccountLoading
          ] = values;
          const {
            value: { username, error, validationLoading }
          } = usernameInput;
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
          return (
            <React.Fragment>
              <View>
                <TextInput
                  id="1"
                  label="Username"
                  style={styles.input}
                  value={username}
                  isError={!!error}
                  errorText={error}
                  onChange={_onUsernameChange}
                />
                {validationLoading ? (
                  <ActivityIndicator style={styles.activityIndicator} />
                ) : null}
              </View>
              <EmailInput
                id="2"
                testID="signupEmail"
                style={styles.input}
                validationLoading={
                  emailValidationLoading && emailValidationLoading.value
                }
                onValidationChange={value => onChange("2", value)}
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
  onUsernameChange: PropTypes.func.isRequired
};

export default CreateAccount;
