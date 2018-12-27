import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "100%",
		minHeight: 10
	},
	color: value => {
		const object = { flex: 1, marginLeft: 5 };
		if (value == "0") {
			object.backgroundColor = "#fbfadc";
			return object;
		} else if (value == "1") {
			object.backgroundColor = "#fcf695";
			return object;
		} else if (value == "2") {
			object.backgroundColor = "#fdeb76";
			return object;
		} else if (value == "3") {
			object.backgroundColor = "#fae548";
			return object;
		} else if (value == "4") {
			object.backgroundColor = "#ffcd62";
			return object;
		} else if (value == "5") {
			object.backgroundColor = "#ffbc54";
			return object;
		} else if (value == "6") {
			object.backgroundColor = "#f8b444";
			return object;
		} else if (value == "7") {
			object.backgroundColor = "#f6aa3d";
			return object;
		} else if (value == "8") {
			object.backgroundColor = "#faa23a";
			return object;
		} else if (value == "9") {
			object.backgroundColor = "#f79f37";
			return object;
		} else if (value == "10") {
			object.backgroundColor = "#f39936";
			return object;
		} else if (value == "11") {
			object.backgroundColor = "#f09537";
			return object;
		} else if (value == "12") {
			object.backgroundColor = "#fa8c22";
			return object;
		} else if (value == "13") {
			object.backgroundColor = "#f08925";
			return object;
		} else if (value == "14") {
			object.backgroundColor = "#ea8721";
			return object;
		} else if (value == "15") {
			object.backgroundColor = "#f1831c";
			return object;
		} else if (value == "16") {
			object.backgroundColor = "#fa8c22";
			return object;
		} else if (value == "17") {
			object.backgroundColor = "#e77d26";
			return object;
		} else if (value == "18") {
			object.backgroundColor = "#e3761e";
			return object;
		} else if (value == "19") {
			object.backgroundColor = "#dc7727";
			return object;
		} else if (value == "20") {
			object.backgroundColor = "#db7525";
			return object;
		} else if (value <= "25") {
			object.backgroundColor = "#d66b19";
			return object;
		} else if (value <= "30") {
			object.backgroundColor = "#c66829";
			return object;
		} else if (value <= "35") {
			object.backgroundColor = "#bf602c";
			return object;
		} else if (value <= "40") {
			object.backgroundColor = "#b95e2e";
			return object;
		} else if (value <= "50") {
			object.backgroundColor = "#ac5b27";
			return object;
		} else if (value <= "60") {
			object.backgroundColor = "#a6542e";
			return object;
		} else if (value <= "70") {
			object.backgroundColor = "#994d28";
			return object;
		} else if (value <= "80") {
			object.backgroundColor = "#93411d";
			return object;
		} else if (value <= "90") {
			object.backgroundColor = "#8d3e25";
			return object;
		} else if (value <= "100") {
			object.backgroundColor = "#7c3c1f";
			return object;
		} else if (value <= "120") {
			object.backgroundColor = "#763522";
			return object;
		} else if (value <= "140") {
			object.backgroundColor = "#723224";
			return object;
		} else if (value <= "160") {
			object.backgroundColor = "#723522";
			return object;
		} else if (value <= "180") {
			object.backgroundColor = "#653322";
			return object;
		} else if (value <= "200") {
			object.backgroundColor = "#633119";
			return object;
		} else if (value <= "250") {
			object.backgroundColor = "#56301d";
			return object;
		} else if (value <= "300") {
			object.backgroundColor = "#522d21";
			return object;
		} else if (value <= "350") {
			object.backgroundColor = "#452823";
			return object;
		} else if (value <= "400") {
			object.backgroundColor = "#45241f";
			return object;
		} else if (value <= "450") {
			object.backgroundColor = "#36241e";
			return object;
		} else if (value <= "500") {
			object.backgroundColor = "#31241b";
			return object;
		} else if (value <= "550") {
			object.backgroundColor = "#2f211e";
			return object;
		} else if (value <= "600") {
			object.backgroundColor = "#29201b";
			return object;
		} else {
			object.backgroundColor = "#000";
			return object;
		}
	}
});
