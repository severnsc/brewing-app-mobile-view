import React from "react";
import Tabs from ".";
import { Tab } from "..";
import { shallow } from "enzyme";

describe("Tabs", () => {
	describe("when mounting", () => {
		it("should initialize state to the tab with value equal to initialActive", () => {
			const tabs = shallow(
				<Tabs onChange={() => {}} initialActive="Active">
					{(active, handlePress) => {
						const values = ["Active", "Inactive"];
						return values.map(value => (
							<Tab value={value} active={active === value} />
						));
					}}
				</Tabs>
			);
			expect(tabs.state("active")).toBe("Active");
		});
	});
	describe("when pressing an inactive tab", () => {
		it("should set the state to the value of the inactive tab", () => {
			const tabs = shallow(
				<Tabs onChange={() => {}} initialActive="Active">
					{(active, handlePress) => {
						const values = ["Active", "Inactive"];
						return values.map(value => (
							<Tab
								onPress={() => handlePress(value)}
								value={value}
								active={active === value}
							/>
						));
					}}
				</Tabs>
			);
			tabs.childAt(1).simulate("press");
			expect(tabs.state("active")).toBe("Inactive");
		});
		it("should set the inactive tabs active prop to true", () => {
			const tabs = shallow(
				<Tabs onChange={() => {}} initialActive="Active">
					{(active, handlePress) => {
						const values = ["Active", "Inactive"];
						return values.map(value => (
							<Tab
								onPress={() => handlePress(value)}
								value={value}
								active={active === value}
							/>
						));
					}}
				</Tabs>
			);
			tabs.childAt(1).simulate("press");
			expect(tabs.childAt(1).prop("active")).toBe(true);
		});
		it("should call the onChange prop", () => {
			const onChange = jest.fn();
			const tabs = shallow(
				<Tabs onChange={onChange} initialActive="Active">
					{(active, handlePress) => {
						const values = ["Active", "Inactive"];
						return values.map(value => (
							<Tab
								onPress={() => handlePress(value)}
								value={value}
								active={active === value}
							/>
						));
					}}
				</Tabs>
			);
			tabs.childAt(1).simulate("press");
			expect(onChange).toBeCalled();
		});
		it("should pass the pressed tab value to the onChange prop", () => {
			const onChange = jest.fn();
			const tabs = shallow(
				<Tabs onChange={onChange} initialActive="Active">
					{(active, handlePress) => {
						const values = ["Active", "Inactive"];
						return values.map(value => (
							<Tab
								onPress={() => handlePress(value)}
								value={value}
								active={active === value}
							/>
						));
					}}
				</Tabs>
			);
			tabs.childAt(1).simulate("press");
			expect(onChange).toBeCalledWith("Inactive");
		});
	});
});
