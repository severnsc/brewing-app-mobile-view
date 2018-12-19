import React from "react";
import { TextInput } from "..";
import PropTypes from "prop-types";

class TimerInput extends React.Component {
	componentDidUpdate(prevProps) {
		const { value, onChange } = this.props;
		const digitCount = value.replace(/:/g, "").length;
		if (digitCount > 6) {
			onChange(value.slice(0, 8));
			return;
		}
		const prevDigitCount = prevProps.value.replace(/:/g, "").length;
		if (digitCount > prevDigitCount) {
			if (value.split(":").some(str => str.length > 2)) {
				onChange(
					value.slice(0, value.length - 1) + ":" + value[value.length - 1]
				);
				return;
			}
			if (digitCount % 2 === 0 && digitCount < 6) {
				onChange(value + ":");
			}
		}
	}

	render() {
		const { value, placeholder, autoFocus, onChange } = this.props;
		return (
			<TextInput
				placeholder={placeholder}
				value={value}
				autoFocus={autoFocus}
				onChange={onChange}
				keyboardType="numeric"
			/>
		);
	}
}

TimerInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	autoFocus: PropTypes.bool,
	onChange: PropTypes.func.isRequired
};

TimerInput.defaultProps = {
	value: ""
};

export default TimerInput;
