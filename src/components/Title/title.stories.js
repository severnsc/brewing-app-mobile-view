import React from "react";
import Title from ".";
import { storiesOf } from "@storybook/react-native";

storiesOf("Title", module)
	.add("default", () => <Title value="Title" />)
	.add("with color", () => <Title value="I'm red" color="red" />)
	.add("with style", () => (
		<Title value="Italics" style={{ fontStyle: "italic" }} />
	));
