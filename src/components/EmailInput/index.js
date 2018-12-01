import React from "react"
import PropTypes from "prop-types"
import { TextInput } from ".."
const validate = require("validate.js")

class EmailInput extends React.Component {

	state = {
		isError: false
	}

	componentDidMount() {
		if(this.props.value){
			this.validateEmail(this.props.value)
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.value !== this.props.value){
			this.validateEmail(this.props.value)
		}
	}

	constraints = {
		from: {
			email: true
		}
	}

	validateEmail = email => {
		const result = validate({from: email}, this.constraints)
		this.setState({ isError: !!result})
	}

	render() {
		const {
			value,
			onChange,
			placeholder,
			autoFocus,
			label
		} = this.props
		const { isError } = this.state
		return(
			<TextInput
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				autoFocus={autoFocus}
				label={label}
				isError={isError}
			/>
		)
	}
}

EmailInput.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	autoFocus: PropTypes.bool,
	label: PropTypes.string
}

export default EmailInput