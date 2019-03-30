import React from "react";
import CreateAccount from ".";
import { shallow } from "enzyme";
import { graphql, compose } from "react-apollo";
import { GET_USER, CREATE_USER } from "../../graphql";
import { NETWORK_ERROR, DASHBOARD } from "../../constants";
import { validateUsername } from "../../modules/validation";
jest.mock("../../modules/validation");

describe("CreateAccount container", () => {
  it("calls compose with graphql wrapped CREATE_USER mutation", () => {
    shallow(<CreateAccount mutate={jest.fn()} />);
    expect(compose).toHaveBeenCalledWith(graphql(CREATE_USER));
  });
  it("returns a CreateAccount screen", () => {
    const createAccountContainer = shallow(
      <CreateAccount mutate={jest.fn()} />
    );
    const createAccountScreen = createAccountContainer
      .dive()
      .find("CreateAccount");
    expect(createAccountScreen).toHaveLength(1);
  });
  it("sets create account screen onUsernameChange equal to validateUsername", () => {
    const createAccountContainer = shallow(
      <CreateAccount mutate={jest.fn()} />
    );
    const createAccountScreen = createAccountContainer
      .dive()
      .find("CreateAccount");
    expect(createAccountScreen.prop("onUsernameChange")).toBe(validateUsername);
  });
  it("calls mutate prop on createAccount with correct arguments", () => {
    const mutate = jest.fn(() => Promise.resolve());
    const createAccountContainer = shallow(<CreateAccount mutate={mutate} />);
    const username = "username";
    const email = "email";
    const password = { id: "1", value: "password" };
    const confirmPassword = { id: "2", value: "password" };
    const createAccountScreen = createAccountContainer
      .dive()
      .find("CreateAccount");
    createAccountScreen
      .props()
      .createAccount({ username }, { email }, password, confirmPassword);
    expect(mutate).toHaveBeenCalledWith({
      variables: {
        user: {
          username,
          email,
          password: password.value,
          confirmPassword: confirmPassword.value
        }
      }
    });
  });
  describe("when mutate returns a user with errors other than a createUser error", () => {
    it("returns the user", () => {
      const username = "username";
      const email = "email";
      const password = { id: "1", value: "password" };
      const confirmPassword = { id: "2", value: "password" };
      const user = {
        username,
        email,
        errors: [
          {
            __typename: "Error",
            message: NETWORK_ERROR,
            location: {
              __typename: "Location",
              node: "user",
              field: "username"
            }
          }
        ]
      };
      const mutate = jest.fn(() =>
        Promise.resolve({ data: { createUser: user } })
      );
      const createAccountContainer = shallow(<CreateAccount mutate={mutate} />);
      const createAccountScreen = createAccountContainer
        .dive()
        .find("CreateAccount");
      return createAccountScreen
        .prop("createAccount")(false, false, password, confirmPassword)
        .then(newUser => {
          expect(newUser).toEqual(user);
        });
    });
  });
  describe("when mutate returns a user with NETWORK_ERROR and field: createUser", () => {
    it("returns a rejected promise from createAccount", () => {
      const username = "username";
      const email = "email";
      const password = { id: "1", value: "password" };
      const confirmPassword = { id: "2", value: "password" };
      const user = {
        username,
        email,
        errors: [
          {
            __typename: "Error",
            message: NETWORK_ERROR,
            location: {
              __typename: "Location",
              node: "user",
              field: "createAccount"
            }
          }
        ]
      };
      const mutate = jest.fn(() =>
        Promise.resolve({ data: { createUser: user } })
      );
      const createAccountContainer = shallow(<CreateAccount mutate={mutate} />);
      const createAccountScreen = createAccountContainer
        .dive()
        .find("CreateAccount");
      return Promise.resolve()
        .then()
        .then(() => {
          expect(
            createAccountScreen.prop("createAccount")(
              false,
              false,
              password,
              confirmPassword
            )
          ).rejects.toMatch("");
        });
    });
  });
  describe("when mutate returns a proper user", () => {
    it("calls navigation.navigate prop with DASHBOARD", () => {
      const username = "username";
      const email = "email";
      const password = { id: "1", value: "password" };
      const confirmPassword = { id: "2", value: "password" };
      const user = {
        username,
        email,
        errors: []
      };
      const mutate = jest.fn(() =>
        Promise.resolve({ data: { createUser: user } })
      );
      const navigation = {
        navigate: jest.fn()
      };
      const createAccountContainer = shallow(
        <CreateAccount mutate={mutate} navigation={navigation} />
      );
      const createAccountScreen = createAccountContainer
        .dive()
        .find("CreateAccount");
      return createAccountScreen
        .prop("createAccount")(false, false, password, confirmPassword)
        .then(() => {
          expect(navigation.navigate).toHaveBeenCalledWith(DASHBOARD);
        });
    });
  });
});
