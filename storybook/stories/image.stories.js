import React from "react";
import { Image, View } from "react-native";
import { storiesOf } from "@storybook/react-native";

storiesOf("Image", module)
	.add("default", () => <Image source={require("../../assets/icon.png")} />)
	.add("with blurRadius", () => (
		<Image source={require("../../assets/icon.png")} blurRadius={20} />
	));
