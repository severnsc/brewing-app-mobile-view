import React from "react"
import { TouchableOpacity, Text } from "react-native"
import styles from "./styles"
import PropTypes from "prop-types"

const Button = ({
	value,
	onPress,
	disabled,
	primary,
	secondary,
	success,
	danger,
	round,
	circle,
	hideBorder,
	style
}) => { 
	
	let buttonStyle = styles.button
	let textStyle = styles.text
	if(round) buttonStyle = {...buttonStyle, ...styles.round}
	if(circle){
		buttonStyle = {...buttonStyle, ...styles.circle}
		textStyle = {...textStyle, ...styles.circleText}
	}
	if(primary) buttonStyle = {...buttonStyle, ...styles.primary}
	if(secondary){
		buttonStyle = {...buttonStyle, ...styles.secondary}
		textStyle = {...textStyle, ...styles.secondaryText}
	}
	if(success) buttonStyle = {...buttonStyle, ...styles.success}
	if(danger) buttonStyle = {...buttonStyle, ...styles.danger}
	if(hideBorder) buttonStyle = {...buttonStyle, ...styles.noBorder}

	return(
		<TouchableOpacity
			style={{...buttonStyle, ...style}}
			disabled={disabled}
			onPress={onPress}
		>
			<Text style={textStyle}>{value}</Text>
		</TouchableOpacity>
	)

}

Button.propTypes = {
	value: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	success: PropTypes.bool,
	danger: PropTypes.bool,
	round: PropTypes.bool,
	circle: PropTypes.bool,
	hideBorder: PropTypes.bool,
	style: PropTypes.object
}

export default Button