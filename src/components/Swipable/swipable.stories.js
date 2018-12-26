import React from "react";
import Swipable from ".";
import { Text } from "..";
import { storiesOf } from "@storybook/react-native";

const swipeLeftComponent = <Text value="Swiped left" />;

storiesOf("Swipable", module).add("with swipeLeftComponent", () => (
	<Swipable
		swipeLeftComponent={swipeLeftComponent}
		swipeLeftComponentWidth={50}
	>
		<Text value="Swipe left to see" style={{ textAlign: "center" }} />
	</Swipable>
));
