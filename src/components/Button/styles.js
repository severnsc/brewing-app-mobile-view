import { StyleSheet } from "react-native";
import { lightGray, gray, primary, success, danger } from "../../constants";

export default StyleSheet.create({
  button: {
    borderColor: lightGray,
    borderWidth: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: gray
  },
  primary: {
    backgroundColor: primary
  },
  secondary: {
    backgroundColor: "white"
  },
  success: {
    backgroundColor: success
  },
  danger: {
    backgroundColor: danger
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
  hideBorder: {
    borderWidth: 0
  }
});
