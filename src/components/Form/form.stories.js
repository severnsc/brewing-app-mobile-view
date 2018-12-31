import React from "react";
import Form from ".";
import { TextInput, EmailInput, Button } from "..";
import { storiesOf } from "@storybook/react-native";

const onChange = (onPress = () => {});

storiesOf("Form", module)
	.add("with children", () => (
		<Form onSubmit={() => {}}>
			{(values, onChange, onSubmit) => {
				const [first, second, ...rest] = values;
				return (
					<React.Fragment>
						<TextInput
							label="Text"
							value={first && first.value}
							placeholder="Enter text here"
							onChange={onChange}
						/>
						<EmailInput
							label="Email"
							value={second && second.value}
							placeholder="Enter email here"
							onChange={onChange}
						/>
						<Button success={true} value="submit" onPress={onSubmit} />
					</React.Fragment>
				);
			}}
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
			{(values, onChange, onSubmit) => {
				const [first, second, ...rest] = values;
				return (
					<React.Fragment>
						<TextInput
							label="Text"
							value={first && first.value}
							placeholder="Enter text here"
							onChange={onChange}
						/>
						<EmailInput
							label="Email"
							value={second && second.value}
							placeholder="Enter email here"
							onChange={onChange}
						/>
						<Button onPress={onSubmit} value="submit" success={true} />
					</React.Fragment>
				);
			}}
		</Form>
	));
