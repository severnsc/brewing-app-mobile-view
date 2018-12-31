import React from "react";
import Subtitle from ".";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, boolean, object } from "@storybook/addon-knobs";

const groupId = "Subtitle";
storiesOf("Subtitle", module).add("default", () => (
	<Subtitle
		value={text("Value", "Subtitle", groupId)}
		bold={boolean("Bold", false, groupId)}
		style={object("Style", {}, groupId)}
	/>
));
