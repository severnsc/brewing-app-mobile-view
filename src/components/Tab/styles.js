import { StyleSheet } from "react-native";
import { darkestGray, gray } from "../../constants";

export default StyleSheet.create({
	tab: {
		alignItems: "center",
		padding: 5
	},
	active: {
		borderBottomWidth: 2,
		borderBottomColor: "black"
	},
	activeText: bool => (bool ? darkestGray : gray)
});
