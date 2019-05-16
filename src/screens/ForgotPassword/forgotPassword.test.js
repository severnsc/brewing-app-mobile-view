import React from "react";
import ForgotPassword from ".";
import { shallow } from "enzyme";
import styles from "../styles";
import { AlertIOS } from "react-native";
import { NETWORK_ERROR, INVALID_EMAIL, white } from "../../constants";
import renderer from "react-test-renderer";

describe("Forgot Password screen", () => {
  const onSubmit = jest.fn();
  const onChange = jest.fn();
  const value = "value";
  const forgotPassword = shallow(
    <ForgotPassword onSubmit={onSubmit} onChange={onChange} value={value} />
  );
  it("matches snapshot", () => {
    const screen = renderer.create(<ForgotPassword onSubmit={onSubmit} />);
    const tree = screen.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("returns a GradientView", () => {
    const gradient = forgotPassword.find("GradientView");
    expect(gradient).toHaveLength(1);
  });
  it("returns a KeyboardAvoidingView with container style", () => {
    const keyboardAvoid = forgotPassword.find("KeyboardAvoidingView");
    expect(keyboardAvoid).toHaveLength(1);
    expect(keyboardAvoid.prop("style")).toEqual(styles.container);
  });
  it("returns a View with form styles", () => {
    const form = forgotPassword.findWhere(n => n.prop("style") === styles.form);
    expect(form).toHaveLength(1);
  });
  describe("isError prop", () => {
    it("renders an INVALID_EMAIL error on TextInput when true", () => {
      const onSubmit = jest.fn();
      const forgotPassword = shallow(
        <ForgotPassword onSubmit={onSubmit} isError={true} />
      );
      const textInput = forgotPassword.find("TextInput");
      expect(textInput.prop("errorText")).toBe(INVALID_EMAIL);
    });
    it("sets isError prop to true", () => {
      const onSubmit = jest.fn();
      const forgotPassword = shallow(
        <ForgotPassword onSubmit={onSubmit} isError={true} />
      );
      const textInput = forgotPassword.find("TextInput");
      expect(textInput.prop("isError")).toBe(true);
    });
  });
  describe("forgotPasswordError prop", () => {
    it("renders an AlertIOS with forgotPasswordError message when truthy", () => {
      const spy = jest.spyOn(AlertIOS, "alert");
      shallow(<ForgotPassword forgotPasswordError={NETWORK_ERROR} />);
      expect(spy).toHaveBeenCalledWith("Error!", NETWORK_ERROR);
    });
    it("does not render an AlertIOS when forgotPasswordError is falsy", () => {
      const spy = jest.spyOn(AlertIOS, "alert");
      spy.mockClear();
      shallow(<ForgotPassword forgotPasswordError="" />);
      expect(spy).not.toHaveBeenCalled();
    });
  });
  describe("Form children", () => {
    describe("TextInput", () => {
      const emailInput = forgotPassword.find("TextInput");
      it("returns a TextInput with label Email", () => {
        expect(emailInput.prop("label")).toBe("Email");
      });
      it("has input styles", () => {
        expect(emailInput.prop("style")).toEqual(styles.input);
      });
      it("sets TextInput value equal to value prop", () => {
        expect(emailInput.prop("value")).toBe(value);
      });
      it("calls provided onChange function with new value onChange", () => {
        emailInput.props().onChange("new value");
        expect(onChange).toHaveBeenCalledWith("new value");
      });
    });
    describe("Button", () => {
      const button = forgotPassword.find("Button");
      it("has value Send Email", () => {
        expect(button.prop("value")).toBe("Send Email");
      });
      it("has success and textColor white", () => {
        expect(button.prop("success")).toBe(true);
        expect(button.prop("textColor")).toBe(white);
      });
      it("calls provided onSubmit onPress", () => {
        button.props().onPress();
        expect(onSubmit).toHaveBeenCalled();
      });
    });
  });
  describe("Submitting", () => {
    describe("when loading", () => {
      it("replaces the button with an ActivityIndicator", () => {
        const forgotPassword = shallow(<ForgotPassword loading={true} />);
        const activityIndicator = forgotPassword.findWhere(
          n => n.prop("animating") === true
        );
        expect(activityIndicator.length).toBe(1);
      });
    });
  });
});
