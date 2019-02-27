import React from "react";
import UsernameInput from ".";
import { shallow } from "enzyme";

describe("UsernameInput", () => {
  it("passes testID prop through to the base TextInput", () => {
    const usernameInput = shallow(<UsernameInput testID="test" />);
    const textInput = usernameInput.dive().find("TextInput");
    expect(textInput.prop("testID")).toBe("test");
  });

  it("passes style prop through to the TextInput", () => {
    const usernameInput = shallow(<UsernameInput style={{ padding: "10" }} />);
    const textInput = usernameInput.dive().find("TextInput");
    expect(textInput.prop("style")).toEqual({ padding: "10" });
  });

  it("has label Username", () => {
    const usernameInput = shallow(<UsernameInput style={{ padding: "10" }} />);
    const textInput = usernameInput.dive().find("TextInput");
    expect(textInput.prop("label")).toBe("Username");
  });

  describe("error state", () => {
    it("sets an error state only for username errors", () => {
      const usernameInput = shallow(<UsernameInput />);
      const textInput = usernameInput.dive().find("TextInput");
      expect(textInput.prop("isError")).toBe(false);
    });
  });

  describe("validationLoading prop", () => {
    describe("when false", () => {
      it("does not display an ActivityIndicator", () => {
        const usernameInput = shallow(
          <UsernameInput validationLoading={false} />
        );
        const child = usernameInput.dive();
        const activityIndicator = child.findWhere(n => n.prop("animating"));
        expect(activityIndicator).toHaveLength(0);
      });
    });
    describe("when true", () => {
      it("displays an ActivityIndicator", () => {
        const usernameInput = shallow(
          <UsernameInput validationLoading={true} />
        );
        const child = usernameInput.dive();
        const activityIndicator = child.findWhere(n => n.prop("animating"));
        expect(activityIndicator).toHaveLength(1);
      });
      it("sets the isError prop to false", () => {
        const usernameInput = shallow(
          <UsernameInput validationLoading={true} />
        );
        usernameInput.setProps({
          data: {
            user: {
              username: "",
              errors: [
                {
                  __typename: "Error",
                  message: "Invalid username!",
                  location: {
                    node: "user",
                    field: "username"
                  }
                }
              ]
            }
          }
        });
        const child = usernameInput.dive();
        const textInput = child.find("TextInput");
        expect(textInput.prop("isError")).toBe(false);
      });
      it("sets the errorText prop to empty string", () => {
        const usernameInput = shallow(
          <UsernameInput validationLoading={true} />
        );
        usernameInput.setProps({
          data: {
            user: {
              username: "",
              errors: [
                {
                  __typename: "Error",
                  message: "Invalid username!",
                  location: {
                    node: "user",
                    field: "username"
                  }
                }
              ]
            }
          }
        });
        const child = usernameInput.dive();
        const textInput = child.find("TextInput");
        expect(textInput.prop("errorText")).toBe("");
      });
    });
  });

  describe("updating with valid value", () => {
    it("passes the value through to the TextInput", () => {
      const usernameInput = shallow(<UsernameInput />);
      usernameInput.setProps({
        data: {
          user: {
            id: "1",
            username: "",
            email: "",
            errors: []
          }
        }
      });
      const textInput = usernameInput.dive().find("TextInput");
      expect(textInput.prop("value")).toBe("");
      usernameInput.setProps({
        data: {
          user: {
            id: "1",
            username: "valid",
            email: "",
            errors: []
          }
        }
      });
      expect(
        usernameInput
          .dive()
          .find("TextInput")
          .prop("value")
      ).toBe("valid");
    });
    it("calls onValidationChange prop with true", () => {
      const onValidationChange = jest.fn();
      const validateUsername = jest.fn(() => Promise.resolve());
      const updateUser = jest.fn();
      const usernameInput = shallow(
        <UsernameInput
          onValidationChange={onValidationChange}
          validateUsername={validateUsername}
          updateUser={updateUser}
        />
      );
      const textInput = usernameInput.dive().find("TextInput");
      textInput.simulate("change");
      expect(onValidationChange).toHaveBeenCalledWith(true);
    });
    it("calls the updateUser prop with the new value", () => {
      const updateUser = jest.fn();
      const validateUsername = jest.fn(() => Promise.resolve());
      const usernameInput = shallow(
        <UsernameInput
          updateUser={updateUser}
          validateUsername={validateUsername}
        />
      );
      const textInput = usernameInput.dive().find("TextInput");
      textInput.simulate("change", "valid");
      expect(updateUser).toHaveBeenCalledWith({
        variables: { userEdit: { username: "valid" } }
      });
    });
    it("calls validateUsername prop with new value", () => {
      const validateUsername = jest.fn(() => Promise.resolve());
      const updateUser = jest.fn();
      const usernameInput = shallow(
        <UsernameInput
          validateUsername={validateUsername}
          updateUser={updateUser}
        />
      );
      const textInput = usernameInput.dive().find("TextInput");
      textInput.simulate("change", "valid");
      expect(validateUsername).toHaveBeenLastCalledWith({
        variables: { username: "valid" }
      });
    });
    it("calls onValidationChange prop with false after validateUsername resolves", () => {
      const onValidationChange = jest.fn();
      const validateUsername = jest.fn(() => Promise.resolve());
      const updateUser = jest.fn();
      const usernameInput = shallow(
        <UsernameInput
          onValidationChange={onValidationChange}
          validateUsername={validateUsername}
          updateUser={updateUser}
        />
      );
      const textInput = usernameInput.dive().find("TextInput");
      textInput.simulate("change");
      return Promise.resolve().then(() => {
        expect(onValidationChange).toHaveBeenLastCalledWith(false);
      });
    });
  });

  describe("updating with invalid value", () => {
    it("passes the value through to the TextInput", async () => {
      let usernameInput = shallow(<UsernameInput />);
      usernameInput.setProps({
        data: {
          user: {
            username: "",
            errors: []
          }
        }
      });
      const textInput = usernameInput.dive().find("TextInput");
      expect(textInput.prop("value")).toBe("");
      usernameInput.setProps({
        data: {
          user: {
            username: "invalid",
            errors: []
          }
        }
      });
      expect(
        usernameInput
          .dive()
          .find("TextInput")
          .prop("value")
      ).toBe("invalid");
    });
    it("sets the TextInput isError to true", () => {
      const validateUsername = jest.fn(() => Promise.resolve());
      const updateUser = jest.fn();
      const usernameInput = shallow(
        <UsernameInput
          validateUsername={validateUsername}
          updateUser={updateUser}
        />
      );
      usernameInput.setProps({
        data: {
          user: {
            username: "invalid",
            errors: []
          }
        }
      });
      const textInput = usernameInput.dive().find("TextInput");
      expect(textInput.prop("isError")).toBe(false);
      textInput.simulate("change", "invalid");
      usernameInput.setProps({
        data: {
          user: {
            username: "invalid",
            errors: [
              {
                __typename: "Error",
                message: "Invalid username!",
                location: {
                  __typename: "Location",
                  node: "user",
                  field: "username"
                }
              }
            ]
          }
        }
      });
      expect(
        usernameInput
          .dive()
          .find("TextInput")
          .prop("isError")
      ).toBe(true);
    });
    it("sets the TextInput errorText to the error message", () => {
      const usernameInput = shallow(<UsernameInput />);
      usernameInput.setProps({
        data: {
          user: {
            username: "invalid",
            errors: []
          }
        }
      });
      const textInput = usernameInput.dive().find("TextInput");
      expect(textInput.prop("errorText")).toBe("");
      usernameInput.setProps({
        data: {
          user: {
            username: "invalid",
            errors: [
              {
                __typename: "Error",
                message: "Invalid username!",
                location: {
                  __typename: "Location",
                  node: "user",
                  field: "username"
                }
              }
            ]
          }
        }
      });
      usernameInput.update();
      expect(
        usernameInput
          .dive()
          .find("TextInput")
          .prop("errorText")
      ).toBe("Invalid username!");
    });
    it("calls updateUser with the new value", () => {
      const updateUser = jest.fn();
      const validateUsername = jest.fn(() => Promise.resolve());
      const usernameInput = shallow(
        <UsernameInput
          updateUser={updateUser}
          validateUsername={validateUsername}
        />
      );
      const textInput = usernameInput.dive().find("TextInput");
      textInput.simulate("change", "valid");
      expect(updateUser).toHaveBeenCalledWith({
        variables: { userEdit: { username: "valid" } }
      });
    });
    it("calss validateUsername with the new value", () => {
      const updateUser = jest.fn();
      const validateUsername = jest.fn(() => Promise.resolve());
      const usernameInput = shallow(
        <UsernameInput
          updateUser={updateUser}
          validateUsername={validateUsername}
        />
      );
      const textInput = usernameInput.dive().find("TextInput");
      textInput.simulate("change", "valid");
      expect(validateUsername).toHaveBeenCalledWith({
        variables: { username: "valid" }
      });
    });
    it("calls onValidationChange prop with true", () => {
      const onValidationChange = jest.fn();
      const validateUsername = jest.fn(() => Promise.resolve());
      const updateUser = jest.fn();
      const usernameInput = shallow(
        <UsernameInput
          updateUser={updateUser}
          onValidationChange={onValidationChange}
          validateUsername={validateUsername}
        />
      );
      const textInput = usernameInput.dive().find("TextInput");
      textInput.simulate("change");
      expect(onValidationChange).toHaveBeenCalledWith(true);
    });
  });
});
