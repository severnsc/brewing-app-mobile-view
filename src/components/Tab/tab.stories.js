import React from "react";
import Tab from ".";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

const groupId = "Tab";
const onPress = () => {};
storiesOf("Tab", module).add("default", () => (
	<Tab
		active={boolean("Active", false, groupId)}
		value={text("Value", "Tab", groupId)}
		onPress={onPress}
	/>
));
