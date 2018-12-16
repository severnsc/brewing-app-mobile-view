import React from "react";
import PropTypes from "prop-types";
import { Text } from "..";
import { TouchableOpacity } from "react-native";
import styles from "./styles";

const Tab = ({ value, active, onPress }) => {
	const onPressFunc = () => onPress(value);
	return (
		<TouchableOpacity
			onPress={onPressFunc}
			style={active ? { ...styles.tab, ...styles.active } : styles.tab}
		>
			<Text value={value} bold={active} color={active ? "black" : "#cfd4da"} />
		</TouchableOpacity>
	);
};

Tab.propTypes = {
	value: PropTypes.string,
	active: PropTypes.bool,
	onPress: PropTypes.func.isRequired
};

export default Tab;
