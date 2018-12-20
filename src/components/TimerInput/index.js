import React from "react";
import { InputAccessoryView, Keyboard, View } from "react-native";
import { TextInput, Text } from "..";
import PropTypes from "prop-types";
import uuidv4 from "uuid/v4";
import { primary, lighterGray } from "../../constants";
import styles from "./styles";

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

	closeKeyboard = () => {
		Keyboard.dismiss();
		this.textInput.blur();
	};

	render() {
		const { value, placeholder, label, autoFocus, onChange } = this.props;
		const id = uuidv4();
		return (
			<View>
				<InputAccessoryView backgroundColor={lighterGray} nativeID={id}>
					<Text
						value="Done"
						color={primary}
						style={styles.accessoryText}
						onPress={this.closeKeyboard}
					/>
				</InputAccessoryView>
				<TextInput
					placeholder={placeholder}
					value={value}
					label={label}
					autoFocus={autoFocus}
					onChange={onChange}
					keyboardType="numeric"
					inputAccessoryViewID={id}
					ref={component => (this.textInput = component)}
				/>
			</View>
		);
	}
}

TimerInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	autoFocus: PropTypes.bool,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

TimerInput.defaultProps = {
	value: ""
};

export default TimerInput;
