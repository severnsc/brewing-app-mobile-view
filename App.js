import React from "react";
import { View } from "react-native";
import { Text, Button, Icon, Title } from "./src/components";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Storybook from "./storybook";
import { Home, CreateAccount } from "./src/screens";
import { HOME, STORYBOOK, APP, white } from "./src/constants";

const AppNavigator = createStackNavigator(
  {
    HOME: {
      screen: Home,
      navigationOptions: { header: null, headerBackTitle: null }
    },
    CREATE_ACCOUNT: {
      screen: CreateAccount,
      navigationOptions: {
        title: "Sign Up",
        headerStyle: { height: 60 },
        headerTransparent: true,
        headerTitleStyle: { color: white, fontSize: 40 },
        headerLeftContainerStyle: { paddingLeft: 10 },
        headerBackImage: () => (
          <Icon name="ios-arrow-back" size="lg" color={white} />
        ),
        headerTitle: ({ allowFontScaling, style, children }) => (
          <Title
            value={children}
            style={style}
            allowFontScaling={allowFontScaling}
            testID="createAccountTitle"
            color="white"
          />
        )
      }
    }
  },
  { initialRoute: HOME }
);

class App extends React.Component {
  static navigatorOptions = { title: "Home" };

  render() {
    let app;
    if (__DEV__) {
      app = (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            onPress={() => this.props.navigation.navigate(APP)}
            value="To app"
          />
          <Button
            onPress={() => this.props.navigation.navigate(STORYBOOK)}
            value="To Storybook"
          />
        </View>
      );
    } else {
      app = <Home />;
    }
    return app;
  }
}

const DevNavigator = createStackNavigator(
  {
    HOME: { screen: App },
    APP: { screen: AppNavigator, navigationOptions: { header: null } },
    STORYBOOK: { screen: Storybook }
  },
  { initialRoute: HOME }
);

const AppWithRouting = __DEV__
  ? createAppContainer(DevNavigator)
  : createAppContainer(AppNavigator);

export default AppWithRouting;
