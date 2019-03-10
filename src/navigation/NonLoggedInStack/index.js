import Home from "./Home";
import CreateAccount from "./CreateAccount";
import { HOME } from "../../constants";
import { createStackNavigator } from "react-navigation";

const NonLoggedInStack = createStackNavigator(
  {
    ...Home,
    ...CreateAccount
  },
  {
    initialRoute: HOME,
    navigationOptions: { header: null, headerBackTitle: null }
  }
);

export default NonLoggedInStack;
