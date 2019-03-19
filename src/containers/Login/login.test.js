import React from "react";
import Login, { LoginContainer } from ".";
import { shallow } from "enzyme";
import { graphql, compose } from "react-apollo";
import { LOGIN_USER } from "../../graphql";
import { DASHBOARD, FORGOT_PASSWORD } from "../../constants";

describe("Login Container", () => {
  it("calls compose with graphql wrapped LOGIN_USER mutation", () => {
    shallow(<Login />);
    expect(graphql).toHaveBeenCalledWith(LOGIN_USER);
    expect(compose).toHaveBeenCalledWith(graphql(LOGIN_USER));
  });
  it("returns a Login screen", () => {
    const loginContainer = shallow(<Login />);
    const loginScreen = loginContainer.dive().find("Login");
    expect(loginScreen).toHaveLength(1);
  });
  it("calls mutate prop with correct arguments on login", () => {
    const mutate = jest.fn(() => Promise.resolve({ error: null }));
    const loginContainer = shallow(<Login mutate={mutate} />);
    const username = "username";
    const password = "password";
    const loginScreen = loginContainer.dive().find("Login");
    loginScreen
      .props()
      .login({ id: "1", value: username }, { id: "2", value: password });
    expect(mutate).toHaveBeenCalledWith({
      variables: {
        user: {
          username,
          password
        }
      }
    });
  });
  it("passess a function that calls navigate with FORGOT_PASSWORD to forgotPassword prop", () => {
    const navigate = jest.fn();
    const navigation = { navigate };
    const mutate = jest.fn();
    const loginContainer = shallow(
      <LoginContainer mutate={mutate} navigation={navigation} />
    );
    loginContainer.props().forgotPassword();
    expect(navigate).toHaveBeenCalledWith(FORGOT_PASSWORD);
  });
  describe("when mutate returns with error", () => {
    it("calls setState with isError: true", () => {
      const mutate = jest.fn(() => Promise.resolve({ error: true }));
      const loginContainer = shallow(<LoginContainer mutate={mutate} />);
      const setState = jest.fn();
      loginContainer.instance().setState = setState;
      const username = "username";
      const password = "password";
      const loginScreen = loginContainer.find("Login");
      loginScreen.props().login({ value: username }, { value: password });
      return Promise.resolve().then(() => {
        expect(setState).toHaveBeenCalledWith({ isError: true });
      });
    });
  });
  describe("when mutate throws", () => {
    it("calls setState with isError true", () => {
      const mutate = jest.fn(() => Promise.reject({ message: "Error!" }));
      const loginContainer = shallow(<LoginContainer mutate={mutate} />);
      const setState = jest.fn();
      loginContainer.instance().setState = setState;
      const username = "username";
      const password = "password";
      const loginScreen = loginContainer.find("Login");
      loginScreen.props().login({ value: username }, { value: password });
      return Promise.resolve()
        .then()
        .then(() => {
          expect(setState).toHaveBeenCalledWith({ isError: true });
        });
    });
  });
  describe("when isError is true", () => {
    it("sets Login isError prop to true", () => {
      const mutate = jest.fn(() => Promise.resolve({ error: true }));
      const loginContainer = shallow(<LoginContainer mutate={mutate} />);
      loginContainer.setState({ isError: true });
      const loginScreen = loginContainer.find("Login");
      expect(loginScreen.prop("isError")).toBe(true);
    });
  });
  describe("when mutate returns a user without errors", () => {
    it("calls navigate prop with DASHBOARD", () => {
      const navigate = jest.fn();
      const mutate = jest.fn(() => Promise.resolve({ error: null }));
      const loginContainer = shallow(
        <LoginContainer navigation={{ navigate }} mutate={mutate} />
      );
      loginContainer
        .props()
        .login({ value: "username" }, { value: "password" });
      return Promise.resolve().then(() => {
        expect(navigate).toHaveBeenCalledWith(DASHBOARD);
      });
    });
  });
});
