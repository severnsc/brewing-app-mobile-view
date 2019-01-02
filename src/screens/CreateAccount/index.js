import React from "react";
import {
	Text,
	Title,
	Form,
	TextInput,
	Button,
	EmailInput,
	GradientView,
	UsernameInput,
	PasswordInput
} from "../../components";
import { KeyboardAvoidingView } from "react-native";
import styles from "./styles";
import { white } from "../../constants";
import { validatePassword, validateUsername } from "../../modules/validation";

const CreateAccount = ({ navigation: { navigate } }) => (
	<GradientView>
		<KeyboardAvoidingView style={styles.container}>
			<Form onSubmit={() => {}} style={styles.form}>
				{(values, onChange, onSubmit) => {
					const username = values.find(v => v.id === "1");
					const email = values.find(v => v.id === "2");
					const password = values.find(v => v.id === "3");
					const confirmPassword = values.find(v => v.id === "4");
					let confirmPasswordErrorText;
					if (
						confirmPassword &&
						password &&
						confirmPassword.value !== password.value
					) {
						confirmPasswordErrorText = "MUST MATCH PASSWORD!";
					}
					return (
						<React.Fragment>
							<UsernameInput
								id="1"
								value={username && username.value}
								onChange={value => onChange("1", value)}
								style={styles.input}
							/>
							<EmailInput
								id="2"
								value={email && email.value}
								label="Email"
								onChange={value => onChange("2", value)}
								style={styles.input}
							/>
							<PasswordInput
								id="3"
								onChange={value => onChange("3", value)}
								value={password && password.value}
								style={styles.input}
							/>
							<TextInput
								id="4"
								errorText={confirmPasswordErrorText}
								isError={!!confirmPasswordErrorText}
								password
								value={confirmPassword && confirmPassword.value}
								label="Confirm Password"
								onChange={value => onChange("4", value)}
								style={styles.input}
							/>
							<Button
								success
								textColor={white}
								value="Sign Up"
								onPress={onSubmit}
								style={styles.button}
							/>
						</React.Fragment>
					);
				}}
			</Form>
		</KeyboardAvoidingView>
	</GradientView>
);

export default CreateAccount;
