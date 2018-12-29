import React from "react";
import { TextInput, EmailInput, Button } from "..";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

class Form extends React.Component {
	state = {
		childValues: []
	};

	componentDidMount() {
		const { initialValues } = this.props;
		if (initialValues) this.setState({ childValues: initialValues });
	}

	onChange = (id, value) => {
		const { childValues } = this.state;
		const updatedChildValues = childValues.map(c =>
			c.id === id ? { ...c, value } : c
		);
		this.setState({ childValues: updatedChildValues });
	};

	onSubmit = () => this.props.onSubmit(...this.state.childValues);

	render() {
		const { childValues } = this.state;
		return (
			<View style={this.props.style}>
				{this.props.renderItems(childValues, this.onChange, this.onSubmit)}
			</View>
		);
	}
}

Form.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		})
	),
	renderItems: PropTypes.func.isRequired,
	children: (props, propName, componentName) => {
		const prop = props[propName];
		let error = null;
		React.Children.forEach(prop, child => {
			if (![TextInput, EmailInput, Button].includes(child.type)) {
				error = new Error(
					`${componentName} children must be one of type: TextInput, EmailInput, Button`
				);
			}
			return error;
		});
	}
};

export default Form;
