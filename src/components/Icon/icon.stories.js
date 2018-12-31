import React from "react";
import Icon from ".";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, color, select } from "@storybook/addon-knobs";

const groupId = "Icon";

const sizeOptions = {
	Small: "sm",
	Medium: "md",
	Large: "lg"
};

const nameOptions = {
	MdCreate: "md-create",
	iOSAddCircle: "ios-add-circle",
	iOSMenu: "ios-menu",
	iOSClose: "ios-close",
	iOSArrowBack: "ios-arrow-back",
	iOSArrowForward: "ios-arrow-forward",
	iOSCheckmark: "ios-checkmark",
	BalanceScale: "balance-scale",
	Percent: "percent",
	MdGlobe: "md-globe",
	iOSCash: "ios-cash",
	iOSCalendar: "ios-calendar",
	iOSRefresh: "ios-refresh",
	iOSAlert: "ios-alert",
	iOSList: "ios-list",
	iOSFlask: "ios-flask",
	iOSBeer: "ios-beer"
};

storiesOf("DontTest - Icon", module)
	.addDecorator(withKnobs)
	.add("default", () => (
		<Icon
			name={select("Name", nameOptions, "md-create", groupId)}
			color={color("Color", "#000", groupId)}
			size={select("Size", sizeOptions, "md", groupId)}
		/>
	));
