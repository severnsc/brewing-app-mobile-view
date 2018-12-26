import React from "react";
import Swipable from ".";
import { Text, Button } from "..";
import { storiesOf } from "@storybook/react-native";

const swipeLeftComponent = (
	<Button danger={true} value="Delete" onPress={() => {}} textColor="#fff" />
);

storiesOf("Swipable", module).add("with swipeLeftComponent", () => (
	<Swipable swipeLeftComponent={swipeLeftComponent}>
		<Text value="Swipe left to see" style={{ textAlign: "center" }} />
	</Swipable>
));
