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
		return (
			<TextInput
				errorText={this.state.error}
				isError={!!this.state.error}
				password
				value={this.props.value}
				label="Password"
				onChange={this.handleChange}
				style={this.props.style}
			/>
		);
	}
}

PasswordInput.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	style: PropTypes.object
};

export default PasswordInput;
