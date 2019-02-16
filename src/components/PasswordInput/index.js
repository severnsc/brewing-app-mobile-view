import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "..";
import { validatePassword } from "../../modules/validation";

class PasswordInput extends React.Component {
  state = {
    error: ""
  };

  componentDidMount() {
    if (this.props.value) {
      if (!validatePassword(this.props.value))
        this.setState({ error: "MUST BE AT LEAST 8 CHARACTERS!" });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      if (validatePassword(this.props.value)) {
        if (this.state.error) this.setState({ error: "" });
      } else {
        if (!this.state.error)
          this.setState({ error: "MUST BE AT LEAST 8 CHARACTERS!" });
      }
    }
  }

  handleChange = value => this.props.onChange(value);

  render() {
    const { value, style, testID, error } = this.props;
    const { error: errorState } = this.state;
    return (
      <TextInput
        errorText={error || errorState}
        isError={!!error || !!errorState}
        password
        value={value}
        label="Password"
        onChange={this.handleChange}
        style={style}
        testID={testID}
      />
    );
  }
}

PasswordInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  testID: PropTypes.string,
  error: PropTypes.string
};

export default PasswordInput;
