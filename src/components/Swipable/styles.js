import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flexDirection: "row"
	},
	main: right => ({
		flexGrow: 1,
		right
	}),
	swipeLeft: right => ({
		position: "absolute",
		right
	})
});
