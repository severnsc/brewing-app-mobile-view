import React from "react";
import PropTypes from "prop-types";
import { GradientView, Form, TextInput, Button, Text } from "../../components";
import { KeyboardAvoidingView } from "react-native";
import styles from "./styles";
import { white, primary, INVALID_LOGIN, NETWORK_ERROR } from "../../constants";
import { AlertIOS } from "react-native";

const Login = ({ isError, login, forgotPassword }) => (
  <GradientView>
    <KeyboardAvoidingView style={styles.container}>
      <Form
        onSubmit={login}
        style={styles.form}
        initialValues={[{ id: "1", value: "" }, { id: "2", value: "" }]}
      >
        {(values, onChange, onSubmit) => {
          const username = values[0] && values[0].value;
          const password = values[1] && values[1].value;
          const submit = () => {
            onSubmit().catch(() => AlertIOS.alert("Error!", NETWORK_ERROR));
          };
          console.log(INVALID_LOGIN);
          return (
            <React.Fragment>
              {isError ? (
                <Text
                  danger={true}
                  value={INVALID_LOGIN}
                  testID="loginErrorText"
                />
              ) : null}
              <TextInput
                label="Username"
                onChange={value => onChange("1", value)}
                style={styles.input}
                value={username}
                testID="usernameInput"
              />
              <TextInput
                label="Password"
                password={true}
                onChange={value => onChange("2", value)}
                style={styles.input}
                value={password}
                testID="passwordInput"
              />
              <Button
                value="Login"
                onPress={submit}
                success={true}
                textColor={white}
                testID="submitButton"
              />
              <Button
                value="Forgot password"
                onPress={forgotPassword}
                style={styles.forgotPassword}
                textColor={primary}
              />
            </React.Fragment>
          );
        }}
      </Form>
    </KeyboardAvoidingView>
  </GradientView>
);

Login.propTypes = {
  isError: PropTypes.bool,
  login: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired
};

Login.defaultProps = {
  isError: false,
  login: () => {},
  forgotPassword: () => {}
};

export default Login;
