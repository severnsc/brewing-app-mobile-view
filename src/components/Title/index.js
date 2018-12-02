import React from "react";
import { Text } from "..";
import PropTypes from "prop-types";

const Title = ({ value, color, style }) => (
	<Text style={{ ...style, fontSize: 40 }} color={color} value={value} />
);

Title.propTypes = {
	value: PropTypes.string,
	color: PropTypes.string,
	style: PropTypes.object
};

export default Title;
