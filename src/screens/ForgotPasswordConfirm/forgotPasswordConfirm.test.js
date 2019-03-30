import React from "react";
import ForgotPasswordConfirm, { message } from ".";
import { shallow } from "enzyme";
import { HOME, white } from "../../constants";
import styles from "./styles";

describe("Forgot Password Confirm screen", () => {
  it("renders a gradient view", () => {
    const screen = shallow(<ForgotPasswordConfirm />);
    const gradient = screen.find("GradientView");
    expect(gradient).toHaveLength(1);
  });
  it("renders a View with container style", () => {
    const screen = shallow(<ForgotPasswordConfirm />);
    const view = screen.findWhere(n => n.prop("style") === styles.container);
    expect(view.prop("style")).toEqual(styles.container);
  });
  it("renders a extra large white envelope icon", () => {
    const screen = shallow(<ForgotPasswordConfirm />);
    const icon = screen.find("Icon");
    expect(icon.prop("name")).toBe("envelope-o");
    expect(icon.prop("size")).toBe("xl");
    expect(icon.prop("color")).toBe(white);
  });
  it("renders styled text with message as value", () => {
    const screen = shallow(<ForgotPasswordConfirm />);
    const text = screen.find("Text");
    expect(text.prop("value")).toBe(message);
    expect(text.prop("color")).toBe(white);
    expect(text.prop("style")).toEqual(styles.text);
  });
  it("renders a button with text Return Home, fontSize 24 and secondary", () => {
    const screen = shallow(<ForgotPasswordConfirm />);
    const button = screen.find("Button");
    expect(button.prop("value")).toBe("Return Home");
    expect(button.prop("fontSize")).toBe(24);
    expect(button.prop("secondary")).toBe(true);
  });
  it("calls the navigation.navigate prop with HOME onPress", () => {
    const navigation = {
      navigate: jest.fn()
    };
    const screen = shallow(<ForgotPasswordConfirm navigation={navigation} />);
    const button = screen.find("Button");
    button.props().onPress();
    expect(navigation.navigate).toHaveBeenCalledWith(HOME);
  });
});
