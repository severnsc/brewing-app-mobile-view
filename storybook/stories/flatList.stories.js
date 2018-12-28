import React from "react";
import { FlatList, View } from "react-native";
import { Text } from "../../src/components";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, object } from "@storybook/addon-knobs";

const label = "Data";
const defaultValue = [
	{ key: "One" },
	{ key: "Two" },
	{ key: "Three" },
	{ key: "Four" }
];
const longList = [];
while (longList.length < 100) {
	longList.push({ key: `${longList.length + 1}` });
}
const updateData = async () => longList.map(i => ({ key: `${Math.random()}` }));
const render = ({ item }) => <Text value={item.key} />;
const separator = () => (
	<View
		style={{
			borderBottomWidth: 1,
			borderBottomColor: "#000"
		}}
	/>
);
const empty = () => <Text value="No items" />;
const footer = () => (
	<View style={{ backgroundColor: "gray" }}>
		<Text value="I'm the footer!" />
	</View>
);
const header = () => (
	<View style={{ backgroundColor: "gray" }}>
		<Text value="I'm the header!" />
	</View>
);

storiesOf("FlatList", module)
	.addDecorator(withKnobs)
	.add("default", () => (
		<FlatList data={object(label, defaultValue)} renderItem={render} />
	))
	.add("with ItemSeparatorComponent", () => (
		<FlatList
			data={object(label, defaultValue)}
			renderItem={render}
			ItemSeparatorComponent={separator}
		/>
	))
	.add("when empty", () => (
		<FlatList data={[]} renderItem={render} ListEmptyComponent={empty} />
	))
	.add("with footer", () => (
		<FlatList
			data={object(label, defaultValue)}
			renderItem={render}
			ItemSeparatorComponent={separator}
			ListFooterComponent={footer}
		/>
	))
	.add("with header", () => (
		<FlatList
			data={object(label, defaultValue)}
			renderItem={render}
			ItemSeparatorComponent={separator}
			ListHeaderComponent={header}
		/>
	))
	.add("horizontal layout", () => (
		<FlatList
			data={object(label, defaultValue)}
			renderItem={render}
			ItemSeparatorComponent={separator}
			horizontal={true}
		/>
	))
	.add("with initialNumToRender", () => (
		<FlatList
			data={longList}
			renderItem={render}
			ItemSeparatorComponent={separator}
			initialNumToRender={34}
		/>
	))
	.add("multi column", () => (
		<FlatList
			data={longList}
			renderItem={render}
			ItemSeparatorComponent={separator}
			numColumns={2}
			columnWrapperStyle={{ justifyContent: "space-between" }}
		/>
	))
	.add("with refresh", () => {
		class Refresher extends React.Component {
			state = {
				refreshing: false,
				data: longList
			};

			onRefresh = () => {
				this.setState({ refreshing: true });
				updateData().then(d => {
					this.setState({
						data: d,
						refreshing: false
					});
				});
			};

			render() {
				return (
					<FlatList
						data={this.state.data}
						renderItem={render}
						ItemSeparatorComponent={separator}
						onRefresh={this.onRefresh}
						refreshing={this.state.refreshing}
					/>
				);
			}
		}
		return <Refresher />;
	});
