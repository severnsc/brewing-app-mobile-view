import React from "react";
import { TextInput, EmailInput, Button } from "..";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

class Form extends React.Component {
	state = {
		childValues: []
	};

	componentDidMount() {
		const childValues = React.Children.map(this.props.children, child => ({
			id: child.props.id,
			value: child.props.value
		}));
		this.setState({ childValues });
	}

	renderItems = children => {
		const { childValues } = this.state;
		return React.Children.map(children, child => {
			if (child.type === Button && child.props.type === "submit") {
				return React.cloneElement(child, {
					onPress: this.onSubmit
				});
			} else {
				const currentChildValue = childValues.find(
					c => c.id === child.props.id
				);
				return currentChildValue
					? React.cloneElement(child, {
							value: currentChildValue.value,
							onChange: value => this.onChange(child.props.id, value)
					  })
					: React.cloneElement(child, {
							onChange: value => this.onChange(child.props.id, value)
					  });
			}
		});
	};

	onChange = (id, value) => {
		const { childValues } = this.state;
		const updatedChildValues = childValues.map(c =>
			c.id === id ? { ...c, value } : c
		);
		this.setState({ childValues: updatedChildValues });
	};

	onSubmit = () => this.props.onSubmit(...this.state.childValues);

	render() {
		return (
			<View style={this.props.style}>
				{this.renderItems(this.props.children)}
			</View>
		);
	}
}

Form.propTypes = {
	onSubmit: PropTypes.func.isRequired,
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
