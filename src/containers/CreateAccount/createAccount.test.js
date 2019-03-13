import React from "react";
import CreateAccount from ".";
import { shallow } from "enzyme";
import { graphql, compose } from "react-apollo";
import { GET_USER, CREATE_USER } from "../../graphql";
import { NETWORK_ERROR, DASHBOARD } from "../../constants";

describe("CreateAccount container", () => {
  it("calls compose with graphql wrapped GET_USER query and CREATE_USER mutation", () => {
    shallow(<CreateAccount mutate={jest.fn()} />);
    expect(graphql).toHaveBeenCalledWith(GET_USER);
    expect(compose).toHaveBeenCalledWith(
      graphql(GET_USER),
      graphql(CREATE_USER)
    );
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
  it("calls mutate prop on createAccount with correct arguments", () => {
    const mutate = jest.fn(() => Promise.resolve());
    const createAccountContainer = shallow(<CreateAccount mutate={mutate} />);
    const username = "username";
    const email = "email";
    const password = { id: "1", value: "password" };
    const confirmPassword = { id: "2", value: "password" };
    createAccountContainer.setProps({
      data: {
        user: {
          username,
          email,
          errors: []
        }
      }
    });
    const createAccountScreen = createAccountContainer
      .dive()
      .find("CreateAccount");
    createAccountScreen
      .props()
      .createAccount(false, false, password, confirmPassword);
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
  describe("when mutate returns a user with NETWORK_ERROR and field: null", () => {
    it("returns a rejected promise from createAccount", () => {
      const username = "username";
      const email = "email";
      const password = { id: "1", value: "password" };
      const confirmPassword = { id: "2", value: "password" };
      const user = {
        username,
        email,
        errors: {
          __typename: "Error",
          message: NETWORK_ERROR,
          location: {
            __typename: "Location",
            node: "user",
            field: null
          }
        }
      };
      const mutate = jest.fn(() => Promise.resolve(user));
      const createAccountContainer = shallow(<CreateAccount mutate={mutate} />);
      const createAccountScreen = createAccountContainer
        .dive()
        .find("CreateAccount");
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
      const mutate = jest.fn(() => Promise.resolve(user));
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
