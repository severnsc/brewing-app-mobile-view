import { createStackNavigator } from "react-navigation";
import Dashboard from "./Dashboard";
import { DASHBOARD } from "../../../constants";

const LoggedInStack = createStackNavigator(
  {
    ...Dashboard
  },
  {
    initialRoute: DASHBOARD,
    navigationOptions: { header: null, headerBackTitle: null }
  }
);

export default LoggedInStack;
