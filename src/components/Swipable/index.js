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
				const { swipeLeftXDiff, mainXDiff, maxXDiff, isOpen } = this.state;
				const isSwipeLeft = gestureState.dx < 0;
				const isSwipeRight = gestureState.dx > 0;
				if (isSwipeLeft) {
					Animated.spring(swipeLeftXDiff, { toValue: 0 }).start();
					Animated.spring(mainXDiff, {
						toValue: maxXDiff
					}).start();
					this.listenerId = mainXDiff.addListener(({ value }) => {
						if (value === maxXDiff) {
							this.setState({ isOpen: true }, () =>
								mainXDiff.removeListener(this.listenerId)
							);
						}
					});
				}
				if (isSwipeRight && isOpen) {
					Animated.spring(swipeLeftXDiff, {
						toValue: -1 * maxXDiff
					}).start();
					Animated.spring(mainXDiff, {
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
		const { mainXDiff, swipeLeftXDiff } = this.state;
		const { panHandlers } = this.panResponder;
		const { children, swipeLeftComponent } = this.props;
		return (
			<View style={styles.container} {...panHandlers}>
				<Animated.View style={styles.main(mainXDiff)}>{children}</Animated.View>
				<Animated.View
					onLayout={this.logLayout}
					style={styles.swipeLeft(swipeLeftXDiff)}
				>
					{swipeLeftComponent}
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
