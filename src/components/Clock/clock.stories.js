import React from "react";
import Clock from ".";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, select } from "@storybook/addon-knobs";

storiesOf("Clock", module)
	.addDecorator(withKnobs)
	.add("default", () => (
		<Clock
			ms={number("Milliseconds", 1000, {}, "Clock")}
			size={select("Size", ["sm", "md", "lg"], "md", "Clock")}
		/>
	));
