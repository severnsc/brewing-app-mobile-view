import React from "react";
import UsernameInput from ".";
import { shallow } from "enzyme";

jest.mock("../../modules/validation");
describe("UsernameInput", () => {
  beforeEach(() => {
    require("../../modules/validation");
  });

  describe("updating with valid value", () => {
    it("passes the value through to the TextInput", () => {
      const usernameInput = shallow(<UsernameInput />);
      const textInput = usernameInput.dive();
      textInput.simulate("change", "valid");
      usernameInput.update();
      expect(usernameInput.dive().prop("value")).toBe("valid");
    });
    it("leaves the TextInput isError as false", () => {
      const usernameInput = shallow(<UsernameInput />);
      const textInput = usernameInput.dive();
      expect(textInput.prop("isError")).toBe(false);
      textInput.simulate("change", "valid");
      usernameInput.update();
      expect(usernameInput.dive().prop("isError")).toBe(false);
    });
    it("leaves the TextInput errorText undefined", () => {
      const usernameInput = shallow(<UsernameInput />);
      const textInput = usernameInput.dive();
      textInput.simulate("change", "valid");
      expect(textInput.prop("errorText")).toBe(undefined);
      usernameInput.update();
      expect(usernameInput.dive().prop("errorText")).toBe(undefined);
    });
  });

  describe("updating with invalid value", () => {
    it("passes the value through to the TextInput", () => {
      const usernameInput = shallow(<UsernameInput />);
      const textInput = usernameInput.dive();
      textInput.simulate("change", "invalid");
      usernameInput.update();
      expect(usernameInput.dive().prop("value")).toBe("invalid");
    });
    it("sets the TextInput isError to true", () => {
      const usernameInput = shallow(<UsernameInput />);
      const textInput = usernameInput.dive();
      textInput.simulate("change", "invalid");
      usernameInput.update();
      expect(usernameInput.dive().prop("isError")).toBe(true);
    });
    it("sets the TextInput errorText to the error message", () => {
      const usernameInput = shallow(<UsernameInput />);
      const textInput = usernameInput.dive();
      textInput.simulate("change", "invalid");
      usernameInput.update();
      expect(usernameInput.dive().prop("errorText")).toBe(
        "Username is invalid!"
      );
    });
  });
});
