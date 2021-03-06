import React from "react";
import PropTypes from "prop-types";
import { Text as RNText } from "react-native";
import styles from "./styles";

const Text = props => {
  const propNames = Object.keys(props);
  const style = propNames.reduce(
    (obj, propName) => ({ ...obj, ...styles[propName] }),
    { color: props.color, ...props.style }
  );
  return (
    <RNText
      testID={props.testID}
      style={style}
      onPress={props.onPress}
      accessibilityLabel={props.value}
    >
      {props.value}
    </RNText>
  );
};

Text.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bold: PropTypes.bool,
  color: PropTypes.string,
  success: PropTypes.bool,
  danger: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
  testID: PropTypes.string
};

export default Text;
