import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import { Subtitle } from "..";
import styles from "./styles";

class Select extends React.Component {
	state = {
		selected: { value: "", background: "rgb(255, 255, 255)" }
	};

	componentDidMount() {
		this.setState({
			selected: {
				...this.state.selected,
				value: this.props.options[this.props.initialSelectedIndex]
			}
		});
	}

	handlePress = option => {
		this.setState({
			selected: { value: option, background: "rgb(241, 243, 245)" }
		});
	};

	render() {
		const { options } = this.props;
		return options.map(option =>
			option === this.state.selected.value ? (
				<TouchableOpacity
					value={option}
					onPress={this.handlePress.bind(this, option)}
					key={option}
					activeOpacity={0.5}
				>
					<View
						style={{
							...styles.option,
							backgroundColor: this.state.selected.background
						}}
					>
						<Subtitle value={option} />
						<Subtitle value="&#x2714;" />
					</View>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					value={option}
					onPress={this.handlePress.bind(this, option)}
					key={option}
					activeOpacity={0.5}
				>
					<View style={styles.option}>
						<Subtitle value={option} />
					</View>
				</TouchableOpacity>
			)
		);
	}
}

Select.propTypes = {
	options: PropTypes.arrayOf(PropTypes.string),
	initialSelectedIndex: PropTypes.number
};

Select.defaultProps = {
	initialSelectedIndex: 0
};

export default Select;
