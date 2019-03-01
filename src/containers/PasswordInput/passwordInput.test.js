import React from "react";
import PasswordInput from ".";
import { shallow } from "enzyme";
import { compose } from "react-apollo";
import { GET_USER, VALIDATE_PASSWORD } from "../../graphql";
import { INVALID_PASSWORD, NETWORK_ERROR } from "../../constants/errorMessages";

describe("PasswordInput container", () => {
  it("calls compose with the GET_USER query as first argument", () => {
    const onChange = jest.fn();
    shallow(<PasswordInput onChange={onChange} />);
    expect(compose.mock.calls[0][0]).toEqual({
      query: GET_USER,
      options: { variables: { excludeUsername: true, excludeEmail: true } }
    });
  });
  it("calls compose with the VALIDATE_PASSWORD query as second argument", () => {
    const onChange = jest.fn();
    shallow(<PasswordInput onChange={onChange} />);
    expect(compose.mock.calls[0][1]).toEqual({
      query: VALIDATE_PASSWORD,
      options: {}
    });
  });
  it("returns a TextInput", () => {
    const onChange = jest.fn();
    const passwordInput = shallow(<PasswordInput onChange={onChange} />);
    const textInput = passwordInput.dive().find("TextInput");
    expect(textInput).toHaveLength(1);
  });
  it("passes value prop through to TextInput", () => {
    const onChange = jest.fn();
    const value = "value";
    const passwordInput = shallow(
      <PasswordInput onChange={onChange} value={value} />
    );
    const textInput = passwordInput.dive().find("TextInput");
    expect(textInput.prop("value")).toBe("value");
  });
  it("passes testID prop through to TextInput", () => {
    const testID = "id";
    const onChange = jest.fn();
    const passwordInput = shallow(
      <PasswordInput onChange={onChange} testID={testID} />
    );
    const textInput = passwordInput.dive().find("TextInput");
    expect(textInput.prop("testID")).toBe(testID);
  });
  it("passes style prop through to TextInput", () => {
    const style = { flex: 1 };
    const onChange = jest.fn();
    const passwordInput = shallow(
      <PasswordInput onChange={onChange} style={style} />
    );
    const textInput = passwordInput.dive();
    expect(textInput.prop("style")).toBe(style);
  });
  it("has label Password", () => {
    const onChange = jest.fn();
    const passwordInput = shallow(<PasswordInput onChange={onChange} />);
    const textInput = passwordInput.dive();
    expect(textInput.prop("label")).toBe("Password");
  });
  it("has password prop", () => {
    const onChange = jest.fn();
    const passwordInput = shallow(<PasswordInput onChange={onChange} />);
    const textInput = passwordInput.dive();
    expect(textInput.prop("password")).toBe(true);
  });
  it("sets isError to true if data.user.errors contains any password errors", () => {
    const onChange = jest.fn();
    const data = {
      user: {
        errors: [
          {
            __typename: "Error",
            message: INVALID_PASSWORD,
            location: {
              __typename: "Location",
              node: "user",
              field: "password"
            }
          }
        ]
      }
    };
    const passwordInput = shallow(
      <PasswordInput onChange={onChange} data={data} />
    );
    const textInput = passwordInput.dive();
    expect(textInput.prop("isError")).toBe(true);
  });
  it("sets errorText to the error message of the first error if there are password errors", () => {
    const onChange = jest.fn();
    const data = {
      user: {
        errors: [
          {
            __typename: "Error",
            message: INVALID_PASSWORD,
            location: {
              __typename: "Location",
              node: "user",
              field: "password"
            }
          },
          {
            __typename: "Error",
            message: NETWORK_ERROR,
            location: {
              __typename: "Location",
              node: "user",
              field: "password"
            }
          }
        ]
      }
    };
    const passwordInput = shallow(
      <PasswordInput onChange={onChange} data={data} />
    );
    const textInput = passwordInput.dive();
    expect(textInput.prop("errorText")).toBe(INVALID_PASSWORD);
  });
  it("calls onChange with the new value when value is changed", () => {
    const onChange = jest.fn();
    const mutation = jest.fn();
    const passwordInput = shallow(
      <PasswordInput onChange={onChange} mutation={mutation} />
    );
    const textInput = passwordInput.dive();
    textInput.simulate("change", "newValue");
    expect(onChange).toHaveBeenCalledWith("newValue");
  });
  it("calls mutate prop with new value onChange", () => {
    const onChange = jest.fn();
    const mutate = jest.fn();
    const passwordInput = shallow(
      <PasswordInput onChange={onChange} mutate={mutate} />
    );
    const textInput = passwordInput.dive();
    textInput.simulate("change", "newValue");
    expect(mutate).toHaveBeenCalledWith({
      variables: { password: "newValue" }
    });
  });
});
