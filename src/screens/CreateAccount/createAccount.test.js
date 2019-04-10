import React from "react";
import {
  NETWORK_ERROR,
  NON_UNIQUE_USERNAME,
  NON_UNIQUE_EMAIL,
  INVALID_PASSWORD
} from "../../constants";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import CreateAccount from ".";
import { AlertIOS } from "react-native";
import styles from "../styles";

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
      const onChange = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[0];
      expect(input.type.name).toBe("TextInput");
    });
    it("has input styles", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const username = "username";
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: { username } },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[0];
      expect(input.props.style).toBe(styles.input);
    });
    it("has label username", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const username = "username";
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: { username } },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[0];
      expect(input.props.label).toBe("Username");
    });
    it("has value equal to username prop", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const username = "username";
      const screen = shallow(
        <CreateAccount username={username} createAccount={createAccount} />
      );
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: "" },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[0];
      expect(input.props.value).toBe(username);
    });
    it("has isError equal to !!usernameError prop", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const username = "username";
      const usernameError = "Error!";
      const screen = shallow(
        <CreateAccount
          username={username}
          usernameError={usernameError}
          createAccount={createAccount}
        />
      );
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: "" },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[0];
      expect(input.props.isError).toBe(true);
    });
    it("sets errorText error", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const usernameError = NON_UNIQUE_USERNAME;
      const username = "username";
      const screen = shallow(
        <CreateAccount
          username={username}
          usernameError={usernameError}
          createAccount={createAccount}
        />
      );
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: "" },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[0];
      expect(input.props.errorText).toBe(NON_UNIQUE_USERNAME);
    });
    it("sets loading to usernameLoading prop", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
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
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: "" },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[0];
      expect(input.props.loading).toBe(usernameLoading);
    });
    describe("onChange", () => {
      it("calls setUsername with the new value", () => {
        const createAccount = jest.fn();
        const setUsername = jest.fn();
        const onChange = jest.fn();
        const screen = shallow(
          <CreateAccount
            createAccount={createAccount}
            setUsername={setUsername}
          />
        );
        const username = "username";
        const form = screen.find("Form").prop("children")(
          [
            { id: "1", value: "" },
            { id: "2", value: false },
            { id: "3", value: "" },
            { id: "4", value: "" },
            { id: "5", value: false }
          ],
          onChange,
          createAccount
        );
        const input = form.props.children[0];
        const newValue = "new value";
        input.props.onChange(newValue);
        expect(setUsername).toHaveBeenCalledWith(newValue);
      });
    });
  });
  describe("EmailInput", () => {
    it("is a TextInput", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[1];
      expect(input.type.name).toBe("TextInput");
    });
    it("has label Email", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[1];
      expect(input.props.label).toBe("Email");
    });
    it("has input styles", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[1];
      expect(input.props.style).toBe(styles.input);
    });
    it("has value equal to email prop", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const email = "email@example.com";
      const screen = shallow(
        <CreateAccount email={email} createAccount={createAccount} />
      );
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: "" },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[1];
      expect(input.props.value).toBe(email);
    });
    it("has isError equal to !!emailError", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const email = "email@example.com";
      const error = NETWORK_ERROR;
      const screen = shallow(
        <CreateAccount
          email={email}
          emailError={error}
          createAccount={createAccount}
        />
      );
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: "" },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[1];
      expect(input.props.isError).toBe(true);
    });
    it("has errorText equal to emailError", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const email = "email@example.com";
      const error = NETWORK_ERROR;
      const screen = shallow(
        <CreateAccount
          email={email}
          emailError={error}
          createAccount={createAccount}
        />
      );
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: "" },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[1];
      expect(input.props.errorText).toBe(error);
    });
    it("sets loading to emailLoading prop", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
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
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: "" },
          { id: "3", value: "" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[1];
      expect(input.props.loading).toBe(true);
    });
    describe("onChange", () => {
      it("calls setEmail with new value", () => {
        const createAccount = jest.fn();
        const onChange = jest.fn();
        const setEmail = jest.fn();
        const screen = shallow(
          <CreateAccount createAccount={createAccount} setEmail={setEmail} />
        );
        const email = "email@example.com";
        const error = NETWORK_ERROR;
        const validationLoading = true;
        const form = screen.find("Form").prop("children")(
          [
            { id: "1", value: false },
            { id: "2", value: { email, error, validationLoading } },
            { id: "3", value: "" },
            { id: "4", value: "" },
            { id: "5", value: false }
          ],
          onChange,
          createAccount
        );
        const input = form.props.children[1];
        const newValue = "new value";
        input.props.onChange(newValue);
        expect(setEmail).toHaveBeenCalledWith(newValue);
      });
    });
  });
  describe("PasswordInput", () => {
    it("is a TextInput", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[2];
      expect(input.type.name).toBe("TextInput");
    });
    it("has id 3", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[2];
      expect(input.props.id).toBe("3");
    });
    it("has password true", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[2];
      expect(input.props.password).toBe(true);
    });
    it("has label Password", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[2];
      expect(input.props.label).toBe("Password");
    });
    it("has input style", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[2];
      expect(input.props.style).toBe(styles.input);
    });
    it("has value equal to values[2].value.password", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const password = "password";
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: { password } },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[2];
      expect(input.props.value).toBe(password);
    });
    it("sets isError to !!values[2].value.error", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const error = NETWORK_ERROR;
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: { error } },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[2];
      expect(input.props.isError).toBe(true);
    });
    it("sets errorText to error", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const error = NETWORK_ERROR;
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: { error } },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const input = form.props.children[2];
      expect(input.props.errorText).toBe(NETWORK_ERROR);
    });
    describe("onChange", () => {
      it("calls onPasswordChange prop with password", () => {
        const createAccount = jest.fn();
        const onChange = jest.fn();
        const onPasswordChange = jest.fn();
        const createAccountScreen = shallow(
          <CreateAccount
            createAccount={createAccount}
            onPasswordChange={onPasswordChange}
          />
        );
        const form = createAccountScreen.find("Form").prop("children")(
          [
            { id: "1", value: false },
            { id: "2", value: false },
            { id: "3", value: "value" },
            { id: "4", value: "" },
            { id: "5", value: false }
          ],
          onChange,
          createAccount
        );
        const input = form.props.children[2];
        const newValue = "new value";
        input.props.onChange(newValue);
        expect(onPasswordChange).toHaveBeenCalledWith(newValue);
      });
      describe("when onPasswordChange returns message", () => {
        it("calls onChange with error set to the message", () => {
          const createAccount = jest.fn();
          const onChange = jest.fn();
          const onPasswordChange = jest.fn(() => INVALID_PASSWORD);
          const createAccountScreen = shallow(
            <CreateAccount
              createAccount={createAccount}
              onPasswordChange={onPasswordChange}
            />
          );
          const form = createAccountScreen.find("Form").prop("children")(
            [
              { id: "1", value: false },
              { id: "2", value: false },
              { id: "3", value: "value" },
              { id: "4", value: "" },
              { id: "5", value: false }
            ],
            onChange,
            createAccount
          );
          const input = form.props.children[2];
          const newValue = "new value";
          input.props.onChange(newValue);
          expect(onChange).toHaveBeenCalledWith("3", {
            password: newValue,
            error: INVALID_PASSWORD
          });
        });
      });
    });
  });
  describe("ConfirmPasswordInput", () => {
    it("sets the password prop to the 3rd value from the values array", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const password = "value";
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: { password } },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      expect(form.props.children[3].props.password).toBe("value");
    });
    it("sets the value prop to the 4th value from the values array", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "value" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      expect(form.props.children[3].props.value).toBe("value");
    });
    it("calls onChange prop with id 4 and newValue when updated", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "" },
          { id: "4", value: "value" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const confirmPasswordInput = form.props.children[3];
      confirmPasswordInput.props.onChange("newValue");
      expect(onChange).toHaveBeenLastCalledWith("4", "newValue");
    });
  });
  describe("Submit button", () => {
    it("calls createAccount prop onPress", () => {
      const createAccount = jest.fn(() => Promise.resolve());
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const button = form.props.children[4].props.onPress();
      expect(createAccount).toHaveBeenCalled();
    });
    it("calls onChange with 5 and true onPress", () => {
      const createAccount = jest.fn(() => Promise.resolve());
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const button = form.props.children[4];
      button.props.onPress();
      expect(onChange).toHaveBeenCalledWith("5", true);
    });
    it("calls onChange with 5 and false when onSubmit resolves", () => {
      const createAccount = jest.fn(() => Promise.resolve());
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      const button = form.props.children[4];
      button.props.onPress();
      return Promise.resolve().then(() => {
        expect(onChange).toHaveBeenCalledWith("5", false);
      });
    });
    it("calls onChange with 5 and false when onSubmit rejects", () => {
      const createAccount = jest.fn(() =>
        Promise.reject(new Error(NETWORK_ERROR))
      );
      const onChange = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      const form = createAccountScreen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: false },
          { id: "3", value: "value" },
          { id: "4", value: "" },
          { id: "5", value: false }
        ],
        onChange,
        createAccount
      );
      form.props.children[4].props.onPress();
      return Promise.resolve()
        .then()
        .then(() => {
          expect(onChange).toHaveBeenCalledWith("5", false);
        });
    });
    describe("when the 5th form value is true", () => {
      it("replaces the button with an ActivityIndicator", () => {
        const createAccount = jest.fn();
        const onChange = jest.fn();
        const createAccountScreen = shallow(
          <CreateAccount createAccount={createAccount} />
        );
        const form = createAccountScreen.find("Form").prop("children")(
          [
            { id: "1", value: false },
            { id: "2", value: false },
            { id: "3", value: "value" },
            { id: "4", value: "" },
            { id: "5", value: true }
          ],
          onChange,
          createAccount
        );
        const activityIndicator = form.props.children[4];
        expect(activityIndicator.props.animating).toBe(true);
      });
    });
  });
  describe("submitting create account form", () => {
    it("calls the createAccount prop", () => {
      const createAccount = jest.fn();
      const createAccountScreen = shallow(
        <CreateAccount createAccount={createAccount} />
      );
      createAccountScreen.find("Form").simulate("submit");
      expect(createAccount).toHaveBeenCalled();
    });
    describe("when onSubmit rejects", () => {
      it("launches an AlertIOS with a message equal to error.message", () => {
        const createAccount = jest.fn(() =>
          Promise.reject(new Error(NETWORK_ERROR))
        );
        const onChange = jest.fn();
        const createAccountScreen = shallow(
          <CreateAccount createAccount={createAccount} />
        );
        const form = createAccountScreen.find("Form").prop("children")(
          [
            { id: "1", value: false },
            { id: "2", value: false },
            { id: "3", value: "" },
            { id: "4", value: "" },
            { id: "5", value: false }
          ],
          onChange,
          createAccount
        );
        const spy = jest.spyOn(AlertIOS, "alert");
        form.props.children[4].props.onPress();
        return Promise.resolve()
          .then()
          .then(() => {
            expect(spy).toHaveBeenCalledWith("Error!", NETWORK_ERROR);
          });
      });
    });
  });
});
