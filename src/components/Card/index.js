import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";

const Card = ({
	upperLeft,
	upperCenter,
	upperRight,
	lowerLeft,
	lowerRight,
	lowerCenterLeft,
	lowerCenterRight,
	onPress
}) => (
	<TouchableOpacity onPress={onPress} style={styles.card}>
		<View style={styles.row}>
			<View>{upperLeft}</View>
			<View>{upperCenter}</View>
			<View>{upperRight}</View>
		</View>
		<View style={styles.row}>
			<View>{lowerLeft}</View>
			<View>{lowerCenterLeft}</View>
			<View>{lowerCenterRight}</View>
			<View>{lowerRight}</View>
		</View>
	</TouchableOpacity>
);

Card.propTypes = {
	upperLeft: PropTypes.node,
	upperCenter: PropTypes.node,
	upperRight: PropTypes.node,
	lowerLeft: PropTypes.node,
	lowerRight: PropTypes.node,
	lowerCenterLeft: PropTypes.node,
	lowerCenterRight: PropTypes.node,
	onPress: PropTypes.func
};

export default Card;
