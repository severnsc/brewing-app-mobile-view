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
  it("returns a form with form styles", () => {
    const login = shallow(<Login />);
    const form = login.find("Form");
    expect(form).toHaveLength(1);
    expect(form.prop("style")).toEqual(styles.form);
  });
  describe("form", () => {
    it("has onSubmit prop equal to login prop", () => {
      const login = jest.fn();
      const loginScreen = shallow(<Login login={login} />);
      let form = loginScreen.find("Form");
      expect(form.prop("onSubmit")).toBe(login);
    });
    it("has initialValues prop with two objects with empty strings", () => {
      const login = shallow(<Login />);
      const form = login.find("Form");
      const initialValues = [{ id: "1", value: "" }, { id: "2", value: "" }];
      expect(form.prop("initialValues")).toEqual(initialValues);
    });
    describe("username input", () => {
      const login = shallow(<Login />);
      let form = login.find("Form");
      const username = "username";
      const onChange = jest.fn();
      const onSubmit = jest.fn();
      form = form
        .props()
        .children([{ id: "1", value: username }], onChange, onSubmit);
      const usernameInput = form.props.children[1];
      it("has label Username", () => {
        expect(usernameInput.props.label).toBe("Username");
      });
      it("has style input", () => {
        expect(usernameInput.props.style).toBe(styles.input);
      });
      it("has value equal to value prop of first item on values array", () => {
        expect(usernameInput.props.value).toBe(username);
      });
      it("calls forms provided onChange with 1 and new value onChange", () => {
        usernameInput.props.onChange("newValue");
        expect(onChange).toHaveBeenCalledWith("1", "newValue");
      });
    });
    describe("password input", () => {
      const login = shallow(<Login />);
      let form = login.find("Form");
      const username = "username";
      const password = "password";
      const onChange = jest.fn();
      const onSubmit = jest.fn();
      form = form
        .props()
        .children(
          [{ id: "1", value: username }, { id: "2", value: password }],
          onChange,
          onSubmit
        );
      const passwordInput = form.props.children[2];
      it("has label Password", () => {
        expect(passwordInput.props.label).toBe("Password");
      });
      it("has password prop equal true", () => {
        expect(passwordInput.props.password).toBe(true);
      });
      it("has style input", () => {
        expect(passwordInput.props.style).toBe(styles.input);
      });
      it("has value equal to value prop of the second item returned in the values array", () => {
        expect(passwordInput.props.value).toBe(password);
      });
      it("calls form provided onChange with 2 and new value onChange", () => {
        passwordInput.props.onChange("newPassword");
        expect(onChange).toHaveBeenCalledWith("2", "newPassword");
      });
    });
    describe("login button", () => {
      const login = shallow(<Login />);
      let form = login.find("Form");
      const username = "username";
      const onChange = jest.fn();
      const onSubmit = jest.fn(() => Promise.resolve());
      form = form
        .props()
        .children([{ id: "1", value: username }], onChange, onSubmit);
      const button = form.props.children[3];
      it("has value Login", () => {
        expect(button.props.value).toBe("Login");
      });
      it("has success true", () => {
        expect(button.props.success).toBe(true);
      });
      it("has textColor white", () => {
        expect(button.props.textColor).toBe(white);
      });
      it("calls form provided onSubmit onPress", () => {
        button.props.onPress();
        expect(onSubmit).toHaveBeenCalled();
      });
    });
    describe("forgot password button", () => {
      const forgotPasswordFunc = jest.fn();
      const login = shallow(<Login forgotPassword={forgotPasswordFunc} />);
      let form = login.find("Form");
      const username = "username";
      form = form.props().children([{ id: "1", value: username }]);
      const forgotPassword = form.props.children[4];
      it("has value Forgot password", () => {
        expect(forgotPassword.props.value).toBe("Forgot password");
      });
      it("has forgotPassword style", () => {
        expect(forgotPassword.props.style).toBe(styles.forgotPassword);
      });
      it("has textColor primary", () => {
        expect(forgotPassword.props.textColor).toBe(primary);
      });
      it("calls forgotPassword prop onPress", () => {
        forgotPassword.props.onPress();
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
        let form = login.find("Form");
        const username = "username";
        form = form.props().children([{ id: "1", value: username }]);
        const error = form.props.children[0];
        expect(error.type.name).toBe("Text");
        expect(error.props.danger).toBe(true);
        expect(error.props.value).toBe(INVALID_LOGIN);
      });
    });
    describe("submitting", () => {
      it("calls the login prop onSubmit", () => {
        const login = jest.fn();
        const loginScreen = shallow(<Login login={login} />);
        const form = loginScreen.find("Form");
        form.simulate("submit");
        expect(login).toHaveBeenCalled();
      });
      describe("when onSubmit rejects", () => {
        it("displays an AlertIOS with NETWORK_ERROR message", () => {
          const login = jest.fn(() => Promise.reject());
          const onChange = jest.fn();
          const loginScreen = shallow(<Login login={login} />);
          let form = loginScreen.find("Form");
          form = form
            .props()
            .children(
              [{ id: "1", value: "" }, { id: "2", value: "" }],
              onChange,
              login
            );
          const button = form.props.children[3];
          button.props.onPress();
          const spy = jest.spyOn(AlertIOS, "alert");
          return Promise.resolve()
            .then()
            .then(() => {
              expect(spy).toHaveBeenCalledWith("Error!", NETWORK_ERROR);
            });
        });
      });
    });
  });
});
