import React from "react";
import {
	Title,
	Form,
	TextInput,
	Button,
	EmailInput,
	GradientView
} from "../../components";
import { KeyboardAvoidingView } from "react-native";
import styles from "./styles";

const CreateAccount = ({ navigation: { navigate } }) => (
	<GradientView>
		<KeyboardAvoidingView style={styles.container}>
			<Form onSubmit={() => {}} style={styles.form}>
				{(values, onChange, onSubmit) => {
					const [username, email, password, confirmPassword] = values;
					return (
						<React.Fragment>
							<TextInput
								id="1"
								value={username}
								label="Username"
								onChange={value => onChange("1", value)}
							/>
							<EmailInput
								id="2"
								value={email}
								label="Email"
								onChange={value => onChange("2", value)}
							/>
							<TextInput
								id="3"
								password
								value={password}
								label="Password"
								onChange={value => onChange("3", value)}
							/>
							<TextInput
								id="3"
								password
								value={confirmPassword}
								label="Confirm Password"
								onChange={value => onChange("4", value)}
							/>
							<Button value="Sign Up" onPress={onSubmit} />
						</React.Fragment>
					);
				}}
			</Form>
		</KeyboardAvoidingView>
	</GradientView>
);

export default CreateAccount;
