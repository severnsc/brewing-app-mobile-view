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
  describe("UsernameInput", () => {
    it("sets the validationLoading prop to the first value in values array", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: "" },
          { id: "3", value: "" },
          { id: "4", value: "" }
        ],
        onChange,
        createAccount
      );
      expect(form.props.children[0].props.validationLoading).toBe(false);
    });
    it("calls onChange with the id and value onValidationChange", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: "" },
          { id: "3", value: "" },
          { id: "4", value: "" }
        ],
        onChange,
        createAccount
      );
      form.props.children[0].props.onValidationChange(true);
      expect(onChange).toHaveBeenCalledWith("1", true);
    });
  });
  describe("EmailInput", () => {
    it("sets the validationLoading prop to the second value in values array", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" }
        ],
        onChange,
        createAccount
      );
      expect(form.props.children[1].props.validationLoading).toBe(false);
    });
    it("calls onChange with the id and value onValidationChange", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" }
        ],
        onChange,
        createAccount
      );
      form.props.children[1].props.onValidationChange(true);
      expect(onChange).toHaveBeenCalledWith("2", true);
    });
  });
  describe("PasswordInput", () => {
    it("calls onChange with the id and value onChange", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" }
        ],
        onChange,
        createAccount
      );
      form.props.children[2].props.onChange("value");
      expect(onChange).toHaveBeenCalledWith("3", "value");
    });
    it("sets the value prop to the third value from the returned values array", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" }
        ],
        onChange,
        createAccount
      );
      expect(form.props.children[2].props.value).toBe("value");
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
