import React from "react";
import PropTypes from "prop-types";
import { Animated, PanResponder, View } from "react-native";
import styles from "./styles";

class Swipable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			swipeLeftXDiff: null,
			mainXDiff: new Animated.Value(0),
			maxXDiff: null,
			isOpen: false
		};
		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderMove: (evt, gestureState) => {
				const isSwipeLeft = gestureState.dx < 0;
				const isSwipeRight = gestureState.dx > 0;
				if (isSwipeLeft) {
					Animated.spring(this.state.swipeLeftXDiff, { toValue: 0 }).start();
					Animated.spring(this.state.mainXDiff, {
						toValue: this.state.maxXDiff
					}).start();
					this.listenerId = this.state.mainXDiff.addListener(({ value }) => {
						if (value === this.state.maxXDiff) {
							this.setState({ isOpen: true }, () =>
								this.state.mainXDiff.removeListener(this.listenerId)
							);
						}
					});
				}
				if (isSwipeRight && this.state.isOpen) {
					Animated.spring(this.state.swipeLeftXDiff, {
						toValue: -1 * this.state.maxXDiff
					}).start();
					Animated.spring(this.state.mainXDiff, {
						toValue: 0
					}).start();
				}
			}
		});
	}

	logLayout = e => {
		if (this.state.swipeLeftXDiff === null) {
			const itemAdjustment = e.nativeEvent.layout.width;
			this.setState({
				swipeLeftXDiff: new Animated.Value(-1 * itemAdjustment),
				maxXDiff: itemAdjustment
			});
		}
	};

	render() {
		return (
			<View style={styles.container} {...this.panResponder.panHandlers}>
				<Animated.View style={styles.main(this.state.mainXDiff)}>
					{this.props.children}
				</Animated.View>
				<Animated.View
					onLayout={this.logLayout}
					style={styles.swipeLeft(this.state.right)}
				>
					{this.props.swipeLeftComponent}
				</Animated.View>
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
