import React from "react";
import { Text } from "..";
import PropTypes from "prop-types";
import styles from "./styles";

const Subtitle = props => {
	const allProps = { ...props, style: { ...props.style, ...styles.subtitle } };
	return <Text {...allProps} />;
};

Subtitle.propTypes = {
	value: PropTypes.string,
	bold: PropTypes.bool,
	style: PropTypes.object
};

export default Subtitle;
