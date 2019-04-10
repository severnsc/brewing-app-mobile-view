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
    it("has id 1", () => {
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
      expect(input.props.id).toBe("1");
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
    it("has value equal to values[0].value.username", () => {
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
      expect(input.props.value).toBe(username);
    });
    it("has isError equal to !!values[0].value.error", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const username = "username";
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: { username, error: NETWORK_ERROR } },
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
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const username = "username";
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: { username, error: NON_UNIQUE_USERNAME } },
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
    describe("onChange", () => {
      it("calls onChange with id 1 and the new values object", () => {
        const createAccount = jest.fn();
        const onChange = jest.fn();
        const onUsernameChange = jest.fn(() => Promise.resolve());
        const screen = shallow(
          <CreateAccount
            createAccount={createAccount}
            onUsernameChange={onUsernameChange}
          />
        );
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
        const newValue = "new value";
        input.props.onChange(newValue);
        expect(onChange).toHaveBeenCalledWith("1", {
          username: newValue,
          validationLoading: true,
          error: ""
        });
      });
      it("calls onUsernameChange with the new username", () => {
        const createAccount = jest.fn();
        const onChange = jest.fn();
        const onUsernameChange = jest.fn(() => Promise.resolve());
        const screen = shallow(
          <CreateAccount
            createAccount={createAccount}
            onUsernameChange={onUsernameChange}
          />
        );
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
        const newValue = "new value";
        input.props.onChange(newValue);
        expect(onUsernameChange).toHaveBeenCalledWith(newValue);
      });
    });
    describe("when onUsernameChange returns an error", () => {
      it("calls onChange with id 1 and error equal to returned e.message", () => {
        const createAccount = jest.fn();
        const onChange = jest.fn();
        const onUsernameChange = jest.fn(() =>
          Promise.reject(new Error(NETWORK_ERROR))
        );
        const screen = shallow(
          <CreateAccount
            createAccount={createAccount}
            onUsernameChange={onUsernameChange}
          />
        );
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
        const newValue = "new value";
        input.props.onChange(newValue);
        return Promise.resolve()
          .then()
          .then(() => {
            expect(onChange).toHaveBeenCalledWith("1", {
              username: newValue,
              validationLoading: false,
              error: NETWORK_ERROR
            });
          });
      });
    });
    describe("when onUsernameChange resolves with message", () => {
      it("calls onChange with id 1 and sets error to message", () => {
        const createAccount = jest.fn();
        const onChange = jest.fn();
        const onUsernameChange = jest.fn(() =>
          Promise.resolve(NON_UNIQUE_USERNAME)
        );
        const screen = shallow(
          <CreateAccount
            createAccount={createAccount}
            onUsernameChange={onUsernameChange}
          />
        );
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
        const newValue = "new value";
        input.props.onChange(newValue);
        return Promise.resolve().then(() => {
          expect(onChange).toHaveBeenCalledWith("1", {
            username: newValue,
            validationLoading: false,
            error: NON_UNIQUE_USERNAME
          });
        });
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
    it("has id 2", () => {
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
      expect(input.props.id).toBe("2");
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
    it("has value equal to values[1].value.email", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const email = "email@example.com";
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: { email } },
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
    it("has isError equal to !!values[1].value.error", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const email = "email@example.com";
      const error = NETWORK_ERROR;
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: { email, error } },
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
    it("has errorText equal to values[1].value.error", () => {
      const createAccount = jest.fn();
      const onChange = jest.fn();
      const screen = shallow(<CreateAccount createAccount={createAccount} />);
      const email = "email@example.com";
      const error = NETWORK_ERROR;
      const form = screen.find("Form").prop("children")(
        [
          { id: "1", value: false },
          { id: "2", value: { email, error } },
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
    describe("onChange", () => {
      it("calls onChange with 2, new value and validationLoading true", () => {
        const createAccount = jest.fn();
        const onChange = jest.fn();
        const onEmailChange = jest.fn(() => Promise.resolve());
        const screen = shallow(
          <CreateAccount
            createAccount={createAccount}
            onEmailChange={onEmailChange}
          />
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
        expect(onChange).toHaveBeenCalledWith("2", {
          email: newValue,
          validationLoading: true,
          error: ""
        });
      });
      it("calls onEmailChange with the new value", () => {
        const createAccount = jest.fn();
        const onChange = jest.fn();
        const onEmailChange = jest.fn(() => Promise.resolve());
        const screen = shallow(
          <CreateAccount
            createAccount={createAccount}
            onEmailChange={onEmailChange}
          />
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
        expect(onEmailChange).toHaveBeenCalledWith(newValue);
      });
      describe("when onEmailChange rejects", () => {
        it("calls onChange with 2 and error with error message", () => {
          const createAccount = jest.fn();
          const onChange = jest.fn();
          const onEmailChange = jest.fn(() =>
            Promise.reject(new Error(NETWORK_ERROR))
          );
          const screen = shallow(
            <CreateAccount
              createAccount={createAccount}
              onEmailChange={onEmailChange}
            />
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
          return Promise.resolve()
            .then()
            .then(() => {
              expect(onChange).toHaveBeenCalledWith("2", {
                email: newValue,
                validationLoading: false,
                error: NETWORK_ERROR
              });
            });
        });
      });
      describe("when onEmailChange resolves with message", () => {
        it("calls onChange with 2, new value and sets error to the message", () => {
          const createAccount = jest.fn();
          const onChange = jest.fn();
          const onEmailChange = jest.fn(() =>
            Promise.resolve(NON_UNIQUE_EMAIL)
          );
          const screen = shallow(
            <CreateAccount
              createAccount={createAccount}
              onEmailChange={onEmailChange}
            />
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
          return Promise.resolve().then(() => {
            expect(onChange).toHaveBeenCalledWith("2", {
              email: newValue,
              validationLoading: false,
              error: NON_UNIQUE_EMAIL
            });
          });
        });
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
