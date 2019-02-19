import React from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  EmailInput,
  GradientView,
  PasswordInput,
  ConfirmPasswordInput
} from "../../components";
import { UsernameInput } from "../../containers";
import { KeyboardAvoidingView } from "react-native";
import styles from "./styles";
import { white } from "../../constants";

const CreateAccount = ({
  createAccount,
  emailError,
  passwordError,
  confirmPasswordError
}) => (
  <GradientView>
    <KeyboardAvoidingView style={styles.container}>
      <Form testID="signupForm" onSubmit={createAccount} style={styles.form}>
        {(values, onChange, onSubmit) => {
          const username = values.find(v => v.id === "1");
          const email = values.find(v => v.id === "2");
          const password = values.find(v => v.id === "3");
          const confirmPassword = values.find(v => v.id === "4");
          return (
            <React.Fragment>
              <UsernameInput
                id="1"
                testID="signupUsername"
                style={styles.input}
              />
              <EmailInput
                id="2"
                testID="signupEmail"
                value={email && email.value}
                label="Email"
                onChange={value => onChange("2", value)}
                style={styles.input}
                error={emailError}
              />
              <PasswordInput
                id="3"
                testID="signupPassword"
                onChange={value => onChange("3", value)}
                value={password && password.value}
                style={styles.input}
                error={passwordError}
              />
              <ConfirmPasswordInput
                id="4"
                testID="signupConfirmPassword"
                password={password && password.value}
                value={confirmPassword && confirmPassword.value}
                onChange={value => onChange("4", value)}
                style={styles.input}
                error={confirmPasswordError}
              />
              <Button
                testID="signupFormButton"
                textTestID="signupFormButtonText"
                success
                textColor={white}
                value="Sign Up"
                onPress={onSubmit}
                style={styles.button}
              />
            </React.Fragment>
          );
        }}
      </Form>
    </KeyboardAvoidingView>
  </GradientView>
);

CreateAccount.propTypes = {
  createAccount: PropTypes.func.isRequired,
  usernameError: PropTypes.string,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  confirmPasswordError: PropTypes.string
};

export default CreateAccount;
