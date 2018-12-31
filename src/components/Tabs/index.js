import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

class Tabs extends React.Component {
	state = {
		active: ""
	};

	componentDidMount() {
		this.setState({ active: this.props.initialActive });
	}

	handlePress = tabValue => {
		this.props.onChange(tabValue);
		this.setState({ active: tabValue });
	};

	render() {
		return (
			<View style={styles.tabs}>
				{this.props.children(this.state.active, this.handlePress)}
			</View>
		);
	}
}

Tabs.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.node
	]),
	onChange: PropTypes.func.isRequired
};

export default Tabs;
