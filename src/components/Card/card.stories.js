import React from "react";
import Card from ".";
import { Text } from "..";
import { storiesOf } from "@storybook/react-native";

const upperLeft = <Text value="Upper left" />;
const upperCenter = <Text value="Upper center" />;
const upperRight = <Text value="Upper right" />;
const lowerLeft = <Text value="Lower left" />;
const lowerRight = <Text value="Lower right" />;
const lowerCenterLeft = <Text value="Lower center left" />;
const lowerCenterRight = <Text value="Lower center right" />;

storiesOf("Card", module)
	.add("with upper left slot", () => <Card upperLeft={upperLeft} />)
	.add("with upper center slot", () => <Card upperCenter={upperCenter} />)
	.add("with upper right slot", () => <Card upperRight={upperRight} />)
	.add("with upper left and upper right", () => (
		<Card upperLeft={upperLeft} upperRight={upperRight} />
	))
	.add("with upper left, center and right", () => (
		<Card
			upperLeft={upperLeft}
			upperRight={upperRight}
			upperCenter={upperCenter}
		/>
	))
	.add("with lower left", () => <Card lowerLeft={lowerLeft} />)
	.add("with lower right", () => <Card lowerRight={lowerRight} />)
	.add("with lower left and right", () => (
		<Card lowerLeft={lowerLeft} lowerRight={lowerRight} />
	))
	.add("with lower left, right and center-left center-right", () => (
		<Card
			lowerLeft={lowerLeft}
			lowerRight={lowerRight}
			lowerCenterLeft={lowerCenterLeft}
			lowerCenterRight={lowerCenterRight}
		/>
	))
	.add("with upper left, lower left & right", () => (
		<Card upperLeft={upperLeft} lowerLeft={lowerLeft} lowerRight={lowerRight} />
	))
	.add("with upper left & right and lower left & right", () => (
		<Card
			upperLeft={upperLeft}
			upperRight={upperRight}
			lowerLeft={lowerLeft}
			lowerRight={lowerRight}
		/>
	))
	.add("with all uppers and all lowers", () => (
		<Card
			upperLeft={upperLeft}
			upperCenter={upperCenter}
			upperRight={upperRight}
			lowerLeft={lowerLeft}
			lowerCenterLeft={lowerCenterLeft}
			lowerCenterRight={lowerCenterRight}
			lowerRight={lowerRight}
		/>
	))
	.add("with all uppers and lowers and bold upper left", () => (
		<Card
			upperLeft={<Text bold={true} value="Upper left" />}
			upperCenter={upperCenter}
			upperRight={upperRight}
			lowerLeft={lowerLeft}
			lowerCenterLeft={lowerCenterLeft}
			lowerCenterRight={lowerCenterRight}
			lowerRight={lowerRight}
		/>
	));
