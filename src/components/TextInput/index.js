import React, { Component } from "react";
import styles from "./styles";
import PropTypes from "prop-types";
import { TextInput as RNTextInput, Text, View } from "react-native";
import { darkestGray } from "../../constants";

class TextInput extends Component {
  state = {
    focused: false
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.setState({ focused: true });
    }
  }

  onFocus = () => {
    this.setState({ focused: true });
  };

  onBlur = () => {
    this.setState({ focused: false });
  };

  render() {
    const {
      value,
      onChange,
      placeholder,
      password,
      autoFocus,
      label,
      isError,
      errorText,
      inputAccessoryViewID,
      keyboardType
    } = this.props;

    const { focused } = this.state;
    const keys = ["focused", "isError"];
    const styleMerge = (obj, key) =>
      this.props[key] || this.state[key] ? { ...obj, ...styles[key] } : obj;
    const containerStyle = keys.reduce(styleMerge, { ...styles.container });
    const labelStyle = keys.reduce(styleMerge, { ...styles.label });

    return (
      <React.Fragment>
        <View style={containerStyle}>
          {label ? <Text style={labelStyle}>{label}</Text> : null}
          <RNTextInput
            value={value && `${value}`}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={password}
            autoFocus={autoFocus}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            selectioncolor={darkestGray}
            keyboardType={keyboardType}
            inputAccessoryViewID={inputAccessoryViewID}
          />
        </View>
        {errorText ? <Text danger={true} value={errorText} /> : null}
      </React.Fragment>
    );
  }
}

TextInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  password: PropTypes.bool,
  autoFocus: PropTypes.bool,
  label: PropTypes.string,
  isError: PropTypes.bool,
  errorText: PropTypes.string,
  inputAccessoryViewID: PropTypes.string,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ])
};

TextInput.defaultProps = {
  keyboardType: "default"
};

export default TextInput;
