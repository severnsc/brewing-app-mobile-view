import React from "react";
import Tabs from ".";
import { Tab } from "..";
import { storiesOf } from "@storybook/react-native";

storiesOf("Tabs", module).add("default", () => (
	<Tabs>
		<Tab value="active" active={true} />
		<Tab value="inactive" />
	</Tabs>
));
