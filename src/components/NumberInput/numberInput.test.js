import React from "react";
import NumberInput from ".";
import { shallow } from "enzyme";
import TestRenderer from "react-test-renderer";

describe("NumberInput", () => {
	describe("changing value", () => {
		it("should call the onChange prop", () => {
			const onChange = jest.fn();
			const numberInput = shallow(
				<NumberInput value={0} onChange={onChange} />
			);
			numberInput.simulate("change");
			expect(onChange.mock.calls.length).toBe(1);
		});
		it("should pass the current value to the onChange prop", () => {
			const onChange = jest.fn();
			const numberInput = shallow(
				<NumberInput value={0} onChange={onChange} />
			);
			numberInput.find("TextInput").simulate("change", "1");
			expect(onChange.mock.calls[0][0]).toBe("1");
		});
	});
	describe("when value prop is not set", () => {
		it("should set the value to 0", () => {
			const onChange = jest.fn();
			const numberInput = shallow(<NumberInput onChange={onChange} />);
			expect(numberInput.prop("value")).toBe(0);
		});
	});
	describe("when focused", () => {
		it("should display a numeric keyboard", () => {
			const onChange = jest.fn();
			const numberInput = TestRenderer.create(
				<NumberInput onChange={onChange} />
			);
			console.log();
			expect(numberInput.toJSON().children[0].props["keyboardType"]).toBe(
				"numeric"
			);
		});
	});
});
