import React from "react";
import {
  Form,
  Button,
  EmailInput,
  GradientView,
  UsernameInput,
  PasswordInput,
  ConfirmPasswordInput
} from "../../components";
import { KeyboardAvoidingView } from "react-native";
import styles from "./styles";
import { white } from "../../constants";

const CreateAccount = ({ createAccount }) => (
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
                value={username && username.value}
                onChange={value => onChange("1", value)}
                style={styles.input}
              />
              <EmailInput
                id="2"
                testID="signupEmail"
                value={email && email.value}
                label="Email"
                onChange={value => onChange("2", value)}
                style={styles.input}
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

export default CreateAccount;
