import React from "react"
import TextInput from "."
import { storiesOf } from '@storybook/react-native';

storiesOf("TextInput", module)
	.add("with value", () => (
		<TextInput value="input goes here" />
	))
	.add("with placeholder", () => (
		<TextInput placeholder="placeholder" />
	))
	.add("with password", () => (
		<TextInput password={true} value="password" />
	))
	.add("with autoFocus", () => (
		<TextInput autoFocus={true} label="Focus" value="Im focused!" />
	))
	.add("with label", () => (
		<TextInput label="Username" placeholder="Enter your username" />
	))
	.add("with isError", () => (
		<TextInput isError={true} label="Password" />
	))