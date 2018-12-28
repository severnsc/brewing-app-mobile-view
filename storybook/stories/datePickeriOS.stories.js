import React from "react";
import { DatePickerIOS } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, date, select, text } from "@storybook/addon-knobs";

class DatePicker extends React.Component {
	state = {
		date: new Date()
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
			maximumDate={date("Max Date", new Date("Dec 31 2018"))}
			minimumDate={date("Min Date", new Date("Dec 28 2018"))}
			mode={select("Mode", options, "date")}
			minuteInterval={select("Minute Interval", minuteOptions, "1")}
			locale={text("Locale", "en")}
		/>
	));
