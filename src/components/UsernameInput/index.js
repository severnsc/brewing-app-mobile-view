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
		return (
			<TextInput
				errorText={this.state.error}
				isError={!!this.state.error}
				label="Username"
				value={this.props.value}
				onChange={this.handleChange}
				style={this.props.style}
				testID={this.props.testID}
			/>
		);
	}
}

UsernameInput.propTypes = {
	value: PropTypes.string,
	style: PropTypes.object,
	onChange: PropTypes.func.isRequired,
	testID: PropTypes.string
};

export default UsernameInput;
