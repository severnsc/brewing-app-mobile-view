import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Home from ".";
import { CREATE_ACCOUNT, LOGIN } from "../../constants";

describe("Home screen", () => {
	describe("layout", () => {
		it("should match the snapshot", () => {
			const home = renderer
				.create(<Home navigation={{ navigate: () => {} }} />)
				.toJSON();
			expect(home).toMatchSnapshot();
		});
	});
	describe("interactions", () => {
		describe("pressing the create account button", () => {
			it("should call the navigate prop with the CREATE_ACCOUNT constant", () => {
				const navigate = jest.fn();
				const navigation = { navigate };
				const home = shallow(<Home navigation={navigation} />);
				home
					.find("Button")
					.first()
					.simulate("press");
				expect(navigate).toBeCalledWith(CREATE_ACCOUNT);
			});
		});
		describe("pressing the login button", () => {
			it("should call the navigate prop with the LOGIN constant", () => {
				const navigate = jest.fn();
				const navigation = { navigate };
				const home = shallow(<Home navigation={navigation} />);
				home.find({ value: "Login" }).simulate("press");
				expect(navigate).toBeCalledWith(LOGIN);
			});
		});
	});
});
