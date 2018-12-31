import React from "react";
import Title from ".";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, color, object } from "@storybook/addon-knobs";

const groupId = "Title";
storiesOf("Title", module).add("default", () => (
	<Title
		value={text("Value", "Title", groupId)}
		color={color("Color", "#000", groupId)}
		style={object("Style", {}, groupId)}
	/>
));
