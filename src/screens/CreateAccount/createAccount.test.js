import React from "react";
import { AlertIOS } from "react-native";
import { NETWORK_ERROR, NON_UNIQUE_USERNAME } from "../../constants";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import CreateAccount from ".";
import styles from "../styles";
import { TextInput } from "../../components";

describe("Create Account", () => {
  describe("layout", () => {
    it("should match the snapshot", () => {
      const createAccount = renderer.create(<CreateAccount />);
      const tree = createAccount.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe("Username input", () => {
    it("is a TextInput", () => {
      const createAccount = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const input = screen.find("TextInput").first();
      expect(input.type()).toBe(TextInput);
    });
    it("has input styles", () => {
      const createAccount = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const username = "username";
      const input = screen.find("TextInput").first();
      expect(input.prop("style")).toBe(styles.input);
    });
    it("has label username", () => {
      const createAccount = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const input = screen.find("TextInput").first();
      expect(input.prop("label")).toBe("Username");
    });
    it("has value equal to username prop", () => {
      const createAccount = jest.fn();
      const username = "username";
      const screen = shallow(
        <CreateAccount username={username} createAccount={createAccount} />
      );
      const input = screen.find("TextInput").first();
      expect(input.prop("value")).toBe(username);
    });
    it("has isError equal to !!usernameError prop", () => {
      const createAccount = jest.fn();
      const username = "username";
      const usernameError = "Error!";
      const screen = shallow(
        <CreateAccount
          username={username}
          usernameError={usernameError}
          createAccount={createAccount}
        />
      );
      const input = screen.find("TextInput").first();
      expect(input.prop("isError")).toBe(true);
    });
    it("sets errorText error", () => {
      const createAccount = jest.fn();
      const usernameError = NON_UNIQUE_USERNAME;
      const username = "username";
      const screen = shallow(
        <CreateAccount
          username={username}
          usernameError={usernameError}
          createAccount={createAccount}
        />
      );
      const input = screen.find("TextInput").first();
      expect(input.prop("errorText")).toBe(NON_UNIQUE_USERNAME);
    });
    it("sets loading to usernameLoading prop", () => {
      const createAccount = jest.fn();
      const usernameError = NON_UNIQUE_USERNAME;
      const username = "username";
      const usernameLoading = true;
      const screen = shallow(
        <CreateAccount
          username={username}
          usernameLoading={usernameLoading}
          usernameError={usernameError}
          createAccount={createAccount}
        />
      );
      const input = screen.find("TextInput").first();
      expect(input.prop("loading")).toBe(usernameLoading);
    });
    describe("onChange", () => {
      it("calls setUsername with the new value", () => {
        const createAccount = jest.fn();
        const setUsername = jest.fn();
        const screen = shallow(
          <CreateAccount
            createAccount={createAccount}
            setUsername={setUsername}
          />
        );
        const input = screen.find("TextInput").first();
        const newValue = "new value";
        input.props().onChange(newValue);
        expect(setUsername).toHaveBeenCalledWith(newValue);
      });
    });
  });
  describe("EmailInput", () => {
    it("is a TextInput", () => {
      const createAccount = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const input = screen.find("TextInput").get(1);
      expect(input.type.name).toBe("TextInput");
    });
    it("has label Email", () => {
      const createAccount = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const input = screen.find("TextInput").get(1);
      expect(input.props.label).toBe("Email");
    });
    it("has input styles", () => {
      const createAccount = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const input = screen.find("TextInput").get(1);
      expect(input.props.style).toBe(styles.input);
    });
    it("has value equal to email prop", () => {
      const createAccount = jest.fn();
      const email = "email@example.com";
      const screen = shallow(
        <CreateAccount email={email} createAccount={createAccount} />
      );
      const input = screen.find("TextInput").get(1);
      expect(input.props.value).toBe(email);
    });
    it("has isError equal to !!emailError", () => {
      const createAccount = jest.fn();
      const email = "email@example.com";
      const error = NETWORK_ERROR;
      const screen = shallow(
        <CreateAccount
          email={email}
          emailError={error}
          createAccount={createAccount}
        />
      );
      const input = screen.find("TextInput").get(1);
      expect(input.props.isError).toBe(true);
    });
    it("has errorText equal to emailError", () => {
      const createAccount = jest.fn();
      const email = "email@example.com";
      const error = NETWORK_ERROR;
      const screen = shallow(
        <CreateAccount
          email={email}
          emailError={error}
          createAccount={createAccount}
        />
      );
      const input = screen.find("TextInput").get(1);
      expect(input.props.errorText).toBe(error);
    });
    it("sets loading to emailLoading prop", () => {
      const createAccount = jest.fn();
      const email = "email@example.com";
      const error = NETWORK_ERROR;
      const emailLoading = true;
      const screen = shallow(
        <CreateAccount
          email={email}
          emailError={error}
          emailLoading={emailLoading}
          createAccount={createAccount}
        />
      );
      const input = screen.find("TextInput").get(1);
      expect(input.props.loading).toBe(true);
    });
    describe("onChange", () => {
      it("calls setEmail with new value", () => {
        const createAccount = jest.fn();
        const setEmail = jest.fn();
        const screen = shallow(
          <CreateAccount createAccount={createAccount} setEmail={setEmail} />
        );
        const email = "email@example.com";
        const error = NETWORK_ERROR;
        const validationLoading = true;
        const input = screen.find("TextInput").get(1);
        const newValue = "new value";
        input.props.onChange(newValue);
        expect(setEmail).toHaveBeenCalledWith(newValue);
      });
    });
  });
  describe("PasswordInput", () => {
    it("is a TextInput", () => {
      const createAccount = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const input = createAccountScreen.find("TextInput").get(2);
      expect(input.type.name).toBe("TextInput");
    });
    it("has password true", () => {
      const createAccount = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const input = createAccountScreen.find("TextInput").get(2);
      expect(input.props.password).toBe(true);
    });
    it("has label Password", () => {
      const createAccount = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const input = createAccountScreen.find("TextInput").get(2);
      expect(input.props.label).toBe("Password");
    });
    it("has input style", () => {
      const createAccount = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const input = createAccountScreen.find("TextInput").get(2);
      expect(input.props.style).toBe(styles.input);
    });
    it("has value equal to password prop", () => {
      const createAccount = jest.fn();
      const password = "password";
      const createAccountScreen = shallow(
        <CreateAccount password={password} createAccount={createAccount} />
      );
      const input = createAccountScreen.find("TextInput").get(2);
      expect(input.props.value).toBe(password);
    });
    it("sets isError to !!passwordError", () => {
      const createAccount = jest.fn();
      const error = NETWORK_ERROR;
      const createAccountScreen = shallow(
        <CreateAccount passwordError={error} createAccount={createAccount} />
      );
      const input = createAccountScreen.find("TextInput").get(2);
      expect(input.props.isError).toBe(true);
    });
    it("sets errorText to passwordError", () => {
      const createAccount = jest.fn();
      const error = NETWORK_ERROR;
      const createAccountScreen = shallow(
        <CreateAccount passwordError={error} createAccount={createAccount} />
      );
      const input = createAccountScreen.find("TextInput").get(2);
      expect(input.props.errorText).toBe(NETWORK_ERROR);
    });
    describe("onChange", () => {
      it("calls setPassword prop with password", () => {
        const createAccount = jest.fn();
        const setPassword = jest.fn();
        const createAccountScreen = shallow(
          <CreateAccount
            createAccount={createAccount}
            setPassword={setPassword}
          />
        );
        const input = createAccountScreen.find("TextInput").get(2);
        const newValue = "new value";
        input.props.onChange(newValue);
        expect(setPassword).toHaveBeenCalledWith(newValue);
      });
    });
  });
  describe("ConfirmPasswordInput", () => {
    it("sets the password prop to the screen password prop", () => {
      const createAccount = jest.fn();
      const password = "value";
      const createAccountScreen = shallow(
        <CreateAccount password={password} createAccount={createAccount} />
      );
      const input = createAccountScreen.find("ConfirmPasswordInput");
      expect(input.prop("password")).toBe("value");
    });
    it("sets the value prop to the confirmPassword prop", () => {
      const createAccount = jest.fn();
      const confirmPassword = "password";
      const createAccountScreen = shallow(
        <CreateAccount
          confirmPassword={confirmPassword}
          createAccount={createAccount}
        />
      );
      const input = createAccountScreen.find("ConfirmPasswordInput");
      expect(input.prop("value")).toBe(confirmPassword);
    });
    it("calls setConfirmPassword prop with newValue when updated", () => {
      const createAccount = jest.fn();
      const setConfirmPassword = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount
          setConfirmPassword={setConfirmPassword}
          createAccount={createAccount}
        />
      );
      const input = createAccountScreen.find("ConfirmPasswordInput");
      input.props().onChange("newValue");
      expect(setConfirmPassword).toHaveBeenLastCalledWith("newValue");
    });
  });
  describe("Submit button", () => {
    it("calls createAccount prop onPress", () => {
      const createAccount = jest.fn(() => Promise.resolve());
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const button = createAccountScreen.find("Button");
      button.props().onPress();
      expect(createAccount).toHaveBeenCalled();
    });
    describe("when createAccountLoading is true", () => {
      it("replaces the button with an ActivityIndicator", () => {
        const createAccount = jest.fn();
        const createAccountLoading = true;
        const createAccountScreen = shallow(
          <CreateAccount
            createAccount={createAccount}
            createAccountLoading={createAccountLoading}
          />
        );
        const activityIndicator = createAccountScreen.findWhere(
          n => n.prop("animating") === true
        );
        expect(activityIndicator).toHaveLength(1);
      });
    });
  });
  describe("when createAccountError is truthy", () => {
    it("launches an AlertIOS with createAccountError text", () => {
      const createAccount = jest.fn();
      const spy = jest.spyOn(AlertIOS, "alert");
      const createAccountScreen = shallow(
        <CreateAccount
          createAccount={createAccount}
          createAccountError={NETWORK_ERROR}
        />
      );
      expect(spy).toHaveBeenCalledWith("Error!", NETWORK_ERROR);
    });
    it("does not call AlertIOS.alert again when props change", () => {
      const createAccount = jest.fn();
      const spy = jest.spyOn(AlertIOS, "alert");
      const createAccountScreen = shallow(
        <CreateAccount
          createAccount={createAccount}
          createAccountError={NETWORK_ERROR}
        />
      );
      expect(spy).toHaveBeenCalledWith("Error!", NETWORK_ERROR);
      createAccountScreen.setProps({ createAccountLoading: true });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
