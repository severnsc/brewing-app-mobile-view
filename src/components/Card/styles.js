import { StyleSheet } from "react-native";

export default StyleSheet.create({
	card: {
		padding: 5,
		height: 80,
		justifyContent: "space-between",
		shadowColor: "#000",
		shadowOffset: { width: 4, height: 6 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		backgroundColor: "white"
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between"
	}
});
