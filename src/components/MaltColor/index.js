import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "..";
import styles from "./styles";

const MaltColor = ({ value, displayValue, containerStyle, colorStyle }) => (
	<View style={{ ...styles.container, ...containerStyle }}>
		{displayValue ? <Text value={value} /> : null}
		<View style={{ ...styles.color(value), ...colorStyle }} />
	</View>
);

MaltColor.propTypes = {
	value: PropTypes.number.isRequired,
	displayValue: PropTypes.bool,
	containerStyle: PropTypes.object,
	colorStyle: PropTypes.object
};

MaltColor.defaultProps = {
	displayValue: true
};

export default MaltColor;
