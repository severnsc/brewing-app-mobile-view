import { StyleSheet } from "react-native";
import { darkestGray, success, danger } from "../../constants";

export default StyleSheet.create({
  activityIndicator: {
    position: "absolute",
    right: 0,
    top: 20
  },
  container: {
    borderBottomColor: darkestGray,
    borderBottomWidth: 1
  },
  focused: {
    color: success,
    borderBottomColor: success
  },
  label: {
    color: darkestGray
  },
  isError: {
    color: danger,
    borderBottomColor: danger
  }
});
