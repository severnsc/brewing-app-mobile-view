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
    if (!!result) {
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
      style
    } = this.props;
    const { error } = this.state;
    return (
      <TextInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        label={label}
        isError={!!error}
        errorText={error}
        style={style}
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
  style: PropTypes.object
};

export default EmailInput;
