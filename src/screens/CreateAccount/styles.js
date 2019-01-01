import { StyleSheet } from "react-native";
import { white } from "../../constants";

export default StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: white,
		margin: 5,
		top: 100
	},
	form: {
		width: "100%",
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	input: {
		marginVertical: 10
	}
});
