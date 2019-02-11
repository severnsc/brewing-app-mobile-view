import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "..";

class ConfirmPasswordInput extends React.Component {
	state = {
		error: ""
	};

	componentDidMount() {
		if (this.props.value) {
			if (this.props.value !== this.props.password) {
				this.setState({ error: "MUST MATCH PASSWORD!" });
			}
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.value !== this.props.value) {
			if (this.props.password !== this.props.value) {
				if (!this.state.error) this.setState({ error: "MUST MATCH PASSWORD!" });
			} else {
				if (this.state.error) this.setState({ error: "" });
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
				testID={this.props.testID}
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
