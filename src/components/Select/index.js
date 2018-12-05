import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Animated, View } from "react-native";
import { Subtitle } from "..";
import styles from "./styles";

class AnimatedView extends React.Component {
	state = {
		fadeIn: new Animated.Value(0)
	};

	componentDidMount() {
		if (this.props.animate) {
			Animated.timing(this.state.fadeIn, {
				toValue: 1,
				duration: 500
			}).start();
		}
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.animate && this.props.animate) {
			Animated.timing(this.state.fadeIn, {
				toValue: 1,
				duration: 50
			}).start();
		}
	}

	render() {
		const { fadeIn } = this.state;
		const fadeInValue = fadeIn.interpolate({
			inputRange: [0, 1],
			outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]
		});
		return (
			<Animated.View
				style={{
					...styles.fadeView,
					backgroundColor: fadeInValue
				}}
			>
				{this.props.children}
			</Animated.View>
		);
	}
}

class Select extends React.Component {
	state = {
		selected: { value: "", animate: false }
	};

	componentDidMount() {
		this.setState({
			selected: {
				value: this.props.options[this.props.initialSelectedIndex],
				animate: false
			}
		});
	}

	handlePress = option => {
		this.setState({ selected: { value: option, animate: true } });
	};

	render() {
		const { options } = this.props;
		return options.map(option =>
			option === this.state.selected.value ? (
				<TouchableOpacity
					value={option}
					onPress={this.handlePress.bind(this, option)}
					key={option}
				>
					<AnimatedView animate={this.state.selected.animate}>
						<Subtitle value={option} />
						<Subtitle value="&#x2714;" />
					</AnimatedView>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					value={option}
					onPress={this.handlePress.bind(this, option)}
					key={option}
				>
					<AnimatedView animate={false}>
						<Subtitle value={option} />
					</AnimatedView>
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
