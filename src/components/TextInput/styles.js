import { StyleSheet } from "react-native";
import { darkestGray, success, danger } from "../../constants";

export default StyleSheet.create({
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
