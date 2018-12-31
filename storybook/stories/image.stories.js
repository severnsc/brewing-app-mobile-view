import React from "react";
import { Image, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number } from "@storybook/addon-knobs";

storiesOf("Image", module)
	.addDecorator(withKnobs)
	.add("default", () => (
		<Image
			source={require("../../assets/icon.png")}
			blurRadius={number("Blur radius", 20, {}, "Image")}
		/>
	));
