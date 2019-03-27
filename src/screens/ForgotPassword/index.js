import React from "react";
import PropTypes from "prop-types";
import { GradientView, Form, TextInput, Button, Text } from "../../components";
import {
  KeyboardAvoidingView,
  ActivityIndicator,
  AlertIOS
} from "react-native";
import styles from "../styles";
import { NETWORK_ERROR, INVALID_EMAIL } from "../../constants";

const ForgotPassword = ({ onSubmit, isError }) => (
  <GradientView>
    <KeyboardAvoidingView style={styles.container}>
      <Form
        onSubmit={onSubmit}
        style={styles.form}
        initialValues={[{ id: "1", value: "" }, { id: "2", value: false }]}
      >
        {(values, _onChange, _onSubmit) => {
          const value = values[0].value;
          const loading = values[1].value;
          const onChange = value => _onChange("1", value);
          const onSubmit = ({ value }) => {
            _onChange("2", true);
            _onSubmit(value)
              .then(() => _onChange("2", false))
              .catch(() => {
                _onChange("2", false);
                AlertIOS.alert("Error!", NETWORK_ERROR);
              });
          };
          return (
            <React.Fragment>
              <TextInput
                errorText={isError && INVALID_EMAIL}
                onChange={onChange}
                label="Email"
                value={value}
              />
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Button value="Send Email" onPress={onSubmit} />
              )}
            </React.Fragment>
          );
        }}
      </Form>
    </KeyboardAvoidingView>
  </GradientView>
);

ForgotPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isError: PropTypes.bool
};

ForgotPassword.defaultProps = {
  onSubmit: () => {},
  isError: false
};

export default ForgotPassword;
