import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import CreateAccount from ".";

describe("Create Account", () => {
	const navigation = {
		navigate: jest.fn()
	};
	describe("layout", () => {
		it("should match the snapshot", () => {
			const createAccount = renderer.create(
				<CreateAccount navigation={navigation} />
			);
			const tree = createAccount.toJSON();
			expect(tree).toMatchSnapshot();
		});
	});
	describe("submitting create account form", () => {
		it("should call the createAccount prop", () => {
			const createAccount = jest.fn();
			const createAccountScreen = shallow(
				<CreateAccount navigation={navigation} createAccount={createAccount} />
			);
			createAccountScreen.find("Form").simulate("submit");
			expect(createAccount).toHaveBeenCalled();
		});
	});
});
