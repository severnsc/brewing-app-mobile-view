import React from "react";
import UsernameInput from ".";
import { ScrollView } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

const GROUP_ID = "UsernameInput";

storiesOf("UsernameInput", module)
	.addDecorator(withKnobs)
	.addDecorator(story => <ScrollView>{story()}</ScrollView>)
	.add("default", () => {
		const onChange = () => {};
		return (
			<UsernameInput onChange={onChange} value={text("Value", "", GROUP_ID)} />
		);
	});
