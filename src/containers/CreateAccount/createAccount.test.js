import React from "react";
import CreateAccount from ".";
import { shallow } from "enzyme";
import { graphql, compose } from "react-apollo";
import { CREATE_USER } from "../../graphql";
import {
  NETWORK_ERROR,
  NON_UNIQUE_USERNAME,
  NON_UNIQUE_EMAIL,
  INVALID_EMAIL,
  DASHBOARD
} from "../../constants";
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
  describe("onUsernameChange", () => {
    it("calls validateUsername with the username", () => {
      const createAccountContainer = shallow(
        <CreateAccount mutate={jest.fn()} />
      );
      const createAccountScreen = createAccountContainer
        .dive()
        .find("CreateAccount");
      const username = "username";
      createAccountScreen.props().onUsernameChange(username);
      expect(validateUsername).toHaveBeenCalledWith(username);
    });
    describe("when validateUsername rejects", () => {
      it("returns a Promise that rejects to error with NETWORK_ERROR message", () => {
        validateUsername.mockImplementationOnce(() => Promise.reject());
        const createAccountContainer = shallow(
          <CreateAccount mutate={jest.fn()} />
        );
        const createAccountScreen = createAccountContainer
          .dive()
          .find("CreateAccount");
        const username = "username";
        const result = createAccountScreen.props().onUsernameChange(username);
        return result.catch(e => {
          expect(e.message).toBe(NETWORK_ERROR);
        });
      });
    });
    describe("when validateUsername resolves", () => {
      describe("with false", () => {
        it("returns a NON_UNIQUE_USERNAME message", () => {
          validateUsername.mockImplementationOnce(() => Promise.resolve(false));
          const createAccountContainer = shallow(
            <CreateAccount mutate={jest.fn()} />
          );
          const createAccountScreen = createAccountContainer
            .dive()
            .find("CreateAccount");
          const username = "username";
          const result = createAccountScreen.props().onUsernameChange(username);
          return result.then(message => {
            expect(message).toBe(NON_UNIQUE_USERNAME);
          });
        });
      });
      describe("with true", () => {
        it("returns an empty string", () => {
          validateUsername.mockImplementationOnce(() => Promise.resolve(true));
          const createAccountContainer = shallow(
            <CreateAccount mutate={jest.fn()} />
          );
          const createAccountScreen = createAccountContainer
            .dive()
            .find("CreateAccount");
          const username = "username";
          const result = createAccountScreen.props().onUsernameChange(username);
          return result.then(message => {
            expect(message).toBe("");
          });
        });
      });
    });
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
      it("resolves to an INVALID_EMAIL message", () => {
        validateEmail.mockImplementationOnce(() => false);
        const createAccountContainer = shallow(
          <CreateAccount mutate={jest.fn()} />
        );
        const createAccountScreen = createAccountContainer
          .dive()
          .find("CreateAccount");
        const email = "email@example.com";
        const result = createAccountScreen.props().onEmailChange(email);
        return result.then(message => {
          expect(message).toBe(INVALID_EMAIL);
        });
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
        it("returns a rejected promise that resolves to NETWORK_ERROR", () => {
          isEmailUnique.mockImplementationOnce(() =>
            Promise.reject(new Error(NETWORK_ERROR))
          );
          validateEmail.mockImplementationOnce(() => true);
          const createAccountContainer = shallow(
            <CreateAccount mutate={jest.fn()} />
          );
          const createAccountScreen = createAccountContainer
            .dive()
            .find("CreateAccount");
          const email = "email@example.com";
          const result = createAccountScreen.props().onEmailChange(email);
          return result.catch(e => {
            expect(e.message).toBe(NETWORK_ERROR);
          });
        });
      });
      describe("when isEmailUnique resolves to false", () => {
        it("returns NON_UNIQUE_EMAIL", () => {
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
          return result.then(message => {
            expect(message).toEqual(NON_UNIQUE_EMAIL);
          });
        });
      });
      describe("when isEmailUnique resolves to true", () => {
        it("returns empty string", () => {
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
          return result.then(message => {
            expect(message).toEqual("");
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
