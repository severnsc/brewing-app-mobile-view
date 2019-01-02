import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "..";

class ConfirmPasswordInput extends React.Component {
	state = {
		error: ""
	};

	componentDidUpdate(prevProps) {
		if (prevProps.value !== this.props.value) {
			if (this.props.password !== this.props.value) {
				this.setState({ error: "MUST MATCH PASSWORD!" });
			} else {
				this.setState({ error: "" });
			}
		}
	}

	handleChange = value => this.props.onChange(value);

	render() {
		return (
			<TextInput
				password
				errorText={this.state.error}
				isError={!!this.state.error}
				label="Confirm Password"
				value={this.props.value}
				onChange={this.handleChange}
				style={this.props.style}
			/>
		);
	}
}

ConfirmPasswordInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	style: PropTypes.object,
	value: PropTypes.string,
	password: PropTypes.string
};

export default ConfirmPasswordInput;
