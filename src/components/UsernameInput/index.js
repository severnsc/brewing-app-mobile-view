import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "..";
import { validateUsername } from "../../modules/validation";

class UsernameInput extends React.Component {
  state = {
    error: ""
  };

  componentDidMount() {
    if (this.props.value) {
      validateUsername(this.props.value).then(bool => {
        if (!bool) this.setState({ error: "USERNAME ALREADY TAKEN!" });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      validateUsername(this.props.value).then(bool => {
        if (bool) {
          if (this.state.error) this.setState({ error: "" });
        } else {
          if (!this.state.error)
            this.setState({ error: "USERNAME ALREADY TAKEN!" });
        }
      });
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
        label="Username"
        value={value}
        onChange={this.handleChange}
        style={style}
        testID={testID}
      />
    );
  }
}

UsernameInput.propTypes = {
  value: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  testID: PropTypes.string,
  error: PropTypes.string
};

export default UsernameInput;
