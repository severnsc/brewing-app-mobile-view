import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "..";
import { NON_MATCHING_PASSWORD } from "../../constants/errorMessages";

class ConfirmPasswordInput extends React.Component {
  state = {
    error: ""
  };

  componentDidMount() {
    if (this.props.value) {
      if (this.props.value !== this.props.password) {
        this.setState({ error: NON_MATCHING_PASSWORD });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      if (this.props.password !== this.props.value) {
        if (!this.state.error) this.setState({ error: NON_MATCHING_PASSWORD });
      } else {
        if (this.state.error) this.setState({ error: "" });
      }
    }
  }

  handleChange = value => this.props.onChange(value);

  render() {
    const { value, style, testID } = this.props;
    const { error } = this.state;
    return (
      <TextInput
        password
        errorText={error}
        isError={!!error}
        label="Confirm Password"
        value={value}
        onChange={this.handleChange}
        style={style}
        testID={testID}
        errorTestID="confirmPasswordInputError"
      />
    );
  }
}

ConfirmPasswordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  value: PropTypes.string,
  password: PropTypes.string,
  testID: PropTypes.string
};

export default ConfirmPasswordInput;
