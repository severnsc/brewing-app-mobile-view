import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

class Tabs extends React.Component {
	state = {
		active: ""
	};

	componentDidMount() {
		const children = React.Children.toArray(this.props.children);
		const child = children.find(child => child.props.active);
		this.setState({ active: child.props.value });
	}

	renderTabs = () => {
		return React.Children.map(this.props.children, child =>
			child.props.value === this.state.active
				? React.cloneElement(child, {
						onPress: () => this.handlePress(child.props.value),
						active: true
				  })
				: React.cloneElement(child, {
						onPress: () => this.handlePress(child.props.value),
						active: false
				  })
		);
	};

	handlePress = tabValue => {
		this.props.onChange(tabValue);
		this.setState({ active: tabValue });
	};

	render() {
		return <View style={styles.tabs}>{this.renderTabs()}</View>;
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
