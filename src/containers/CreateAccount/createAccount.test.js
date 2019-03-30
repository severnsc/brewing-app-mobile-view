import React from "react";
import CreateAccount from ".";
import { shallow } from "enzyme";
import { graphql, compose } from "react-apollo";
import { CREATE_USER } from "../../graphql";
import { NETWORK_ERROR, DASHBOARD } from "../../constants";
import {
  validateUsername,
  validateEmail,
  isEmailUnique
} from "../../modules/validation";
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
  describe("onEmailChange", () => {
    it("calls validateEmail with the email", () => {
      const createAccountContainer = shallow(
        <CreateAccount mutate={jest.fn()} />
      );
      const createAccountScreen = createAccountContainer
        .dive()
        .find("CreateAccount");
      const email = "email@example.com";
      createAccountScreen.props().onEmailChange(email);
      expect(validateEmail).toHaveBeenCalledWith(email);
    });
    describe("when validateEmail returns false", () => {
      it("returns an object with shape {valid: false, unique: true}", () => {
        validateEmail.mockImplementationOnce(() => false);
        const createAccountContainer = shallow(
          <CreateAccount mutate={jest.fn()} />
        );
        const createAccountScreen = createAccountContainer
          .dive()
          .find("CreateAccount");
        const email = "email@example.com";
        const result = createAccountScreen.props().onEmailChange(email);
        const shape = { valid: false, unique: true };
        expect(result).toEqual(shape);
      });
    });
    describe("when validateEmail returns true", () => {
      it("calls isEmailUnique with the email", () => {
        validateEmail.mockImplementationOnce(() => true);
        const createAccountContainer = shallow(
          <CreateAccount mutate={jest.fn()} />
        );
        const createAccountScreen = createAccountContainer
          .dive()
          .find("CreateAccount");
        const email = "email@example.com";
        createAccountScreen.props().onEmailChange(email);
        expect(isEmailUnique).toHaveBeenCalledWith(email);
      });
      describe("when isEmailUnique rejects", () => {
        it("returns a rejected promise", () => {
          isEmailUnique.mockImplementationOnce(() => Promise.reject());
          validateEmail.mockImplementationOnce(() => true);
          const createAccountContainer = shallow(
            <CreateAccount mutate={jest.fn()} />
          );
          const createAccountScreen = createAccountContainer
            .dive()
            .find("CreateAccount");
          const email = "email@example.com";
          const result = createAccountScreen.props().onEmailChange(email);
          expect(result).rejects.toEqual();
        });
      });
      describe("when isEmailUnique resolves to false", () => {
        it("returns {valid: true, unique: false}", () => {
          isEmailUnique.mockImplementationOnce(() => Promise.resolve(false));
          validateEmail.mockImplementationOnce(() => true);
          const createAccountContainer = shallow(
            <CreateAccount mutate={jest.fn()} />
          );
          const createAccountScreen = createAccountContainer
            .dive()
            .find("CreateAccount");
          const email = "email@example.com";
          const result = createAccountScreen.props().onEmailChange(email);
          const shape = { valid: true, unique: false };
          return result.then(res => {
            expect(res).toEqual(shape);
          });
        });
      });
      describe("when isEmailUnique resolves to true", () => {
        it("returns {valid: true, unique: true}", () => {
          isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
          validateEmail.mockImplementationOnce(() => true);
          const createAccountContainer = shallow(
            <CreateAccount mutate={jest.fn()} />
          );
          const createAccountScreen = createAccountContainer
            .dive()
            .find("CreateAccount");
          const email = "email@example.com";
          const result = createAccountScreen.props().onEmailChange(email);
          const shape = { valid: true, unique: true };
          return result.then(res => {
            expect(res).toEqual(shape);
          });
        });
      });
    });
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
