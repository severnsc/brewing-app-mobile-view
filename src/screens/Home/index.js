import React from "react";
import { Title, Button } from "../../components";
import { Image, View } from "react-native";
import styles from "./styles";

const Home = ({ navigation: { navigate } }) => (
	<View style={styles.container}>
		<Title value="Brewing App" />
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
);

export default Home;
