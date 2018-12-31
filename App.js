import React from "react";
import { View } from "react-native";
import { Text, Button } from "./src/components";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Storybook from "./storybook";
import { Home, CreateAccount } from "./src/screens";
import { HOME, STORYBOOK, APP } from "./src/constants";

const AppNavigator = createStackNavigator(
	{
		HOME: { screen: Home },
		CREATE_ACCOUNT: { screen: CreateAccount }
	},
	{ initialRoute: HOME, headerMode: "none" }
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
	{ initialRoute: APP }
);

const AppWithRouting = __DEV__
	? createAppContainer(DevNavigator)
	: createAppContainer(AppNavigator);

export default AppWithRouting;
