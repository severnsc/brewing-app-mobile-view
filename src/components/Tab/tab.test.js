import React from "react";
import Tab from ".";
import { shallow } from "enzyme";

describe("Tab", () => {
	describe("when pressing the tab", () => {
		it("calls the onPress prop", () => {
			const onPress = jest.fn();
			const tab = shallow(<Tab onPress={onPress} />);
			tab.simulate("press");
			expect(onPress.mock.calls.length).toBe(1);
		});
		it("passes the value to the onPress prop", () => {
			const onPress = jest.fn();
			const tab = shallow(<Tab onPress={onPress} value="value" />);
			tab.simulate("press");
			expect(onPress).toHaveBeenLastCalledWith("value");
		});
	});
});
