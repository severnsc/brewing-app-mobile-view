import React from "react";
import Clock from ".";
import { storiesOf } from "@storybook/react-native";

storiesOf("Clock", module)
	.add("with seconds only", () => <Clock ms={1000} />)
	.add("with minutes only", () => <Clock ms={60000} />)
	.add("with hours only", () => <Clock ms={3600000} />)
	.add("with minutes and seconds", () => <Clock ms={61000} />)
	.add("with hours, minutes and seconds", () => <Clock ms={3661000} />)
	.add("with sm", () => <Clock ms={1000} size="sm" />)
	.add("with md", () => <Clock ms={1000} size="md" />)
	.add("with lg", () => <Clock ms={1000} size="lg" />);
