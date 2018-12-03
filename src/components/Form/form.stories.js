import React from "react";
import Form from ".";
import { TextInput, EmailInput, Button } from "..";
import { storiesOf } from "@storybook/react-native";

const onChange = (onPress = () => {});

storiesOf("Form", module)
	.add("with children", () => (
		<Form onSubmit={() => {}}>
			<TextInput
				label="Text"
				value=""
				placeholder="Enter text here"
				onChange={onChange}
			/>
			<EmailInput
				label="Email"
				value=""
				placeholder="Enter email here"
				onChange={onChange}
			/>
			<Button success={true} type="submit" value="submit" />
		</Form>
	))
	.add("with style", () => (
		<Form
			onSubmit={() => {}}
			style={{
				borderWidth: 1,
				borderColor: "black"
			}}
		>
			<TextInput
				label="Text"
				value=""
				placeholder="Enter text here"
				onChange={onChange}
			/>
			<EmailInput
				label="Email"
				value=""
				placeholder="Enter email here"
				onChange={onChange}
			/>
			<Button type="submit" value="submit" success={true} />
		</Form>
	));
