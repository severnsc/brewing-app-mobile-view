import React from "react";
import PropTypes from "prop-types";
import { Text as RNText } from "react-native";
import styles from "./styles";

const Text = props => {
	const propNames = Object.keys(props);
	const style = propNames.reduce(
		(obj, propName) => ({ ...obj, ...styles[propName] }),
		{ color: props.color, ...props.style }
	);
	return <RNText style={style}>{props.value}</RNText>;
};

Text.propTypes = {
	value: PropTypes.string,
	bold: PropTypes.bool,
	color: PropTypes.string,
	success: PropTypes.bool,
	danger: PropTypes.bool,
	style: PropTypes.object
};

export default Text;
