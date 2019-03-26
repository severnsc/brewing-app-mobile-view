import React from "react";
import ForgotPassword from ".";
import { shallow } from "enzyme";
import styles from "../styles";
import { AlertIOS } from "react-native";
import { NETWORK_ERROR, INVALID_EMAIL } from "../../constants";

describe("Forgot Password screen", () => {
  const onSubmit = jest.fn();
  const forgotPassword = shallow(<ForgotPassword onSubmit={onSubmit} />);
  it("returns a GradientView", () => {
    const gradient = forgotPassword.find("GradientView");
    expect(gradient).toHaveLength(1);
  });
  it("returns a KeyboardAvoidingView with container style", () => {
    const keyboardAvoid = forgotPassword.find("KeyboardAvoidingView");
    expect(keyboardAvoid).toHaveLength(1);
    expect(keyboardAvoid.prop("style")).toEqual(styles.container);
  });
  it("returns a Form with form styles", () => {
    const form = forgotPassword.find("Form");
    expect(form).toHaveLength(1);
    expect(form.prop("style")).toEqual(styles.form);
  });
  it("sets form initialValues to [{id: '1', value:''}, {id: '2', value: false}]", () => {
    const form = forgotPassword.find("Form");
    const initial = [{ id: "1", value: "" }, { id: "2", value: false }];
    expect(form.prop("initialValues")).toEqual(initial);
  });
  it("sets form onSubmit to onSubmit prop", () => {
    const form = forgotPassword.find("Form");
    expect(form.prop("onSubmit")).toEqual(onSubmit);
  });
  describe("isError prop", () => {
    it("renders an INVALID_EMAIL error when true", () => {
      const onChange = jest.fn();
      const onSubmit = jest.fn();
      const forgotPassword = shallow(
        <ForgotPassword onSubmit={onSubmit} isError={true} />
      );
      const form = forgotPassword.find("Form");
      const formChildren = form
        .props()
        .children(
          [{ id: "1", value: "" }, { id: "2", value: false }],
          onChange,
          onSubmit
        );
      const text = formChildren.props.children[0];
      expect(text.props.value).toBe(INVALID_EMAIL);
      expect(text.props.danger).toBe(true);
    });
  });
  describe("Form children", () => {
    describe("TextInput", () => {
      it("returns a TextInput with label Email", () => {
        const onChange = jest.fn();
        const onSubmit = jest.fn();
        const emailInput = forgotPassword
          .find("Form")
          .props()
          .children(
            [{ id: "1", value: "" }, { id: "2", value: false }],
            onChange,
            onSubmit
          ).props.children[1];
        expect(emailInput.type.name).toBe("TextInput");
        expect(emailInput.props.label).toBe("Email");
      });
      it("sets TextInput value equal to first value in values array", () => {
        const onChange = jest.fn();
        const onSubmit = jest.fn();
        const textInput = forgotPassword
          .find("Form")
          .props()
          .children(
            [{ id: "1", value: "new value" }, { id: "2", value: false }],
            onChange,
            onSubmit
          ).props.children[1];
        expect(textInput.props.value).toBe("new value");
      });
      it("calls provided onChange function with 1 and new value onChange", () => {
        const onChange = jest.fn();
        const onSubmit = jest.fn();
        const textInput = forgotPassword
          .find("Form")
          .props()
          .children(
            [{ id: "1", value: "new value" }, { id: "2", value: false }],
            onChange,
            onSubmit
          ).props.children[1];
        textInput.props.onChange("new value");
        expect(onChange).toHaveBeenCalledWith("1", "new value");
      });
    });
    describe("Button", () => {
      it("returns a Button with value Send Email", () => {
        const onChange = jest.fn();
        const onSubmit = jest.fn();
        const button = forgotPassword
          .find("Form")
          .props()
          .children(
            [{ id: "1", value: "" }, { id: "2", value: false }],
            onChange,
            onSubmit
          ).props.children[2];
        expect(button.type.name).toBe("Button");
        expect(button.props.value).toBe("Send Email");
      });
      it("calls provided onSubmit onPress", () => {
        const onChange = jest.fn();
        const onSubmit = jest.fn(() => Promise.resolve());
        const button = forgotPassword
          .find("Form")
          .props()
          .children(
            [{ id: "1", value: "" }, { id: "2", value: false }],
            onChange,
            onSubmit
          ).props.children[2];
        button.props.onPress({ id: "2", value: "email@example.com" });
        expect(onSubmit).toHaveBeenCalled();
      });
    });
  });
  describe("Submitting", () => {
    describe("when loading", () => {
      it("replaces the button with an ActivityIndicator", () => {
        const onChange = jest.fn();
        const onSubmit = jest.fn();
        const activityIndicator = forgotPassword
          .find("Form")
          .props()
          .children(
            [{ id: "1", value: "" }, { id: "2", value: true }],
            onChange,
            onSubmit
          ).props.children[2];
        expect(activityIndicator.type.render.name).toBe("ActivityIndicator");
      });
    });
    describe("onSubmit process", () => {
      it("calls onChange with 2 and true", () => {
        const onChange = jest.fn();
        const onSubmit = jest.fn(() => Promise.resolve());
        const button = forgotPassword
          .find("Form")
          .props()
          .children(
            [{ id: "1", value: "" }, { id: "2", value: false }],
            onChange,
            onSubmit
          ).props.children[2];
        const email = "email@example.com";
        button.props.onPress({ id: "2", value: email });
        expect(onChange).toHaveBeenCalledWith("2", true);
      });
      it("calls onSubmit with the provided email", () => {
        const onChange = jest.fn();
        const onSubmit = jest.fn(() => Promise.resolve());
        const button = forgotPassword
          .find("Form")
          .props()
          .children(
            [{ id: "1", value: "" }, { id: "2", value: false }],
            onChange,
            onSubmit
          ).props.children[2];
        const email = "email@example.com";
        button.props.onPress({ id: "2", value: email });
        expect(onSubmit).toHaveBeenCalledWith(email);
      });
      describe("when onSubmit rejects", () => {
        it("calls onChange with 2 and false", () => {
          const onChange = jest.fn();
          const onSubmit = jest.fn(() => Promise.reject());
          const button = forgotPassword
            .find("Form")
            .props()
            .children(
              [{ id: "1", value: "" }, { id: "2", value: false }],
              onChange,
              onSubmit
            ).props.children[2];
          const email = "email@example.com";
          button.props.onPress({ id: "2", value: email });
          return Promise.resolve()
            .then()
            .then(() => {
              expect(onChange).toHaveBeenCalledWith("2", false);
            });
        });
        it("calls AlertIOS with a NETWORK_ERROR", () => {
          const onChange = jest.fn();
          const onSubmit = jest.fn(() => Promise.reject());
          const button = forgotPassword
            .find("Form")
            .props()
            .children(
              [{ id: "1", value: "" }, { id: "2", value: false }],
              onChange,
              onSubmit
            ).props.children[2];
          const email = "email@example.com";
          const spy = jest.spyOn(AlertIOS, "alert");
          button.props.onPress({ id: "2", value: email });
          return Promise.resolve()
            .then()
            .then(() => {
              expect(spy).toHaveBeenCalledWith("Error!", NETWORK_ERROR);
            });
        });
      });
      describe("when onSubmit resolves", () => {
        it("calls onChange with 2 and false", () => {
          const onChange = jest.fn();
          const onSubmit = jest.fn(() => Promise.resolve());
          const button = forgotPassword
            .find("Form")
            .props()
            .children(
              [{ id: "1", value: "" }, { id: "2", value: false }],
              onChange,
              onSubmit
            ).props.children[2];
          const email = "email@example.com";
          button.props.onPress({ id: "2", value: email });
          return Promise.resolve().then(() => {
            expect(onChange).toHaveBeenCalledWith("2", false);
          });
        });
      });
    });
  });
});
