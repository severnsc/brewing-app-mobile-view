import React from "react";
import PropTypes from "prop-types";
import { PanResponder, View } from "react-native";
import styles from "./styles";

class Swipable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			right: null,
			mainXDiff: null,
			maxMainXDiffRight: null
		};
		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderMove: (evt, gestureState) => {
				if (this.state.right < 0) {
					const newRight = this.state.right - gestureState.dx;
					if (newRight > 0) {
						this.setState({
							right: 0,
							mainXDiff: this.state.maxMainXDiffRight
						});
					} else {
						this.setState({
							right: newRight,
							mainXDiff: this.state.mainXDiff - gestureState.dx
						});
					}
				}
			}
		});
	}

	logLayout = e => {
		if (this.state.right === null) {
			const itemAdjustment = e.nativeEvent.layout.width;
			this.setState({
				right: -1 * itemAdjustment,
				maxMainXDiffRight: itemAdjustment
			});
		}
	};

	render() {
		return (
			<View style={styles.container} {...this.panResponder.panHandlers}>
				<View style={styles.main(this.state.mainXDiff)}>
					{this.props.children}
				</View>
				<View
					onLayout={this.logLayout}
					style={styles.swipeLeft(this.state.right)}
				>
					{this.props.swipeLeftComponent}
				</View>
			</View>
		);
	}
}

Swipable.propTypes = {
	children: PropTypes.oneOf([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.element)
	]),
	swipeLeftComponent: PropTypes.node,
	swipeLeftComponentWidth: PropTypes.number
};

export default Swipable;
