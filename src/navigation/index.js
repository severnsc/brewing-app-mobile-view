import { createStackNavigator } from "react-navigation";
import Home from "./Home";
import CreateAccount from "./CreateAccount";
import { HOME } from "../constants";

export default createStackNavigator(
  {
    ...Home,
    ...CreateAccount
  },
  { initialRoute: HOME }
);
