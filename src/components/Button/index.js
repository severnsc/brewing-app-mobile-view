import React from "react"
import { TouchableOpacity, Text } from "react-native"
import styles from "./styles"
import PropTypes from "prop-types"

const Button = ({
	value,
	primary,
	secondary,
	success,
	danger,
	round,
	displayBorder
}) => { 
	
	let buttonStyle = styles.button
	let textStyle = styles.text
	if(round) buttonStyle = {...buttonStyle, ...styles.round}
	if(primary) buttonStyle = {...buttonStyle, ...styles.primary}
	if(secondary){
		buttonStyle = {...buttonStyle, ...styles.secondary}
		textStyle = {...textStyle, ...styles.secondaryText}
	}
	if(success) buttonStyle = {...buttonStyle, ...styles.success}
	if(danger) buttonStyle = {...buttonStyle, ...styles.danger}
	if(!displayBorder) buttonStyle = {...buttonStyle, ...styles.noBorder}

	return(
		<TouchableOpacity style={buttonStyle}>
			<Text style={textStyle}>{value}</Text>
		</TouchableOpacity>
	)

}

Button.propTypes = {
	value: PropTypes.string.isRequired,
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	success: PropTypes.bool,
	danger: PropTypes.bool,
	round: PropTypes.bool,
	displayBorder: PropTypes.bool
}

export default Button