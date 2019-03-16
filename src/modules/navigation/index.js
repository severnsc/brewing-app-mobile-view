import { createSwitchNavigator } from "react-navigation";
import NonLoggedInStack from "./NonLoggedInStack";
import LoggedInStack from "./LoggedInStack";
import { NOT_LOGGED_IN } from "../../constants";

export default createSwitchNavigator(
  {
    NOT_LOGGED_IN: { screen: NonLoggedInStack },
    LOGGED_IN: { screen: LoggedInStack }
  },
  {
    initialRouteName: NOT_LOGGED_IN
  }
);
