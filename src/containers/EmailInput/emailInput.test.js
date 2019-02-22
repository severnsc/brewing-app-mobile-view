import React from "react";
import EmailInput from ".";
import { shallow } from "enzyme";
import { compose, graphql, mutate } from "react-apollo";
import { GET_USER, VALIDATE_EMAIL } from "../../graphql";

describe("EmailInput", () => {
  it("calls graphql with the GET_USER query", () => {
    const emailInput = shallow(<EmailInput />);
    expect(graphql).toHaveBeenCalledWith(GET_USER);
  });
  it("calls graphql with the VALIDATE_EMAIL mutation", () => {
    const emailInput = shallow(<EmailInput />);
    expect(graphql).toHaveBeenCalledWith(VALIDATE_EMAIL);
  });
  it("returns a TextInput", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive();
    expect(!!textInput).toBe(true);
  });
  it("passes testID prop down to the TextInput", () => {
    const emailInput = shallow(<EmailInput testID="test" />);
    const textInput = emailInput.dive();
    expect(textInput.prop("testID")).toBe("test");
  });
  it("outputs a console error when testID is not a string", () => {
    const spy = jest.spyOn(console, "error");
    const emailInput = shallow(<EmailInput testID={1} />);
    expect(spy.mock.calls[0][0]).toMatch(
      /Warning: Failed prop type: Invalid prop `testID` of type `number` supplied to `EmailInput`, expected `string`/
    );
    spy.mockRestore();
  });
  it("passes style prop down to the TextInput", () => {
    const emailInput = shallow(<EmailInput style={{ padding: 10 }} />);
    const textInput = emailInput.dive();
    expect(textInput.prop("style")).toEqual({ padding: 10 });
  });
  it("outputs a console error when style is not an object", () => {
    const spy = jest.spyOn(console, "error");
    const emailInput = shallow(<EmailInput style="style" />);
    expect(spy.mock.calls[0][0]).toMatch(
      /Warning: Failed prop type: Invalid prop `style` of type `string` supplied to `EmailInput`, expected `object`/
    );
    spy.mockRestore();
  });
  it("sets TextInput label prop to email", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive();
    expect(textInput.prop("label")).toBe("Email");
  });
  it("initializes the TextInput value prop with empty string", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive();
    expect(textInput.prop("value")).toBe("");
  });
  it("updates the TextInput value onChange", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive();
    textInput.simulate("change", "email@test.com");
    expect(textInput.prop("value")).toBe("email@test.com");
  });
  it("calls mutate prop with the email onChange", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive();
    textInput.simulate("change", "email@test.com");
    expect(mutate).toHaveBeenCalledWith({
      variables: { email: "email@test.com" }
    });
  });
  it("sets TextInput isError to false on mount", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive();
    expect(textInput.prop("isError")).toBe(false);
  });
  it("sets TextInput isError to true if data.user.errors.length > 0", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive();
    textInput.simulate("change", "invalid");
    emailInput.update();
    expect(emailInput.dive().prop("isError")).toBe(true);
  });
  it("sets the errorText prop on TextInput to empty string on mount", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive();
    expect(textInput.prop("errorText")).toBe("");
  });
  it("passes the message from the email error on data.user through to TextInput errorText prop", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive();
    textInput.simulate("change", "invalid");
    emailInput.update();
    expect(emailInput.dive().prop("errorText")).toBe("Email is invalid!");
  });
});
