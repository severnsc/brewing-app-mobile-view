import { StyleSheet } from "react-native";
import { success, danger } from "../../constants";

export default StyleSheet.create({
	text: {
		fontSize: 16,
		fontFamily: "System"
	},
	bold: {
		fontWeight: "bold"
	},
	success: {
		color: success
	},
	danger: {
		color: danger
	}
});
