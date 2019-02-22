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
  describe("passwordError prop", () => {
    it("should set the error prop on the PasswordInput", () => {
      const error = "PasswordInput error";
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} passwordError={error} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        ["", "", "", ""],
        onChange,
        createAccount
      );
      expect(form.props.children[2].props.error).toEqual(error);
    });
  });
  describe("confirmPasswordError prop", () => {
    it("should set the error prop on the ConfirmPasswordInput", () => {
      const error = "ConfirmPasswordInput error";
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount
          createAccount={createAccount}
          confirmPasswordError={error}
        />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        ["", "", "", ""],
        onChange,
        createAccount
      );
      expect(form.props.children[3].props.error).toEqual(error);
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
