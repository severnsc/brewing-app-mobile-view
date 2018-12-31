import React from "react";
import { Title, Button, GradientView } from "../../components";
import { Image, View } from "react-native";
import styles from "./styles";
import { white, CREATE_ACCOUNT, LOGIN } from "../../constants";

const Home = ({ navigation: { navigate } }) => (
	<GradientView>
		<View style={styles.container}>
			<Title value="Brewing App" color={white} />
			<Image source={require("../../../assets/icon.png")} />
			<View style={styles.buttonRow}>
				<Button
					onPress={() => navigate(CREATE_ACCOUNT)}
					value="Create an account"
					style={styles.button}
					secondary
				/>
				<Button
					onPress={() => navigate(LOGIN)}
					value="Login"
					style={styles.button}
					secondary
				/>
			</View>
		</View>
	</GradientView>
);

export default Home;
