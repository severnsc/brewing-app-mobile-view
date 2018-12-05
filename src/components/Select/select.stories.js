import React from "react";
import Select from ".";
import { storiesOf } from "@storybook/react-native";

storiesOf("Select", module).add("default", () => (
	<Select
		options={["Hops", "Malt", "Yeast", "Other"]}
		initialSelectedIndex={0}
	/>
));
