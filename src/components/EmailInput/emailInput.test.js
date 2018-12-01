import React from "react";
import EmailInput from ".";
import { shallow } from "enzyme";

describe("EmailInput", () => {
  describe("when value is not a valid email", () => {
    it("should be in an error state", () => {
      const emailInput = shallow(<EmailInput value="a" onChange={() => {}} />);
      expect(emailInput.prop("isError")).toBe(true);
    });
  });

  describe("when the value changes and is not a valid email", () => {
    it("should be in an error state", () => {
      const emailInput = shallow(<EmailInput value="a" onChange={() => {}} />);
      emailInput.setProps({ value: "ab" });
      expect(emailInput.prop("isError")).toBe(true);
    });
  });

  describe("when value is a valid email", () => {
    it("should not be in an error state", () => {
      const emailInput = shallow(
        <EmailInput value="me@example.com" onChange={() => {}} />
      );
      expect(emailInput.prop("isError")).toBe(false);
    });
  });

  describe("when value changes from invalid to valid email", () => {
    it("should not be in an error state", () => {
      const emailInput = shallow(<EmailInput value="a" onChange={() => {}} />);
      emailInput.setProps({ value: "me@example.com" });
      expect(emailInput.prop("isError")).toBe(false);
    });
  });
});
