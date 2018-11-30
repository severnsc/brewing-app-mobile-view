import { StyleSheet } from "react-native"

export default StyleSheet.create({
	button: {
		borderColor:  "#d4dde9",
		borderWidth: 1,
		alignItems: "center",
		padding: 10,
		backgroundColor: "#adb5bd"
	},
	primary: {
		backgroundColor: "#3183c8"
	},
	secondary: {
		backgroundColor: "white"
	},
	secondaryText: {
		color: "#21252a"
	},
	success: {
		backgroundColor: "#37c172",
	},
	danger: {
		backgroundColor: "#dc302f"
	},
	text: {
		color: "white"
	},
	round: {
		borderRadius: 100
	},
	circle: {
		width: 50,
		height: 50,
		borderRadius: 100,
		justifyContent: "center"
	},
	circleText: {
		fontSize: 25
	},
	noBorder: {
		borderWidth: 0
	}
})