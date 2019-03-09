import React from "react";
import { ActivityIndicator } from "react-native";
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
          { id: "4", value: "" },
          { id: "5", value: false }
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
          { id: "4", value: "" },
          { id: "5", value: false }
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
          { id: "4", value: "" },
          { id: "5", value: false }
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
          { id: "4", value: "" },
          { id: "5", value: false }
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
          { id: "4", value: "" },
          { id: "5", value: false }
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
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      expect(form.props.children[2].props.value).toBe("value");
    });
  });
  describe("ConfirmPasswordInput", () => {
    it("sets the password prop to the 3rd value from the values array", () => {
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
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      expect(form.props.children[3].props.password).toBe("value");
    });
    it("sets the value prop to the 4th value from the values array", () => {
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
          { id: "4", value: "value" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      expect(form.props.children[3].props.value).toBe("value");
    });
    it("calls onChange prop with id 4 and newValue when updated", () => {
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
          { id: "4", value: "value" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const confirmPasswordInput = form.props.children[3];
      confirmPasswordInput.props.onChange("newValue");
      expect(onChange).toHaveBeenLastCalledWith("4", "newValue");
    });
  });
  describe("Submit button", () => {
    it("calls createAccount prop onPress", () => {
      const createAccount = jest.fn(() => Promise.resolve());
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const button = form.props.children[4].props.onPress();
      expect(createAccount).toHaveBeenCalled();
    });
    it("calls onChange with 5 and true onPress", () => {
      const createAccount = jest.fn(() => Promise.resolve());
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const button = form.props.children[4];
      button.props.onPress();
      expect(onChange).toHaveBeenCalledWith("5", true);
    });
    it("calls onChange with 5 and false when onSubmit resolves", () => {
      const createAccount = jest.fn(() => Promise.resolve());
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const button = form.props.children[4];
      button.props.onPress();
      return Promise.resolve().then(() => {
        expect(onChange).toHaveBeenCalledWith("5", false);
      });
    });
    it("calls onChange with 5 and false when onSubmit rejects", () => {
      const createAccount = jest.fn(() => Promise.reject());
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      form.props.children[4].props.onPress();
      return Promise.resolve()
        .then()
        .then(() => {
          expect(onChange).toHaveBeenCalledWith("5", false);
        });
    });
    describe("when the 5th form value is true", () => {
      it("replaces the button with an ActivityIndicator", () => {
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
            { id: "4", value: "" },
            { id: "5", value: true }
          ],
          onChange,
          createAccount
        );
        const activityIndicator = form.props.children[4];
        expect(activityIndicator.props.animating).toBe(true);
      });
    });
  });
  describe("submitting create account form", () => {
    it("calls the createAccount prop", () => {
      const createAccount = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      createAccountScreen.find("Form").simulate("submit");
      expect(createAccount).toHaveBeenCalled();
    });
  });
});
