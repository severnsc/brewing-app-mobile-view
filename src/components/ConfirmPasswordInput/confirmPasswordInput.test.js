import React from "react";
import ConfirmPasswordInput from ".";
import { shallow } from "enzyme";

describe("ConfirmPasswordInput", () => {
  describe("error prop", () => {
    it("should set the isError prop on TextInput to true", () => {
      const onChange = jest.fn();
      const error = "error";
      const confirmPassword = shallow(
        <ConfirmPasswordInput onChange={onChange} error={error} />
      );
      expect(confirmPassword.prop("isError")).toBe(true);
    });
    it("sets the errorText prop on TextInput to its value", () => {
      const onChange = jest.fn();
      const error = "error";
      const confirmPassword = shallow(
        <ConfirmPasswordInput onChange={onChange} error={error} />
      );
      expect(confirmPassword.prop("errorText")).toEqual(error);
    });
  });
  describe("mounting", () => {
    describe("when value is falsy", () => {
      it("should not update state", async () => {
        const onChange = jest.fn();
        const confirmPassword = shallow(
          <ConfirmPasswordInput
            onChange={onChange}
            value=""
            password="password"
          />
        );
        expect(confirmPassword.state("error")).toBe("");
        await confirmPassword.instance().componentDidMount();
        expect(confirmPassword.state("error")).toBe("");
      });
    });
    describe("when value is not equal to password", () => {
      it("should set state error to MUST MATCH PASSWORD!", async () => {
        const onChange = jest.fn();
        const confirmPassword = shallow(
          <ConfirmPasswordInput
            onChange={onChange}
            value="p"
            password="password"
          />
        );
        await confirmPassword.instance().componentDidMount();
        expect(confirmPassword.state("error")).toBe("MUST MATCH PASSWORD!");
      });
    });
    describe("when value equals password", () => {
      it("should not update state", async () => {
        const onChange = jest.fn();
        const confirmPassword = shallow(
          <ConfirmPasswordInput
            onChange={onChange}
            value="password"
            password="password"
          />
        );
        expect(confirmPassword.state("error")).toBe("");
        await confirmPassword.instance().componentDidMount();
        expect(confirmPassword.state("error")).toBe("");
      });
    });
  });
  describe("updating", () => {
    it("should call onChange func", () => {
      const onChange = jest.fn();
      const confirmPassword = shallow(
        <ConfirmPasswordInput
          onChange={onChange}
          value=""
          password="password"
        />
      );
      confirmPassword.find("TextInput").simulate("change");
      expect(onChange).toHaveBeenCalled();
    });
    it("should call onChange func with new value", () => {
      const onChange = jest.fn();
      const confirmPassword = shallow(
        <ConfirmPasswordInput
          onChange={onChange}
          value=""
          password="password"
        />
      );
      confirmPassword.find("TextInput").simulate("change", "value");
      expect(onChange).toHaveBeenCalledWith("value");
    });
    describe("when original value is falsy", () => {
      describe("when updating to value !== password", () => {
        it("should update error state to MUST MATCH PASSWORD!", async () => {
          const onChange = jest.fn();
          const confirmPassword = shallow(
            <ConfirmPasswordInput
              onChange={onChange}
              value=""
              password="password"
            />
          );
          expect(confirmPassword.state("error")).toBe("");
          confirmPassword.setProps({ value: "p" });
          await confirmPassword
            .instance()
            .componentDidUpdate({ onChange, value: "" });
          expect(confirmPassword.state("error")).toBe("MUST MATCH PASSWORD!");
        });
      });
      describe("when updating value to === password", () => {
        it("should not update error state", async () => {
          const onChange = jest.fn();
          const confirmPassword = shallow(
            <ConfirmPasswordInput
              onChange={onChange}
              value=""
              password="password"
            />
          );
          expect(confirmPassword.state("error")).toBe("");
          confirmPassword.setProps({ value: "password" });
          await confirmPassword
            .instance()
            .componentDidUpdate({ onChange, value: "" });
          expect(confirmPassword.state("error")).toBe("");
        });
      });
    });
    describe("when original value !== password", () => {
      describe("when updating to another value !== password", () => {
        it("should leave error state MUST MUST PASSWORD!", async () => {
          const onChange = jest.fn();
          const confirmPassword = shallow(
            <ConfirmPasswordInput
              onChange={onChange}
              value="pass"
              password="password"
            />
          );
          expect(confirmPassword.state("error")).toBe("MUST MATCH PASSWORD!");
          confirmPassword.setProps({ value: "passw" });
          await confirmPassword
            .instance()
            .componentDidUpdate({ onChange, value: "pass" });
          expect(confirmPassword.state("error")).toBe("MUST MATCH PASSWORD!");
        });
      });
      describe("when updating to a value === password", () => {
        it("should update error to empty string", async () => {
          const onChange = jest.fn();
          const confirmPassword = shallow(
            <ConfirmPasswordInput
              onChange={onChange}
              value="passwor"
              password="password"
            />
          );
          expect(confirmPassword.state("error")).toBe("MUST MATCH PASSWORD!");
          confirmPassword.setProps({ value: "password" });
          await confirmPassword
            .instance()
            .componentDidUpdate({ onChange, value: "passwor" });
          expect(confirmPassword.state("error")).toBe("");
        });
      });
    });
    describe("when original value === password", () => {
      describe("when updating to another value !== password", () => {
        it("should set error state to MUST MATCH PASSWORD!", async () => {
          const onChange = jest.fn();
          const confirmPassword = shallow(
            <ConfirmPasswordInput
              onChange={onChange}
              value="password"
              password="password"
            />
          );
          expect(confirmPassword.state("error")).toBe("");
          confirmPassword.setProps({ value: "password1" });
          await confirmPassword
            .instance()
            .componentDidUpdate({ onChange, value: "password" });
          expect(confirmPassword.state("error")).toBe("MUST MATCH PASSWORD!");
        });
      });
    });
  });
});
