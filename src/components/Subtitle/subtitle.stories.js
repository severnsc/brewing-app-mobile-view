import React from "react";
import Subtitle from ".";
import { storiesOf } from "@storybook/react-native";

storiesOf("Subtitle", module)
	.add("default", () => <Subtitle value="Subtitle" />)
	.add("with bold", () => <Subtitle value="Bold" bold={true} />)
	.add("with style", () => (
		<Subtitle value="Italic" style={{ fontStyle: "italic" }} />
	));
