import { StyleSheet } from "react-native";
import { white } from "../constants";

export default StyleSheet.create({
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
