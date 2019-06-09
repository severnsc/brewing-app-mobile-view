import React from "react";
import Login, { LoginContainer } from ".";
import { shallow } from "enzyme";
import { graphql, compose } from "react-apollo";
import { LOGIN_USER } from "../../graphql";
import {
  DASHBOARD,
  FORGOT_PASSWORD,
  INVALID_CREDENTIALS_GRAPHQL_ERROR,
  NETWORK_ERROR
} from "../../constants";

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
  it("passes the username state down to the screen", () => {
    const loginContainer = shallow(<LoginContainer />);
    const loginScreen = loginContainer.find("Login");
    expect(loginScreen.prop("username")).toBe(loginContainer.state("username"));
  });
  it("passes setUsername down to the screen", () => {
    const loginContainer = shallow(<LoginContainer />);
    const loginScreen = loginContainer.find("Login");
    expect(loginScreen.prop("setUsername")).toBe(
      loginContainer.instance().setUsername
    );
  });
  it("passes the password state down to the screen", () => {
    const loginContainer = shallow(<LoginContainer />);
    const loginScreen = loginContainer.find("Login");
    expect(loginScreen.prop("password")).toBe(loginContainer.state("password"));
  });
  it("passes the setPassword down to the screen", () => {
    const loginContainer = shallow(<LoginContainer />);
    const loginScreen = loginContainer.find("Login");
    expect(loginScreen.prop("setPassword")).toBe(
      loginContainer.instance().setPassword
    );
  });
  it("passess login to the screen via submit prop", () => {
    const loginContainer = shallow(<LoginContainer />);
    const loginScreen = loginContainer.find("Login");
    expect(loginScreen.prop("submit")).toBe(loginContainer.instance().login);
  });
  it("passes the loginError state down to the screen", () => {
    const loginContainer = shallow(<LoginContainer />);
    const loginScreen = loginContainer.find("Login");
    expect(loginScreen.prop("loginError")).toBe(
      loginContainer.state("loginError")
    );
  });
  it("passes the loading state down to the screen", () => {
    const loginContainer = shallow(<LoginContainer />);
    const loginScreen = loginContainer.find("Login");
    expect(loginScreen.prop("loading")).toBe(loginContainer.state("loading"));
  });
  it("calls mutate prop with correct arguments on login", () => {
    const mutate = jest.fn(() => Promise.resolve({ error: null }));
    const loginContainer = shallow(<LoginContainer mutate={mutate} />);
    const username = "username";
    const password = "password";
    loginContainer.setState({ username, password });
    const loginScreen = loginContainer.find("Login");
    loginScreen.props().submit();
    expect(mutate).toHaveBeenCalledWith({
      errorPolicy: "all",
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
  describe("when mutate rejects", () => {
    it("sets loginError state to NETWORK_ERROR", () => {
      const mutate = jest.fn(() => Promise.reject());
      const loginContainer = shallow(<LoginContainer mutate={mutate} />);
      loginContainer
        .instance()
        .login()
        .then(() => {
          expect(loginContainer.state("loginError")).toBe(NETWORK_ERROR);
        });
    });
  });
  describe("when mutate returns with errors", () => {
    it("calls setState with isError: true", () => {
      const mutate = jest.fn(() =>
        Promise.resolve({
          errors: [{ message: INVALID_CREDENTIALS_GRAPHQL_ERROR }]
        })
      );
      const loginContainer = shallow(<LoginContainer mutate={mutate} />);
      const setState = jest.fn();
      loginContainer.instance().setState = setState;
      const username = "username";
      const password = "password";
      const loginScreen = loginContainer.find("Login");
      loginScreen.props().submit({ value: username }, { value: password });
      return Promise.resolve().then(() => {
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
        .submit({ value: "username" }, { value: "password" });
      return Promise.resolve().then(() => {
        expect(navigate).toHaveBeenCalledWith(DASHBOARD);
      });
    });
  });
});
