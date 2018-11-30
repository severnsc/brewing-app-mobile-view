import React from "react"
import Button from "."
import { storiesOf } from '@storybook/react-native';

storiesOf("Button", module)
	.add("with value", () => (
		<Button value="press" onPress={() => {}} />
	))
	.add("with primary prop", () => (
		<Button value="press" primary={true} onPress={() => {}} />
	))
	.add("with secondary prop", () => (
		<Button value="press" secondary={true} onPress={() => {}} />
	))
	.add("with success prop", () => (
		<Button value="press" success={true} onPress={() => {}} />
	))
	.add("with danger prop", () => (
		<Button value="press" danger={true} onPress={() => {}} />
	))
	.add("with round prop", () => (
		<Button value="+" round={true} onPress={() => {}} />
	))
	.add("with displayBorder prop false", () => (
		<Button value="press" secondary={true} displayBorder={false} onPress={() => {}} />
	))
	.add("with circle prop", () => (
		<Button value="+" circle={true} onPress={() => {}} />
	))
