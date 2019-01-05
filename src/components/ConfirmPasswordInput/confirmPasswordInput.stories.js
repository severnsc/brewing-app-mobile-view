import React from "react";
import ConfirmPasswordInput from ".";
import { ScrollView } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";
const GROUP_ID = "ConfirmPasswordInput";
storiesOf("ConfirmPasswordInput", module)
	.addDecorator(withKnobs)
	.addDecorator(story => <ScrollView>{story()}</ScrollView>)
	.add("default", () => (
		<ConfirmPasswordInput
			onChange={() => {}}
			value={text("Value", "", GROUP_ID)}
			password={text("Password", "password", GROUP_ID)}
		/>
	));
