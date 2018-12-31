import React from "react";
import { Switch } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, color, boolean } from "@storybook/addon-knobs";

class Switcher extends React.Component {
	state = {
		value: false
	};

	onValueChange = value => this.setState({ value });

	render() {
		return (
			<Switch
				disabled={this.props.disabled}
				thumbColor={this.props.thumbColor}
				ios_backgroundColor={this.props.ios_backgroundColor}
				trackColor={this.props.trackColor}
				value={this.state.value}
				onValueChange={this.onValueChange}
			/>
		);
	}
}

const groupId = "Switch";
storiesOf("Switch", module)
	.addDecorator(withKnobs)
	.add("default", () => (
		<Switcher disabled={boolean("Diabled", false, groupId)} />
	))
	.add("with ThumbColor", () => (
		<Switcher thumbColor={color("Thumb Color", "#000", groupId)} />
	))
	.add("with ios_backgroundColor", () => (
		<Switcher
			ios_backgroundColor={color("iOS Background Color", "#000", groupId)}
		/>
	))
	.add("with track color", () => (
		<Switcher trackColor={color("Track Color", "#000", groupId)} />
	));
