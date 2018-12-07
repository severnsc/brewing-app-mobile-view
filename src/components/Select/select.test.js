import React from "react";
import Select from ".";
import { shallow } from "enzyme";

describe("Select", () => {
	describe("when an option is selected", () => {
		it("calls the onSelect prop", () => {
			const onSelect = jest.fn();
			const select = shallow(
				<Select onSelect={onSelect} options={["option1", "option2"]} />
			);
			select
				.find("TouchableOpacity")
				.at(1)
				.simulate("press");
			expect(onSelect.mock.calls.length).toBe(1);
		});
		it("passes the selected option to the onSelect prop", () => {
			const onSelect = jest.fn();
			const select = shallow(
				<Select onSelect={onSelect} options={["option1", "option2"]} />
			);
			select
				.find("TouchableOpacity")
				.at(1)
				.simulate("press");
			expect(onSelect.mock.calls[0][0]).toBe("option2");
		});
	});
});
