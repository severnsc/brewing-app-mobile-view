import React from "react";
import UsernameInput from ".";
import { shallow } from "enzyme";
import user from "../../graphql/defaults/user";

jest.mock("../../modules/validation");
describe("UsernameInput", () => {
  beforeEach(() => {
    require("../../modules/validation");
  });

  describe("updating with invalid value", () => {
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
