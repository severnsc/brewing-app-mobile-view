import React from "react";
import UsernameInput from ".";
import { shallow } from "enzyme";
import { mutate, compose } from "react-apollo";

jest.mock("../../modules/validation");
describe("UsernameInput", () => {
  beforeEach(() => {
    require("../../modules/validation");
    jest.useFakeTimers();
  });

  it("passes testID prop through to the base TextInput", () => {
    const usernameInput = shallow(<UsernameInput testID="test" />);
    const textInput = usernameInput.dive();
    expect(textInput.prop("testID")).toBe("test");
  });

  it("passes style prop through to the TextInput", () => {
    const usernameInput = shallow(<UsernameInput style={{ padding: "10" }} />);
    const textInput = usernameInput.dive();
    expect(textInput.prop("style")).toEqual({ padding: "10" });
  });

  it("has label Username", () => {
    const usernameInput = shallow(<UsernameInput style={{ padding: "10" }} />);
    const textInput = usernameInput.dive();
    expect(textInput.prop("label")).toBe("Username");
  });

  describe("error state", () => {
    it("sets an error state only for username errors", () => {
      const usernameInput = shallow(<UsernameInput />);
      const textInput = usernameInput.dive();
      expect(textInput.prop("isError")).toBe(false);
    });
  });

  describe("updating with valid value", () => {
    it("passes the value through to the TextInput", () => {
      const usernameInput = shallow(<UsernameInput />);
      const textInput = usernameInput.dive();
      expect(textInput.prop("value")).toBe("");
      textInput.simulate("change", "valid");
      usernameInput.update();
      expect(textInput.prop("value")).toBe("valid");
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
    it("passes the value through to the TextInput", async () => {
      let usernameInput = shallow(<UsernameInput />);
      const textInput = usernameInput.dive();
      textInput.simulate("change", "invalid");
      expect(textInput.prop("value")).toBe("invalid");
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
