import React from "react";
import Tabs from ".";
import { Tab } from "..";
import { shallow } from "enzyme";

describe("Tabs", () => {
	describe("when mounting", () => {
		it("should inject onPress handler into each child", () => {
			const tabs = shallow(
				<Tabs onChange={() => {}}>
					<Tab value="Active" active={true} />
					<Tab value="Inactive" />
				</Tabs>
			);
			tabs.find("Tab").forEach(tab => {
				expect(typeof tab.prop("onPress")).toBe("function");
			});
		});
		it("should initialize state to the tab with active set to true", () => {
			const tabs = shallow(
				<Tabs onChange={() => {}}>
					<Tab value="Active" active={true} />
					<Tab value="Inactive" />
				</Tabs>
			);
			expect(tabs.state("active")).toBe("Active");
		});
	});
	describe("when pressing an inactive tab", () => {
		it("should set the state to the value of the inactive tab", () => {
			const tabs = shallow(
				<Tabs onChange={() => {}}>
					<Tab value="Active" active={true} />
					<Tab value="Inactive" />
				</Tabs>
			);
			tabs.childAt(1).simulate("press");
			expect(tabs.state("active")).toBe("Inactive");
		});
		it("should set the inactive tabs active prop to true", () => {
			const tabs = shallow(
				<Tabs onChange={() => {}}>
					<Tab value="Active" active={true} />
					<Tab value="Inactive" />
				</Tabs>
			);
			tabs.childAt(1).simulate("press");
			expect(tabs.childAt(1).prop("active")).toBe(true);
		});
		it("should call the onChange prop", () => {
			const onChange = jest.fn();
			const tabs = shallow(
				<Tabs onChange={onChange}>
					<Tab value="Active" active={true} />
					<Tab value="Inactive" />
				</Tabs>
			);
			tabs.childAt(1).simulate("press");
			expect(onChange).toBeCalled();
		});
		it("should pass the pressed tab value to the onChange prop", () => {
			const onChange = jest.fn();
			const tabs = shallow(
				<Tabs onChange={onChange}>
					<Tab value="Active" active={true} />
					<Tab value="Inactive" />
				</Tabs>
			);
			tabs.childAt(1).simulate("press");
			expect(onChange).toBeCalledWith("Inactive");
		});
	});
});
