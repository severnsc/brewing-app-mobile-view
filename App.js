import React from "react";
import { View } from "react-native";
import { Text, Button } from "./src/components";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Storybook from "./storybook";

const HOME = "HOME";
const STORYBOOK = "STORYBOOK";
const APP = "APP";

class Home extends React.Component {
	static navigatorOptions = { title: "Home" };

	render() {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text value="Home" />
			</View>
		);
	}
}

const AppNavigator = createStackNavigator({
	HOME: { screen: Home }
});

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
						onPress={() => this.props.navigation.navigate(HOME)}
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
		APP: { screen: App },
		HOME: { screen: Home, navigationOptions: { header: null } },
		STORYBOOK: { screen: Storybook }
	},
	{ initialRoute: APP }
);

const AppWithRouting = __DEV__
	? createAppContainer(DevNavigator)
	: createAppContainer(AppNavigator);

export default AppWithRouting;
