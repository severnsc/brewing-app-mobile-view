import React from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  GradientView,
  PasswordInput,
  ConfirmPasswordInput
} from "../../components";
import { UsernameInput, EmailInput } from "../../containers";
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
      <Form
        testID="signupForm"
        inititalValues={[
          { id: "1", value: false },
          { id: "2", value: "" },
          { id: "3", value: "" },
          { id: "4", value: "" }
        ]}
        onSubmit={createAccount}
        style={styles.form}
      >
        {(values, onChange, onSubmit) => {
          const validationLoading = values.find(v => v.id === "1");
          const email = values.find(v => v.id === "2");
          const password = values.find(v => v.id === "3");
          const confirmPassword = values.find(v => v.id === "4");
          return (
            <React.Fragment>
              <UsernameInput
                id="1"
                testID="signupUsername"
                style={styles.input}
                validationLoading={validationLoading && validationLoading.value}
                onValidationChange={value => onChange("1", value)}
              />
              <EmailInput id="2" testID="signupEmail" style={styles.input} />
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
