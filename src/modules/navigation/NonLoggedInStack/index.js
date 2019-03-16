import Home from "./Home";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import { HOME } from "../../../constants";
import { createStackNavigator } from "react-navigation";

const NonLoggedInStack = createStackNavigator(
  {
    ...Home,
    ...CreateAccount,
    ...Login
  },
  {
    initialRoute: HOME,
    navigationOptions: { header: null, headerBackTitle: null }
  }
);

export default NonLoggedInStack;
