import React from "react";
import PropTypes from "prop-types";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { iconSizes } from "../../constants";

const Icon = ({ name, size, color }) => {
	if (["balance-scale", "percent"].includes(name))
		return <FontAwesome name={name} size={iconSizes[size]} color={color} />;
	return <Ionicons name={name} size={iconSizes[size]} color={color} />;
};

Icon.propTypes = {
	name: PropTypes.oneOf([
		"md-create",
		"ios-add-circle",
		"ios-menu",
		"ios-close",
		"ios-arrow-back",
		"ios-checkmark",
		"ios-arrow-forward",
		"balance-scale",
		"percent",
		"md-globe",
		"ios-cash",
		"ios-calendar",
		"ios-refresh",
		"ios-alert",
		"ios-list",
		"ios-flask",
		"ios-beer"
	]),
	size: PropTypes.oneOf(["sm", "md", "lg"]),
	color: PropTypes.string
};

Icon.defaultProps = {
	size: "md",
	color: "#000"
};

export default Icon;
