import React from "react";
import MaltColor from ".";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number } from "@storybook/addon-knobs";

const label = "Color in L";
const defaultValue = 1;

storiesOf("MaltColor", module)
	.addDecorator(withKnobs)
	.add("default", () => <MaltColor value={number(label, defaultValue)} />)
	.add("with displayValue false", () => (
		<MaltColor value={number(label, defaultValue)} displayValue={false} />
	))
	.add("with styles", () => (
		<MaltColor
			value={number(label, defaultValue)}
			displayValue={false}
			containerStyle={{ width: 50, height: 50 }}
			colorStyle={{ width: 50, height: 50, borderRadius: 100 }}
		/>
	));
