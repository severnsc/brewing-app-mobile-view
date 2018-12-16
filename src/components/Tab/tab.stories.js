import React from "react";
import Tab from ".";
import { storiesOf } from "@storybook/react-native";
const onPress = () => {};
storiesOf("Tab", module)
	.add("inactive", () => <Tab value="Tab" onPress={onPress} />)
	.add("active", () => <Tab active={true} value="Tab" onPress={onPress} />);
