import React from "react";
import { Text } from "..";
import PropTypes from "prop-types";

const Subtitle = props => {
	const allProps = { ...props, style: { ...props.style, fontSize: 24 } };
	return <Text {...allProps} />;
};

Subtitle.propTypes = {
	value: PropTypes.string,
	bold: PropTypes.bool,
	style: PropTypes.object
};

export default Subtitle;
