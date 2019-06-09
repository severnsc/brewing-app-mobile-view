import React from "react";
import ForgotPassword, { ForgotPasswordContainer } from ".";
import { shallow } from "enzyme";
import { graphql } from "react-apollo";
import { FORGOT_PASSWORD } from "../../graphql";
import { FORGOT_PASSWORD_CONFIRM } from "../../constants";

describe("Forgot Password container", () => {
  it("returns a ForgotPassword screen", () => {
    const container = shallow(<ForgotPassword />);
    const screen = container.dive().find("ForgotPassword");
    expect(screen).toHaveLength(1);
  });
  it("calls graphql with FORGOT_PASSWORD", () => {
    shallow(<ForgotPassword />);
    expect(graphql).toHaveBeenCalledWith(FORGOT_PASSWORD);
  });
  describe("submitting", () => {
    describe("when email is invalid", () => {
      it("sets the isError prop on ForgotPassword screen to true", () => {
        const mutate = jest.fn(() => Promise.resolve());
        const container = shallow(<ForgotPasswordContainer mutate={mutate} />);
        let screen = container.find("ForgotPassword");
        const email = "email";
        screen.props().onSubmit(email);
        container.update();
        screen = container.find("ForgotPassword");
        expect(screen.prop("isError")).toBe(true);
      });
      it("does not call mutate", () => {
        const mutate = jest.fn(() => Promise.resolve());
        const container = shallow(<ForgotPasswordContainer mutate={mutate} />);
        let screen = container.find("ForgotPassword");
        const email = "email";
        screen.props().onSubmit(email);
        container.update();
        screen = container.find("ForgotPassword");
        expect(mutate).not.toHaveBeenCalled();
      });
    });
    it("calls mutate prop with email from ForgotPassword onSubmit as variable", () => {
      const mutate = jest.fn(() => Promise.resolve());
      const container = shallow(<ForgotPassword mutate={mutate} />);
      const screen = container.dive().find("ForgotPassword");
      const email = "email@example.com";
      screen.props().onSubmit(email);
      expect(mutate).toHaveBeenCalledWith({
        variables: {
          email
        }
      });
    });
    describe("when mutate resolves", () => {
      it("calls navigation.navigate with FORGOT_PASSWORD_CONFIRM", () => {
        const navigation = {
          navigate: jest.fn()
        };
        const mutate = jest.fn(() => Promise.resolve());
        const container = shallow(
          <ForgotPassword mutate={mutate} navigation={navigation} />
        );
        const screen = container.dive().find("ForgotPassword");
        const email = "email@example.com";
        screen.props().onSubmit(email);
        return Promise.resolve().then(() => {
          expect(navigation.navigate).toHaveBeenCalledWith(
            FORGOT_PASSWORD_CONFIRM
          );
        });
      });
    });
  });
});
