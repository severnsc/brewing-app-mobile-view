import React from "react";
import UsernameInput from ".";
import { shallow } from "enzyme";

describe("UsernameInput", () => {
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
      usernameInput.setProps({
        data: {
          user: {
            id: "1",
            username: "",
            email: "",
            errors: []
          }
        }
      });
      const textInput = usernameInput.dive();
      expect(textInput.prop("value")).toBe("");
      usernameInput.setProps({
        data: {
          user: {
            id: "1",
            username: "valid",
            email: "",
            errors: []
          }
        }
      });
      expect(usernameInput.dive().prop("value")).toBe("valid");
    });
  });

  describe("updating with invalid value", () => {
    it("passes the value through to the TextInput", async () => {
      let usernameInput = shallow(<UsernameInput />);
      usernameInput.setProps({
        data: {
          user: {
            username: "",
            errors: []
          }
        }
      });
      const textInput = usernameInput.dive();
      expect(textInput.prop("value")).toBe("");
      usernameInput.setProps({
        data: {
          user: {
            username: "invalid",
            errors: []
          }
        }
      });
      expect(usernameInput.dive().prop("value")).toBe("invalid");
    });
    it("sets the TextInput isError to true", () => {
      const usernameInput = shallow(<UsernameInput />);
      usernameInput.setProps({
        data: {
          user: {
            username: "invalid",
            errors: []
          }
        }
      });
      const textInput = usernameInput.dive();
      expect(textInput.prop("isError")).toBe(false);
      textInput.simulate("change", "invalid");
      usernameInput.setProps({
        data: {
          user: {
            username: "invalid",
            errors: [
              {
                __typename: "Error",
                message: "Invalid username!",
                location: {
                  __typename: "Location",
                  node: "user",
                  field: "username"
                }
              }
            ]
          }
        }
      });
      expect(usernameInput.dive().prop("isError")).toBe(true);
    });
    it("sets the TextInput errorText to the error message", () => {
      const usernameInput = shallow(<UsernameInput />);
      usernameInput.setProps({
        data: {
          user: {
            username: "invalid",
            errors: []
          }
        }
      });
      const textInput = usernameInput.dive();
      expect(textInput.prop("errorText")).toBe("");
      usernameInput.setProps({
        data: {
          user: {
            username: "invalid",
            errors: [
              {
                __typename: "Error",
                message: "Invalid username!",
                location: {
                  __typename: "Location",
                  node: "user",
                  field: "username"
                }
              }
            ]
          }
        }
      });
      usernameInput.update();
      expect(usernameInput.dive().prop("errorText")).toBe("Invalid username!");
    });
  });
});
