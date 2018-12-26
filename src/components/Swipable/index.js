import React from "react";
import PropTypes from "prop-types";
import { PanResponder, View } from "react-native";

class Swipable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			right: null,
			mainDiff: null,
			maxMainDiff: null
		};
		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			//onPanResponderGrant: (evt, gestureState) => console.log(gestureState.dx),
			onPanResponderMove: (evt, gestureState) => {
				if (this.state.right < 0) {
					const newRight = this.state.right - gestureState.dx;
					if (newRight > 0) {
						this.setState({
							right: 0,
							mainDiff: this.state.maxMainDiff
						});
					} else {
						this.setState({
							right: newRight,
							mainDiff: this.state.mainDiff - gestureState.dx
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
				maxMainDiff: itemAdjustment
			});
		}
	};

	render() {
		return (
			<View style={{ flexDirection: "row" }} {...this.panResponder.panHandlers}>
				<View style={{ flexGrow: 1, right: this.state.mainDiff }}>
					{this.props.children}
				</View>
				<View
					onLayout={this.logLayout}
					style={{ position: "absolute", right: this.state.right }}
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
