import { createStackNavigator } from "react-navigation";
import NonLoggedInStack from "./NonLoggedInStack";
import LoggedInStack from "./LoggedInStack";
import { NOT_LOGGED_IN } from "../constants";

export default createStackNavigator(
  {
    NOT_LOGGED_IN: { screen: NonLoggedInStack },
    LOGGED_IN: { screen: LoggedInStack }
  },
  {
    initialRoute: NOT_LOGGED_IN,
    navigationOptions: { header: null, headerBackTitle: null }
  }
);
