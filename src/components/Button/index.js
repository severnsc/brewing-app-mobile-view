import React from "react";
import { Text } from "..";
import { TouchableOpacity } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";

const Button = props => {
  const keys = Object.keys(props);
  const styleMerge = (obj, key) => ({ ...obj, ...styles[key] });
  const buttonStyle = keys.reduce(styleMerge, { ...styles.button });
  const { style, disabled, onPress, textColor, fontSize, value } = props;
  return (
    <TouchableOpacity
      style={{ ...buttonStyle, ...style }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text color={textColor} style={{ fontSize }} value={value} />
    </TouchableOpacity>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  danger: PropTypes.bool,
  round: PropTypes.bool,
  circle: PropTypes.bool,
  hideBorder: PropTypes.bool,
  style: PropTypes.object,
  textColor: PropTypes.string,
  fontSize: PropTypes.number
};

export default Button;
