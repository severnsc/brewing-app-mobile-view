import React from "react";
import { Title, Button } from "../../components";
import { Image, View } from "react-native";
import { LinearGradient } from "expo";
import styles from "./styles";
import { white } from "../../constants";

const Home = ({ navigation: { navigate } }) => (
	<LinearGradient colors={["#cffcf3", "#0ab892"]} style={{ flex: 1 }}>
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
	</LinearGradient>
);

export default Home;
