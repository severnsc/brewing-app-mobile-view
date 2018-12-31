import React from "react";
import NumberInput from ".";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text } from "@storybook/addon-knobs";

storiesOf("NumberInput", module)
	.add("default", () => (
		<NumberInput
			value={number("Value", 2, {}, "NumberInput")}
			onChange={() => {}}
			label={text("Label", "", "NumberInput")}
		/>
	))
	.add("with autoFocus", () => (
		<NumberInput autoFocus={true} onChange={() => {}} />
	));
