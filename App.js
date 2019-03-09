import React from "react";
import { View } from "react-native";
import { Button } from "./src/components";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Storybook from "./storybook";
import { Home } from "./src/screens";
import { HOME, STORYBOOK, APP } from "./src/constants";
import { ApolloProvider } from "react-apollo";
import client from "./src/modules/apollo-client";
import AppNavigator from "./src/navigation";

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

export default () => (
  <ApolloProvider client={client}>
    <AppWithRouting />
  </ApolloProvider>
);
