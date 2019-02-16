import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import CreateAccount from ".";

describe("Create Account", () => {
  describe("layout", () => {
    it("should match the snapshot", () => {
      const createAccount = renderer.create(<CreateAccount />);
      const tree = createAccount.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe("emailError prop", () => {
    it("should set the error prop on EmailInput", () => {
      const error = "EmailInput error";
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} emailError={error} />
      );
      const emailInput = createAccountScreen.find("Form").prop("children")(
        ["", "", "", ""],
        onChange,
        createAccount
      );
      expect(emailInput.props.children[1].props.error).toEqual(error);
    });
  });
  describe("submitting create account form", () => {
    it("should call the createAccount prop", () => {
      const createAccount = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      createAccountScreen.find("Form").simulate("submit");
      expect(createAccount).toHaveBeenCalled();
    });
  });
});
