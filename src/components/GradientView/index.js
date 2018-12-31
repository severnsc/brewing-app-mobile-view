import React from "react";
import { LinearGradient } from "expo";

const GradientView = ({ children }) => (
	<LinearGradient colors={["#cffcf3", "#0ab892"]} style={{ flex: 1 }}>
		{children}
	</LinearGradient>
);

export default GradientView;
