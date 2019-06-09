import React from "react";
import Login from ".";
import { shallow } from "enzyme";
import styles from "./styles";
import { white, primary, INVALID_LOGIN, NETWORK_ERROR } from "../../constants";
import renderer from "react-test-renderer";
import { AlertIOS } from "react-native";

describe("Login screen", () => {
  it("matches snapshot", () => {
    const login = renderer.create(<Login />);
    const tree = login.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("returns a GradientView", () => {
    const login = shallow(<Login />);
    const gradient = login.find("GradientView");
    expect(gradient).toHaveLength(1);
  });
  it("returns a KeyboardAvoidingView with container styles", () => {
    const login = shallow(<Login />);
    const keyboardView = login.find("KeyboardAvoidingView");
    expect(keyboardView).toHaveLength(1);
    expect(keyboardView.prop("style")).toEqual(styles.container);
  });
  it("returns a View with form styles", () => {
    const login = shallow(<Login />);
    const form = login.findWhere(n => n.prop("style") === styles.form);
    expect(form).toHaveLength(1);
    expect(form.prop("style")).toEqual(styles.form);
  });
  describe("form", () => {
    describe("username input", () => {
      const username = "username";
      const setUsername = jest.fn();
      const login = shallow(
        <Login username={username} setUsername={setUsername} />
      );
      const usernameInput = login.findWhere(
        n => n.prop("label") === "Username"
      );
      it("has label Username", () => {
        expect(usernameInput.prop("label")).toBe("Username");
      });
      it("has style input", () => {
        expect(usernameInput.prop("style")).toBe(styles.input);
      });
      it("has value equal to username prop of form", () => {
        expect(usernameInput.prop("value")).toBe(username);
      });
      it("calls forms provided setUsername with new value onChange", () => {
        usernameInput.props().onChange("newValue");
        expect(setUsername).toHaveBeenCalledWith("newValue");
      });
    });
    describe("password input", () => {
      const password = "password";
      const setPassword = jest.fn();
      const login = shallow(
        <Login password={password} setPassword={setPassword} />
      );
      const passwordInput = login.findWhere(
        n => n.prop("label") === "Password"
      );
      it("has label Password", () => {
        expect(passwordInput.prop("label")).toBe("Password");
      });
      it("has password prop equal true", () => {
        expect(passwordInput.prop("password")).toBe(true);
      });
      it("has style input", () => {
        expect(passwordInput.prop("style")).toBe(styles.input);
      });
      it("has value equal to password prop on Login", () => {
        expect(passwordInput.prop("value")).toBe(password);
      });
      it("calls form provided onChange with 2 and new value onChange", () => {
        passwordInput.props().onChange("newPassword");
        expect(setPassword).toHaveBeenCalledWith("newPassword");
      });
    });
    describe("login button", () => {
      const onSubmit = jest.fn();
      const onChange = jest.fn();
      const login = shallow(<Login submit={onSubmit} />);
      const button = login.findWhere(n => n.prop("value") === "Login");
      it("has value Login", () => {
        expect(button.prop("value")).toBe("Login");
      });
      it("has success true", () => {
        expect(button.prop("success")).toBe(true);
      });
      it("has textColor white", () => {
        expect(button.prop("textColor")).toBe(white);
      });
      it("calls form provided onSubmit onPress", () => {
        button.props().onPress();
        expect(onSubmit).toHaveBeenCalled();
      });
      describe("when loading value is true", () => {
        it("is replaced with an ActivityIndicator", () => {
          const login = shallow(<Login loading={true} />);
          const form = login.findWhere(n => n.prop("style") === styles.form);
          const activityIndicator = form.prop("children")[4];
          expect(activityIndicator.type.render.name).toBe("ActivityIndicator");
        });
        it("matches snapshot", () => {
          const login = shallow(<Login loading={true} />);
          const form = login.findWhere(n => n.prop("style") === styles.form);
          expect(form.props("children")[3]).toMatchSnapshot();
        });
      });
    });
    describe("forgot password button", () => {
      const forgotPasswordFunc = jest.fn();
      const login = shallow(<Login forgotPassword={forgotPasswordFunc} />);
      const forgotPassword = login.findWhere(
        n => n.prop("value") === "Forgot password"
      );
      it("has value Forgot password", () => {
        expect(forgotPassword.prop("value")).toBe("Forgot password");
      });
      it("has forgotPassword style", () => {
        expect(forgotPassword.prop("style")).toBe(styles.forgotPassword);
      });
      it("has textColor primary", () => {
        expect(forgotPassword.prop("textColor")).toBe(primary);
      });
      it("calls forgotPassword prop onPress", () => {
        forgotPassword.props().onPress();
        expect(forgotPasswordFunc).toHaveBeenCalled();
      });
    });
    describe("when isError is true", () => {
      it("matches snapshot", () => {
        const login = renderer.create(<Login isError={true} />);
        const tree = login.toJSON();
        expect(tree).toMatchSnapshot();
      });
      it("displays the INVALID_LOGIN error", () => {
        const login = shallow(<Login isError={true} />);
        const error = login.find("Text");
        expect(error.prop("danger")).toBe(true);
        expect(error.prop("value")).toBe(INVALID_LOGIN);
      });
    });
    describe("when loginError is truthy", () => {
      it("displays an AlertIOS with loginError message", () => {
        const loginError = NETWORK_ERROR;
        const onSubmit = jest.fn();
        const spy = jest.spyOn(AlertIOS, "alert");
        shallow(<Login loginError={loginError} submit={onSubmit} />);
        expect(spy).toHaveBeenCalledWith("Error!", NETWORK_ERROR);
      });
    });
  });
});
