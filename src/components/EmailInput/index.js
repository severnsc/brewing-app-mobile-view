import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "..";
import { validateEmail } from "../../modules/validation";

class EmailInput extends React.Component {
  state = {
    isError: false
  };

  componentDidMount() {
    if (this.props.value) {
      this.validateEmail(this.props.value);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.validateEmail(this.props.value);
    }
  }

  validateEmail = email => {
    const result = validateEmail(email);
    this.setState({ isError: !!result });
  };

  render() {
    const {
      value,
      onChange,
      placeholder,
      autoFocus,
      label,
      style
    } = this.props;
    const { isError } = this.state;
    return (
      <TextInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        label={label}
        isError={isError}
        errorText={isError ? "INVALID EMAIL!" : ""}
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
