import React from "react";
import { Text, Button, TextInput, Icon } from "../../src/components";
import { View, TouchableOpacity } from "react-native";
import {
	createStackNavigator,
	createAppContainer,
	createDrawerNavigator
} from "react-navigation";
import { storiesOf } from "@storybook/react-native";
import { lightGray } from "../../src/constants";

class Home extends React.Component {
	static navigationOptions = { title: "Home" };

	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text value="Home" />
				<Button
					onPress={() => this.props.navigation.navigate("Details")}
					value="Go to Details"
				/>
			</View>
		);
	}
}

class Details extends React.Component {
	static navigationOptions = { title: "Details" };

	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text value="Details" />
				<Button
					onPress={() => this.props.navigation.navigate("Home")}
					value="Go to Home"
				/>
			</View>
		);
	}
}

const AppNavigator = createStackNavigator(
	{ Home, Details },
	{
		initialRouteName: "Home",
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: lightGray
			}
		}
	}
);

const App = createAppContainer(AppNavigator);

class CustomButtons extends React.Component {
	static navigationOptions = {
		headerLeft: <Icon name="ios-menu" />,
		headerRight: (
			<Text onPress={() => alert("Pressed right!")} value="Press me" />
		)
	};

	render() {
		return <Text value="Custom Buttons" />;
	}
}

const CustomButtonsAppNavigator = createStackNavigator(
	{ CustomButtons },
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: lightGray
			}
		}
	}
);

const CustomButtonsApp = createAppContainer(CustomButtonsAppNavigator);

class DrawerHome extends React.Component {
	static navigationOptions = {
		title: "Home"
	};

	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text value="Home" />
			</View>
		);
	}
}

class DrawerDetails extends React.Component {
	static navigationOptions = {
		title: "Details"
	};

	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text value="Details" />
			</View>
		);
	}
}

const DrawerHomeStack = createStackNavigator({
	Home: {
		screen: DrawerHome,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => (
				<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
					<Icon name="ios-menu" />
				</TouchableOpacity>
			)
		})
	}
});

const DrawerDetailsStack = createStackNavigator({
	Details: {
		screen: DrawerDetails,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => (
				<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
					<Icon name="ios-menu" />
				</TouchableOpacity>
			)
		})
	}
});

const DrawerNavigator = createDrawerNavigator({
	Home: { screen: DrawerHomeStack },
	Details: { screen: DrawerDetailsStack }
});

const Drawer = createAppContainer(DrawerNavigator);

storiesOf("DontTest - React Navigation", module)
	.add("default", () => <App />)
	.add("with custom buttons", () => <CustomButtonsApp />)
	.add("Drawer Navigator with hamburger menu", () => <Drawer />);
