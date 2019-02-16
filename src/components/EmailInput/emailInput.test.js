import React from "react";
import EmailInput from ".";
import { shallow } from "enzyme";
jest.mock("../../modules/validation");
describe("EmailInput", () => {
  beforeEach(() => {
    require("../../modules/validation");
    fetch.resetMocks();
  });
  describe("error prop", () => {
    it("should set isError prop to true if true", () => {
      const onChange = jest.fn();
      const emailInput = shallow(
        <EmailInput value="" error="error" onChange={onChange} />
      );
      expect(emailInput.prop("isError")).toBe(true);
    });
    it("should pass the error message to errorText", () => {
      const onChange = jest.fn();
      const emailInput = shallow(
        <EmailInput value="" error="error" onChange={onChange} />
      );
      expect(emailInput.prop("errorText")).toBe("error");
    });
  });
  describe("when value is not a valid email", () => {
    it("should be in an error state", async () => {
      fetch.mockResponse(JSON.stringify(false));
      const onChange = jest.fn();
      const emailInput = shallow(<EmailInput value="a" onChange={onChange} />);
      await emailInput.instance().componentDidMount();
      expect(emailInput.prop("isError")).toBe(true);
    });
    it("should set TextInput errorText to INVALID EMAIL!", async () => {
      fetch.mockResponse(JSON.stringify(false));
      const onChange = jest.fn();
      const emailInput = shallow(<EmailInput value="a" onChange={onChange} />);
      await emailInput.instance().componentDidMount();
      expect(emailInput.find("TextInput").prop("errorText")).toBe(
        "INVALID EMAIL!"
      );
    });
  });

  describe("when the value changes and is not a valid email", () => {
    it("should be in an error state", () => {
      fetch.mockResponseOnce(JSON.stringify(false));
      const emailInput = shallow(<EmailInput value="a" onChange={() => {}} />);
      emailInput.setProps({ value: "ab" });
      expect(emailInput.prop("isError")).toBe(true);
    });
    it("should set TextInput errorText to INVALID EMAIL!", () => {
      fetch.mockResponseOnce(JSON.stringify(false));
      const emailInput = shallow(<EmailInput value="a" onChange={() => {}} />);
      emailInput.setProps({ value: "ab" });
      expect(emailInput.find("TextInput").prop("errorText")).toBe(
        "INVALID EMAIL!"
      );
    });
  });

  describe("when value is a valid email", () => {
    it("should not be in an error state", () => {
      fetch.mockResponseOnce(JSON.stringify(true));
      const emailInput = shallow(
        <EmailInput value="me@example.com" onChange={() => {}} />
      );
      expect(emailInput.prop("isError")).toBe(false);
    });
  });

  describe("when value changes from invalid to valid email", () => {
    it("should not be in an error state", async () => {
      fetch.mockResponse(JSON.stringify(true));
      const onChange = jest.fn();
      const emailInput = shallow(<EmailInput value="a" onChange={onChange} />);
      emailInput.setProps({ value: "me@example.com" });
      await emailInput.instance().isEmailUnique("me@example.com");
      expect(emailInput.prop("isError")).toBe(false);
    });
  });

  describe("when email is not unique", () => {
    it("should set state isError to true", () => {
      fetch.mockResponseOnce(JSON.stringify(false));
      const emailInput = shallow(<EmailInput value="a" onChange={() => {}} />);
      emailInput.setProps({ value: "me@example.com" });
      expect(emailInput.prop("isError")).toBe(true);
    });
    it("should set TextInput errorText to EMAIL ALREADY TAKEN!", async () => {
      fetch.mockResponse(JSON.stringify(false));
      const emailInput = shallow(<EmailInput value="a" onChange={() => {}} />);
      emailInput.setProps({ value: "me@example.com" });
      await emailInput.instance().isEmailUnique("me@example.com");
      expect(emailInput.find("TextInput").prop("errorText")).toBe(
        "EMAIL ALREADY TAKEN!"
      );
    });
  });
});
