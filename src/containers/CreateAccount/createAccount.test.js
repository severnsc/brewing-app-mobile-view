import React from "react";
import CreateAccount from ".";
import { shallow } from "enzyme";
import { graphql, compose } from "react-apollo";
import { GET_USER, CREATE_USER } from "../../graphql";

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
    const mutate = jest.fn();
    const createAccountContainer = shallow(<CreateAccount mutate={mutate} />);
    const username = "username";
    const email = "email";
    const password = "password";
    const confirmPassword = "password";
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
        username,
        email,
        password,
        confirmPassword
      }
    });
  });
});
