import { StyleSheet } from "react-native";
import { white } from "../constants";

export default StyleSheet.create({
  activityIndicator: {
    position: "absolute",
    right: 0,
    top: 20
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    top: 100,
    margin: 5,
    backgroundColor: white
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
