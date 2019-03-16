import React from "react";
import EmailInput from ".";
import { shallow } from "enzyme";
import { graphql } from "react-apollo";
import { GET_USER, VALIDATE_EMAIL, UPDATE_USER } from "../../graphql";

describe("EmailInput", () => {
  it("calls graphql with the GET_USER query", () => {
    shallow(<EmailInput />);
    expect(graphql).toHaveBeenCalledWith(GET_USER);
  });
  it("calls graphql with the VALIDATE_EMAIL mutation", () => {
    shallow(<EmailInput />);
    expect(graphql).toHaveBeenNthCalledWith(2, VALIDATE_EMAIL, {
      name: "validateEmail"
    });
  });
  it("calls graphql with the UPDATE_USER mutation", () => {
    shallow(<EmailInput />);
    expect(graphql).toHaveBeenLastCalledWith(UPDATE_USER, {
      name: "updateUser"
    });
  });
  it("returns a TextInput", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive().find("TextInput");
    expect(!!textInput).toBe(true);
  });
  it("passes testID prop down to the TextInput", () => {
    const emailInput = shallow(<EmailInput testID="test" />);
    const textInput = emailInput.dive().find("TextInput");
    expect(textInput.prop("testID")).toBe("test");
  });
  it("passes style prop down to the TextInput", () => {
    const emailInput = shallow(<EmailInput style={{ padding: 10 }} />);
    const textInput = emailInput.dive().find("TextInput");
    expect(textInput.prop("style")).toEqual({ padding: 10 });
  });
  it("sets TextInput label prop to email", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive().find("TextInput");
    expect(textInput.prop("label")).toBe("Email");
  });
  it("sets TextInput errorTestID prop to emailInputError", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive().find("TextInput");
    expect(textInput.prop("errorTestID")).toBe("emailInputError");
  });
  it("sets the TextInput value to the data.user.email value", () => {
    const data = {
      user: {
        email: "email",
        errors: []
      }
    };
    const emailInput = shallow(<EmailInput data={data} />);
    const textInput = emailInput.dive().find("TextInput");
    expect(textInput.prop("value")).toBe(data.user.email);
  });
  it("calls updateUser prop onChange", () => {
    const updateUser = jest.fn();
    const validateEmail = jest.fn(() => Promise.resolve());
    const emailInput = shallow(
      <EmailInput updateUser={updateUser} validateEmail={validateEmail} />
    );
    const textInput = emailInput.dive().find("TextInput");
    textInput.simulate("change", "email@test.com");
    expect(updateUser).toHaveBeenCalledWith({
      variables: { edit: { email: "email@test.com" } }
    });
  });
  it("calls validateEmail prop with the email onChange", () => {
    const validateEmail = jest.fn(() => Promise.resolve());
    const updateUser = jest.fn();
    const emailInput = shallow(
      <EmailInput validateEmail={validateEmail} updateUser={updateUser} />
    );
    const textInput = emailInput.dive().find("TextInput");
    textInput.simulate("change", "email@test.com");
    expect(validateEmail).toHaveBeenCalledWith({
      variables: { email: "email@test.com" }
    });
  });
  it("sets TextInput isError to false on mount", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive().find("TextInput");
    expect(textInput.prop("isError")).toBe(false);
  });
  it("sets TextInput isError to true if data.user.errors.length > 0", () => {
    const updateUser = jest.fn();
    const validateEmail = jest.fn();
    const data = {
      user: {
        errors: [
          {
            __typename: "Error",
            message: "Ivalid email!",
            location: {
              __typename: "Location",
              node: "user",
              field: "email"
            }
          }
        ]
      }
    };
    const emailInput = shallow(
      <EmailInput
        updateUser={updateUser}
        validateEmail={validateEmail}
        data={data}
      />
    );
    const textInput = emailInput.dive().find("TextInput");
    expect(textInput.prop("isError")).toBe(true);
  });
  it("sets the errorText prop on TextInput to empty string on mount", () => {
    const emailInput = shallow(<EmailInput />);
    const textInput = emailInput.dive().find("TextInput");
    expect(textInput.prop("errorText")).toBe("");
  });
  it("passes the message from the email error on data.user through to TextInput errorText prop", () => {
    const data = {
      user: {
        errors: [
          {
            __typename: "Error",
            message: "Invalid email!",
            location: {
              __typename: "Location",
              node: "user",
              field: "email"
            }
          }
        ]
      }
    };
    const emailInput = shallow(<EmailInput data={data} />);
    const textInput = emailInput.dive().find("TextInput");
    expect(textInput.prop("errorText")).toBe("Invalid email!");
  });
  describe("validationLoading prop", () => {
    describe("when false", () => {
      it("does not display an ActivityIndicator", () => {
        const emailInput = shallow(<EmailInput validationLoading={false} />);
        const wrapper = emailInput.dive().find("TextInput");
        const activityIndicator = wrapper.findWhere(n => n.prop("animating"));
        expect(activityIndicator).toHaveLength(0);
      });
    });
    describe("when true", () => {
      it("does display an ActivityIndicator", () => {
        const emailInput = shallow(<EmailInput validationLoading={true} />);
        const wrapper = emailInput.dive();
        const activityIndicator = wrapper.findWhere(n => n.prop("animating"));
        expect(activityIndicator).toHaveLength(1);
      });
      it("sets isError to false", () => {
        const data = {
          user: {
            errors: [
              {
                __typename: "Error",
                message: "Invalid email!",
                location: {
                  __typename: "Location",
                  node: "user",
                  field: "email"
                }
              }
            ]
          }
        };
        const emailInput = shallow(
          <EmailInput validationLoading={true} data={data} />
        );
        const textInput = emailInput.dive().find("TextInput");
        expect(textInput.prop("isError")).toBe(false);
      });
      it("sets errorText to empty string", () => {
        const data = {
          user: {
            errors: [
              {
                __typename: "Error",
                message: "Invalid email!",
                location: {
                  __typename: "Location",
                  node: "user",
                  field: "email"
                }
              }
            ]
          }
        };
        const emailInput = shallow(
          <EmailInput validationLoading={true} data={data} />
        );
        const textInput = emailInput.dive().find("TextInput");
        expect(textInput.prop("errorText")).toBe("");
      });
    });
  });
  describe("onValidationChange prop", () => {
    it("is called with true onChange", () => {
      const onValidationChange = jest.fn();
      const validateEmail = jest.fn(() => Promise.resolve());
      const emailInput = shallow(
        <EmailInput
          onValidationChange={onValidationChange}
          validateEmail={validateEmail}
        />
      );
      const textInput = emailInput.dive().find("TextInput");
      textInput.simulate("change", "email");
      expect(onValidationChange).toHaveBeenCalledWith(true);
    });
    it("is called with false once validateUsername resolves", () => {
      const onValidationChange = jest.fn();
      const validateEmail = jest.fn(() => Promise.resolve());
      const emailInput = shallow(
        <EmailInput
          onValidationChange={onValidationChange}
          validateEmail={validateEmail}
        />
      );
      const textInput = emailInput.dive().find("TextInput");
      textInput.simulate("change", "email");
      return Promise.resolve().then(() => {
        expect(onValidationChange).toHaveBeenCalledWith(false);
      });
    });
  });
});
