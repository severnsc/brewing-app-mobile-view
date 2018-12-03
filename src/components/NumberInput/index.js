import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "..";

const NumberInput = ({ value, onChange, autoFocus, label }) => (
	<TextInput
		value={value}
		onChange={onChange}
		autoFocus={autoFocus}
		label={label}
		keyboardType="numeric"
	/>
);

NumberInput.propTypes = {
	value: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	autoFocus: PropTypes.bool,
	label: PropTypes.string
};

NumberInput.defaultProps = {
	value: 0
};

export default NumberInput;
