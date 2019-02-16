import React from "react";
import PasswordInput from ".";
import { shallow } from "enzyme";

describe("PasswordInput", () => {
  describe("error prop", () => {
    it("should set isError on TextInput to true", () => {
      const error = "error";
      const onChange = jest.fn();
      const passwordInput = shallow(
        <PasswordInput onChange={onChange} error={error} />
      );
      expect(passwordInput.prop("isError")).toBe(true);
    });
    it("should set errorText on TextInput to its value", () => {
      const error = "error";
      const onChange = jest.fn();
      const passwordInput = shallow(
        <PasswordInput onChange={onChange} error={error} />
      );
      expect(passwordInput.prop("errorText")).toEqual(error);
    });
  });
  describe("mounting", () => {
    describe("with invalid value", () => {
      it("should set state error to MUST BE AT LEAST 8 CHARACTERS!", async () => {
        const onChange = jest.fn();
        const passwordInput = shallow(
          <PasswordInput onChange={onChange} value="ab" />
        );
        await passwordInput.instance().componentDidMount();
        expect(passwordInput.state("error")).toBe(
          "MUST BE AT LEAST 8 CHARACTERS!"
        );
      });
    });
    describe("with valid value", () => {
      it("should not change state", async () => {
        const onChange = jest.fn();
        const passwordInput = shallow(
          <PasswordInput onChange={onChange} value="password" />
        );
        await passwordInput.instance().componentDidMount();
        expect(passwordInput.state("error")).toBe("");
      });
    });
  });
  describe("updating", () => {
    describe("when original value is valid", () => {
      describe("when updating to an invalid value", () => {
        it("should set state error to MUST BE AT LEAST 8 CHARACTERS!", async () => {
          const onChange = jest.fn();
          const passwordInput = shallow(
            <PasswordInput onChange={onChange} value="password" />
          );
          passwordInput.setProps({ value: "pass" });
          await passwordInput
            .instance()
            .componentDidUpdate({ onChange, value: "password" });
          expect(passwordInput.state("error")).toBe(
            "MUST BE AT LEAST 8 CHARACTERS!"
          );
        });
      });
      describe("when updating to a valid value", () => {
        it("should not update state", async () => {
          const onChange = jest.fn();
          const passwordInput = shallow(
            <PasswordInput onChange={onChange} value="password" />
          );
          await passwordInput.instance().componentDidMount();
          expect(passwordInput.state("error")).toBe("");
          passwordInput.setProps({ value: "password1" });
          await passwordInput
            .instance()
            .componentDidUpdate({ onChange, value: "password" });
          expect(passwordInput.state("error")).toBe("");
        });
      });
    });
    describe("when original value is invalid", () => {
      describe("when updating to an invalid value", () => {
        it("should not update state", async () => {
          const onChange = jest.fn();
          const passwordInput = shallow(
            <PasswordInput onChange={onChange} value="pass" />
          );
          await passwordInput.instance().componentDidMount();
          expect(passwordInput.state("error")).toBe(
            "MUST BE AT LEAST 8 CHARACTERS!"
          );
          passwordInput.setProps({ value: "passw" });
          await passwordInput
            .instance()
            .componentDidUpdate({ onChange, value: "pass" });
          expect(passwordInput.state("error")).toBe(
            "MUST BE AT LEAST 8 CHARACTERS!"
          );
        });
      });
      describe("when updating to a valid value", () => {
        it("should update state to empty string", async () => {
          const onChange = jest.fn();
          const passwordInput = shallow(
            <PasswordInput onChange={onChange} value="pass" />
          );
          await passwordInput.instance().componentDidMount();
          expect(passwordInput.state("error")).toBe(
            "MUST BE AT LEAST 8 CHARACTERS!"
          );
          passwordInput.setProps({ value: "password" });
          await passwordInput
            .instance()
            .componentDidUpdate({ onChange, value: "pass" });
          expect(passwordInput.state("error")).toBe("");
        });
      });
    });
  });
});
