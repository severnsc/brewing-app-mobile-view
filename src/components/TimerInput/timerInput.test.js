import React from "react";
import TimerInput from ".";
import { shallow } from "enzyme";

describe("TimerInput", () => {
	describe("when the value changes", () => {
		it("should call the onChange prop", () => {
			const onChange = jest.fn();
			const timerInput = shallow(<TimerInput onChange={onChange} />);
			timerInput.find("TextInput").simulate("change");
			expect(onChange).toBeCalled();
		});
		it("should pass the new value to onChange", () => {
			const onChange = jest.fn();
			const timerInput = shallow(<TimerInput onChange={onChange} />);
			timerInput.find("TextInput").simulate("change", "a");
			expect(onChange).toBeCalledWith("a");
		});
	});
	describe("when focused", () => {
		describe("when value changes from 1 to 2 digits long", () => {
			it("should call the onChange func with a colon appended to the value", () => {
				const onChange = jest.fn();
				const timerInput = shallow(
					<TimerInput onChange={onChange} value="0" autoFocus={true} />
				);
				timerInput.setProps({ value: "00" });
				expect(onChange).toBeCalledWith("00:");
			});
		});
		describe("when value changes from 3 to 4 digits long", () => {
			it("should call the onChange func with a colon appended to the value", () => {
				const onChange = jest.fn();
				const timerInput = shallow(
					<TimerInput onChange={onChange} value="00:0" autoFocus={true} />
				);
				timerInput.setProps({ value: "00:00" });
				expect(onChange).toBeCalledWith("00:00:");
			});
		});
		describe("when value changes from 5 to 6 digits long", () => {
			it("should not add a colon to the value", () => {
				const onChange = jest.fn();
				const timerInput = shallow(
					<TimerInput onChange={onChange} value="00:00:0" autoFocus={true} />
				);
				timerInput.setProps({ value: "00:00:00" });
				expect(onChange).not.toBeCalled();
			});
		});
		describe("when value is 6 digits long", () => {
			it("should not allow new input", () => {
				const onChange = jest.fn();
				const timerInput = shallow(
					<TimerInput onChange={onChange} value="00:00:00" autoFocus={true} />
				);
				timerInput.setProps({ value: "00:00:00:00" });
				expect(onChange).toBeCalledWith("00:00:00");
			});
		});
		describe("when colon is deleted and then a digit is added", () => {
			it("should insert a colon before the new digit", () => {
				const onChange = jest.fn();
				const timerInput = shallow(
					<TimerInput onChange={onChange} value="00:00:" autoFocus={true} />
				);
				timerInput.setProps({ value: "00:00" });
				timerInput.setProps({ value: "00:000" });
				expect(onChange).toBeCalledWith("00:00:0");
			});
		});
	});
});
