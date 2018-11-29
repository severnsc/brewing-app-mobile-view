import React from "react"
import Button from "."
import { storiesOf } from '@storybook/react-native';

storiesOf("Button", module)
	.add("with value", () => (
		<Button value="press" />
	))
	.add("with primary prop", () => (
		<Button value="press" primary={true} />
	))
	.add("with secondary prop", () => (
		<Button value="press" secondary={true} />
	))
	.add("with success prop", () => (
		<Button value="press" success={true} />
	))
	.add("with danger prop", () => (
		<Button value="press" danger={true} />
	))
	.add("with round prop", () => (
		<Button value="+" round={true} />
	))
	.add("with displayBorder prop false", () => (
		<Button value="press" secondary={true} displayBorder={false} />
	))
