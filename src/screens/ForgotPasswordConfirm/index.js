import React from "react";
import PropTypes from "prop-types";
import { Icon, GradientView, Text, Button } from "../../components";
import { View } from "react-native";
import { HOME, white } from "../../constants";
import styles from "./styles";

export const message =
  "Check your email for instructions on how to reset your password.";

const ForgotPasswordConfirm = ({ navigation: { navigate } }) => {
  const onPress = () => navigate(HOME);
  return (
    <GradientView>
      <View style={styles.container}>
        <Icon name="envelope-o" size="xl" color={white} />
        <Text value={message} color={white} style={styles.text} />
        <Button
          value="Return Home"
          onPress={onPress}
          fontSize={24}
          secondary={true}
        />
      </View>
    </GradientView>
  );
};

ForgotPasswordConfirm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

ForgotPasswordConfirm.defaultProps = {
  navigation: {
    navigate: () => {}
  }
};

export default ForgotPasswordConfirm;
