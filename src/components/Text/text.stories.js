import React from "react";
import Text from ".";
import { storiesOf } from "@storybook/react-native";

storiesOf("Text", module)
	.add("default", () => <Text value="some text" />)
	.add("with bold", () => <Text value="bold text" bold={true} />)
	.add("with color", () => <Text value="I'm red" color="red" />)
	.add("with success", () => <Text value="Success!" success={true} />)
	.add("with danger", () => <Text value="Error!" danger={true} />)
	.add("with style", () => <Text value="larger" style={{ fontSize: 32 }} />);
