import React, { Component } from "react";
import styles from "./styles";
import PropTypes from "prop-types";
import { TextInput as RNTextInput, Text, View } from "react-native";

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

  render() {
    const {
      value,
      onChange,
      placeholder,
      password,
      autoFocus,
      label,
      isError
    } = this.props;

    const { focused } = this.state;
    const keys = ["focused", "isError"];
    const styleMerge = (obj, key) =>
      this.props[key] || this.state[key] ? { ...obj, ...styles[key] } : obj;
    const containerStyle = keys.reduce(styleMerge, { ...styles.container });
    const labelStyle = keys.reduce(styleMerge, { ...styles.label });

    return (
      <View style={containerStyle}>
        {label ? <Text style={labelStyle}>{label}</Text> : null}
        <RNTextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          secureTextEntry={password}
          autoFocus={autoFocus}
          onFocus={this.onFocus}
          selectioncolor="#21252a"
        />
      </View>
    );
  }
}

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  password: PropTypes.bool,
  autoFocus: PropTypes.bool,
  label: PropTypes.string,
  isError: PropTypes.bool
};

export default TextInput;
