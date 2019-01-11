import React from "react";
import { Text } from "..";
import PropTypes from "prop-types";
import styles from "./styles";

const Title = ({ value, color, style, testID }) => (
	<Text
		style={{ ...style, ...styles.title }}
		color={color}
		value={value}
		testID={testID}
	/>
);

Title.propTypes = {
	value: PropTypes.string,
	color: PropTypes.string,
	style: PropTypes.object,
	testID: PropTypes.string
};

export default Title;
