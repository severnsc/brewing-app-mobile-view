import React from "react";
import Tabs from ".";
import { Tab } from "..";
import { storiesOf } from "@storybook/react-native";

storiesOf("Tabs", module).add("default", () => (
	<Tabs>
		{(active, handlePress) => {
			const values = ["active", "inactive"];
			return values.map(v => <Tab value={v} active={v === active} />);
		}}
	</Tabs>
));
