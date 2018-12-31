import React from "react";
import { DatePickerIOS } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, date, select, text } from "@storybook/addon-knobs";

const groupId = "DatePickeriOS";
class DatePicker extends React.Component {
	state = {
		date: new Date("2018-12-28T05:00:00.000Z")
	};

	updateDate = date => this.setState({ date });

	render() {
		return (
			<DatePickerIOS
				maximumDate={new Date(this.props.maximumDate)}
				minimumDate={new Date(this.props.minimumDate)}
				mode={this.props.mode}
				minuteInterval={this.props.minuteInterval}
				locale={this.props.locale}
				date={this.state.date}
				onDateChange={this.updateDate}
			/>
		);
	}
}

const options = ["date", "time", "datetime"];
const minuteOptions = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"10",
	"12",
	"15",
	"20",
	"30"
];

storiesOf("DatePickerIOS", module)
	.addDecorator(withKnobs)
	.add("default", () => (
		<DatePicker
			maximumDate={date(
				"Max Date",
				new Date("2018-12-31T05:00:00.000Z"),
				groupId
			)}
			minimumDate={date(
				"Min Date",
				new Date("2018-12-28T05:00:00.000Z"),
				groupId
			)}
			mode={select("Mode", options, "date", groupId)}
			minuteInterval={select("Minute Interval", minuteOptions, "1", groupId)}
			locale={text("Locale", "en", groupId)}
		/>
	));
