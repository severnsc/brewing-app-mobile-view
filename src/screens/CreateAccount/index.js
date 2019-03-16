import React from "react";
import { ActivityIndicator, AlertIOS } from "react-native";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  GradientView,
  ConfirmPasswordInput
} from "../../components";
import { UsernameInput, EmailInput, PasswordInput } from "../../containers";
import { KeyboardAvoidingView } from "react-native";
import styles from "./styles";
import { white, NETWORK_ERROR } from "../../constants";

const CreateAccount = ({ createAccount }) => (
  <GradientView>
    <KeyboardAvoidingView style={styles.container}>
      <Form
        testID="signupForm"
        initialValues={[
          { id: "1", value: false },
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
            usernameValidationLoading,
            emailValidationLoading,
            password,
            confirmPassword,
            createAccountLoading
          ] = values;
          const submit = () => {
            onChange("5", true);
            onSubmit()
              .then(() => onChange("5", false))
              .catch(() => {
                onChange("5", false);
                AlertIOS.alert("Error!", NETWORK_ERROR);
              });
          };
          return (
            <React.Fragment>
              <UsernameInput
                id="1"
                testID="signupUsername"
                style={styles.input}
                validationLoading={
                  usernameValidationLoading && usernameValidationLoading.value
                }
                onValidationChange={value => onChange("1", value)}
              />
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
  passwordError: PropTypes.string,
  confirmPasswordError: PropTypes.string
};

export default CreateAccount;
