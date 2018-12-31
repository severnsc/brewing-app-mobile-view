import React from "react";
import TimerInput from ".";
import { Form } from "..";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

const groupId = "TimerInput";
storiesOf("TimerInput", module).add("empty", () => (
	<TimerInput
		id="1"
		label={text("Label", "", groupId)}
		value={text("Value", "", groupId)}
		placeholder={text("Placeholder", "", groupId)}
		autoFocus={boolean("Auto focus", false, groupId)}
	/>
));
