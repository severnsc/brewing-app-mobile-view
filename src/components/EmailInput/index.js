import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "..";
import { validateEmail, isEmailUnique } from "../../modules/validation";

class EmailInput extends React.Component {
  state = {
    error: ""
  };

  componentDidMount() {
    if (this.props.value) {
      this.validateEmail(this.props.value);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.validateEmail(this.props.value);
    }
  }

  validateEmail = email => {
    const result = validateEmail(email);
    if (!result) {
      this.setState({ error: "INVALID EMAIL!" });
    } else {
      this.isEmailUnique(email);
    }
  };

  isEmailUnique = email =>
    isEmailUnique(email).then(bool => {
      if (!bool) {
        this.setState({ error: "EMAIL ALREADY TAKEN!" });
      } else {
        if (this.state.error) this.setState({ error: "" });
      }
    });

  render() {
    const {
      value,
      onChange,
      placeholder,
      autoFocus,
      label,
      style,
      testID,
      error
    } = this.props;
    const { error: errorState } = this.state;
    return (
      <TextInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        label={label}
        isError={!!error || !!errorState}
        errorText={error || errorState}
        style={style}
        testID={testID}
      />
    );
  }
}

EmailInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  label: PropTypes.string,
  style: PropTypes.object,
  testID: PropTypes.string,
  error: PropTypes.string
};

export default EmailInput;
