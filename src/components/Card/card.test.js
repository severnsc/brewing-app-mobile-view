import React from "react";
import Card from ".";
import { shallow } from "enzyme";

describe("Card", () => {
	describe("pressing the card", () => {
		it("should call the onPress prop", () => {
			const onPress = jest.fn();
			const card = shallow(<Card onPress={onPress} />);
			card.simulate("press");
			expect(onPress.mock.calls.length).toBe(1);
		});
	});
});
