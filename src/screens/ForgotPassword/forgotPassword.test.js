import React from "react";
import ForgotPassword from ".";
import { shallow } from "enzyme";
import styles from "../styles";
import { AlertIOS } from "react-native";
import { NETWORK_ERROR, INVALID_EMAIL, white } from "../../constants";
import renderer from "react-test-renderer";

describe("Forgot Password screen", () => {
  const onSubmit = jest.fn();
  const forgotPassword = shallow(<ForgotPassword onSubmit={onSubmit} />);
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
    it("renders an INVALID_EMAIL error on TextInput when true", () => {
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
      const textInput = formChildren.props.children[0];
      expect(textInput.props.errorText).toBe(INVALID_EMAIL);
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
          ).props.children[0];
        expect(emailInput.type.name).toBe("TextInput");
        expect(emailInput.props.label).toBe("Email");
      });
      it("has input styles", () => {
        const onChange = jest.fn();
        const onSubmit = jest.fn();
        const emailInput = forgotPassword
          .find("Form")
          .props()
          .children(
            [{ id: "1", value: "" }, { id: "2", value: false }],
            onChange,
            onSubmit
          ).props.children[0];
        expect(emailInput.props.style).toEqual(styles.input);
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
          ).props.children[0];
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
          ).props.children[0];
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
          ).props.children[1];
        expect(button.type.name).toBe("Button");
        expect(button.props.value).toBe("Send Email");
      });
      it("has success and textColor white", () => {
        const onChange = jest.fn();
        const onSubmit = jest.fn();
        const button = forgotPassword
          .find("Form")
          .props()
          .children(
            [{ id: "1", value: "" }, { id: "2", value: false }],
            onChange,
            onSubmit
          ).props.children[1];
        expect(button.props.success).toBe(true);
        expect(button.props.textColor).toBe(white);
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
          ).props.children[1];
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
          ).props.children[1];
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
          ).props.children[1];
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
          ).props.children[1];
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
            ).props.children[1];
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
            ).props.children[1];
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
            ).props.children[1];
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
