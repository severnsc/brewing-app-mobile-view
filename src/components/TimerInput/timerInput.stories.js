import React from "react";
import TimerInput from ".";
import { Form } from "..";
import { storiesOf } from "@storybook/react-native";

const FormContainer = storyFn => <Form>{storyFn()}</Form>;

storiesOf("TimerInput", module)
	.addDecorator(FormContainer)
	.add("empty", () => (
		<TimerInput id="1" value="" placeholder="Timer duration (HH:MM:SS)" />
	))
	.add("with value", () => <TimerInput id="1" value="" value="00:20:00" />)
	.add("with autofocus", () => (
		<TimerInput
			id="1"
			value=""
			autoFocus={true}
			placeholder="Timer duration (HH:MM:SS)"
		/>
	));
