import React from "react";
import PropTypes from "prop-types";
import { GradientView, Form, TextInput, Button, Text } from "../../components";
import { KeyboardAvoidingView } from "react-native";
import styles from "./styles";
import { white, primary, INVALID_LOGIN } from "../../constants";

const login = ({ isError, login, forgotPassword }) => (
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
          return (
            <React.Fragment>
              {isError ? <Text danger={true} value={INVALID_LOGIN} /> : null}
              <TextInput
                label="Username"
                onChange={value => onChange("1", value)}
                style={styles.input}
                value={username}
              />
              <TextInput
                label="Password"
                password={true}
                onChange={value => onChange("2", value)}
                style={styles.input}
                value={password}
              />
              <Button
                value="Login"
                onPress={onSubmit}
                success={true}
                textColor={white}
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

login.propTypes = {
  isError: PropTypes.bool,
  login: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired
};

login.defaultProps = {
  isError: false,
  login: () => {},
  forgotPassword: () => {}
};

export default login;
