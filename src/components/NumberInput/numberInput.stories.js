import React from "react";
import NumberInput from ".";
import { storiesOf } from "@storybook/react-native";

storiesOf("NumberInput", module)
	.add("default", () => <NumberInput value={2} onChange={() => {}} />)
	.add("with autoFocus", () => (
		<NumberInput autoFocus={true} onChange={() => {}} />
	))
	.add("with label", () => <NumberInput label="Age" onChange={() => {}} />);
