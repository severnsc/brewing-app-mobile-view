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
		if (initialValues) {
			this.setState({ childValues: initialValues });
		}
	}

	onChange = (id, value) => {
		const { childValues } = this.state;
		if (childValues.some(c => c.id === id)) {
			const updatedChildValues = childValues.map(c =>
				c.id === id ? { ...c, value } : c
			);
			this.setState({ childValues: updatedChildValues });
		} else {
			this.setState({ childValues: [...childValues, { id, value }] });
		}
	};

	onSubmit = () => this.props.onSubmit(...this.state.childValues);

	render() {
		const { childValues } = this.state;
		return (
			<View style={this.props.style}>
				{this.props.children(childValues, this.onChange, this.onSubmit)}
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
	children: PropTypes.func.isRequired
};

export default Form;
