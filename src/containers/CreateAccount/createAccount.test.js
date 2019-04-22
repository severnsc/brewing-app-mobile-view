import React from "react";
import CreateAccount, { CreateAccountContainer } from ".";
import { AlertIOS } from "react-native";
import { shallow } from "enzyme";
import { graphql, compose } from "react-apollo";
import { CREATE_USER } from "../../graphql";
import {
  NETWORK_ERROR,
  NON_UNIQUE_USERNAME,
  NON_UNIQUE_EMAIL,
  NON_MATCHING_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  DASHBOARD
} from "../../constants";
import {
  validateUsername,
  validateEmail,
  validatePassword,
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
  it("sets username prop on screen to username state", () => {
    const createAccountContainer = shallow(
      <CreateAccountContainer mutate={jest.fn()} />
    );
    createAccountContainer.setState({ username: "username" });
    createAccountContainer.update();
    const createAccountScreen = createAccountContainer.find("CreateAccount");
    expect(createAccountScreen.prop("username")).toBe(
      createAccountContainer.state("username")
    );
  });
  it("sets usernameError prop on screen to usernameError state", () => {
    const createAccountContainer = shallow(
      <CreateAccountContainer mutate={jest.fn()} />
    );
    createAccountContainer.setState({ usernameError: "usernameError" });
    createAccountContainer.update();
    const createAccountScreen = createAccountContainer.find("CreateAccount");
    expect(createAccountScreen.prop("usernameError")).toBe(
      createAccountContainer.state("usernameError")
    );
  });
  it("sets usernameLoading prop on screen to usernameLoading state", () => {
    const createAccountContainer = shallow(
      <CreateAccountContainer mutate={jest.fn()} />
    );
    createAccountContainer.setState({ usernameLoading: true });
    createAccountContainer.update();
    const createAccountScreen = createAccountContainer.find("CreateAccount");
    expect(createAccountScreen.prop("usernameLoading")).toBe(
      createAccountContainer.state("usernameLoading")
    );
  });
  it("sets email prop on screen to email state", () => {
    const createAccountContainer = shallow(
      <CreateAccountContainer mutate={jest.fn()} />
    );
    let createAccountScreen = createAccountContainer.find("CreateAccount");
    createAccountContainer.setState({ email: "email" });
    createAccountContainer.update();
    createAccountScreen = createAccountContainer.find("CreateAccount");
    expect(createAccountScreen.prop("email")).toBe(
      createAccountContainer.state("email")
    );
  });
  it("sets emailError prop on screen to emailError state", () => {
    const createAccountContainer = shallow(
      <CreateAccountContainer mutate={jest.fn()} />
    );
    let createAccountScreen = createAccountContainer.find("CreateAccount");
    createAccountContainer.setState({ emailError: "emailError" });
    createAccountContainer.update();
    createAccountScreen = createAccountContainer.find("CreateAccount");
    expect(createAccountScreen.prop("emailError")).toBe(
      createAccountContainer.state("emailError")
    );
  });
  it("sets emailLoading prop on screen to emailLoading state", () => {
    const createAccountContainer = shallow(
      <CreateAccountContainer mutate={jest.fn()} />
    );
    let createAccountScreen = createAccountContainer.find("CreateAccount");
    createAccountContainer.setState({ emailLoading: true });
    createAccountContainer.update();
    createAccountScreen = createAccountContainer.find("CreateAccount");
    expect(createAccountScreen.prop("emailLoading")).toBe(
      createAccountContainer.state("emailLoading")
    );
  });
  it("sets password prop on screen to password state", () => {
    const createAccountContainer = shallow(
      <CreateAccountContainer mutate={jest.fn()} />
    );
    let createAccountScreen = createAccountContainer.find("CreateAccount");
    createAccountContainer.setState({ password: "password" });
    createAccountContainer.update();
    createAccountScreen = createAccountContainer.find("CreateAccount");
    expect(createAccountScreen.prop("password")).toBe(
      createAccountContainer.state("password")
    );
  });
  it("sets passwordError prop on screen to passwordError state", () => {
    const createAccountContainer = shallow(
      <CreateAccountContainer mutate={jest.fn()} />
    );
    let createAccountScreen = createAccountContainer.find("CreateAccount");
    createAccountContainer.setState({ passwordError: "passwordError" });
    createAccountContainer.update();
    createAccountScreen = createAccountContainer.find("CreateAccount");
    expect(createAccountScreen.prop("passwordError")).toBe(
      createAccountContainer.state("passwordError")
    );
  });
  it("sets confirmPassword prop on screen to confirmPassword state", () => {
    const createAccountContainer = shallow(
      <CreateAccountContainer mutate={jest.fn()} />
    );
    let createAccountScreen = createAccountContainer.find("CreateAccount");
    createAccountContainer.setState({ confirmPassword: "confirmPassword" });
    createAccountContainer.update();
    createAccountScreen = createAccountContainer.find("CreateAccount");
    expect(createAccountScreen.prop("confirmPassword")).toBe(
      createAccountContainer.state("confirmPassword")
    );
  });
  it("sets createAccountLoading prop on screen to createAccountLoading state", () => {
    const createAccountContainer = shallow(
      <CreateAccountContainer mutate={jest.fn()} />
    );
    let createAccountScreen = createAccountContainer.find("CreateAccount");
    createAccountContainer.setState({ createAccountLoading: true });
    createAccountContainer.update();
    createAccountScreen = createAccountContainer.find("CreateAccount");
    expect(createAccountScreen.prop("createAccountLoading")).toBe(
      createAccountContainer.state("createAccountLoading")
    );
  });
  describe("validateUsername", () => {
    describe("when usernameError state is non-null", () => {
      describe("when given valid username", () => {
        it("sets the usernameError state to null", () => {
          validateUsername.mockImplementationOnce(() => Promise.resolve(true));
          const createAccountContainer = shallow(
            <CreateAccountContainer mutate={jest.fn()} />
          );
          createAccountContainer.setState({
            usernameError: NON_UNIQUE_USERNAME
          });
          return createAccountContainer
            .instance()
            .validateUsername("")
            .then(() => {
              expect(createAccountContainer.state("usernameError")).toBe(null);
            });
        });
      });
    });
  });
  describe("setUsername", () => {
    it("sets the username state to the new value", () => {
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={jest.fn()} />
      );
      const createAccountScreen = createAccountContainer.find("CreateAccount");
      const username = "username";
      createAccountScreen.props().setUsername(username);
      expect(createAccountContainer.state("username")).toBe(username);
    });
    it("sets the usernameLoading state to true", () => {
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={jest.fn()} />
      );
      const createAccountScreen = createAccountContainer.find("CreateAccount");
      const username = "username";
      createAccountScreen.props().setUsername(username);
      expect(createAccountContainer.state("usernameLoading")).toBe(true);
    });
    it("calls validateUsername with the username", () => {
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={jest.fn()} />
      );
      const createAccountScreen = createAccountContainer.find("CreateAccount");
      const username = "username";
      createAccountScreen.props().setUsername(username);
      expect(validateUsername).toHaveBeenCalledWith(username);
    });
    describe("when validateUsername rejects", () => {
      it("sets usernameError state to NETWORK_ERROR message", () => {
        validateUsername.mockImplementationOnce(() => Promise.reject());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={jest.fn()} />
        );
        const createAccountScreen = createAccountContainer.find(
          "CreateAccount"
        );
        const username = "username";
        createAccountScreen.props().setUsername(username);
        return Promise.resolve()
          .then()
          .then(() => {
            createAccountContainer.update();
            expect(createAccountContainer.state("usernameError")).toBe(
              NETWORK_ERROR
            );
          });
      });
      it("sets usernameLoading state to false", () => {
        validateUsername.mockImplementationOnce(() => Promise.reject());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={jest.fn()} />
        );
        const createAccountScreen = createAccountContainer.find(
          "CreateAccount"
        );
        const username = "username";
        return createAccountScreen
          .props()
          .setUsername(username)
          .then(() => {
            createAccountContainer.update();
            expect(createAccountContainer.state("usernameLoading")).toBe(false);
          });
      });
    });
    describe("when validateUsername resolves", () => {
      describe("with false", () => {
        it("sets usernameError state to a NON_UNIQUE_USERNAME message", () => {
          validateUsername.mockImplementationOnce(() => Promise.resolve(false));
          const createAccountContainer = shallow(
            <CreateAccountContainer mutate={jest.fn()} />
          );
          const createAccountScreen = createAccountContainer.find(
            "CreateAccount"
          );
          const username = "username";
          createAccountScreen.props().setUsername(username);
          return Promise.resolve().then(() => {
            expect(createAccountContainer.state("usernameError")).toBe(
              NON_UNIQUE_USERNAME
            );
          });
        });
        it("sets usernameLoading state to false", () => {
          validateUsername.mockImplementationOnce(() => Promise.resolve(false));
          const createAccountContainer = shallow(
            <CreateAccountContainer mutate={jest.fn()} />
          );
          const createAccountScreen = createAccountContainer.find(
            "CreateAccount"
          );
          const username = "username";
          return createAccountScreen
            .props()
            .setUsername(username)
            .then(() => {
              expect(createAccountContainer.state("usernameLoading")).toBe(
                false
              );
            });
        });
      });
      describe("with true", () => {
        it("sets usernameError state to null", () => {
          validateUsername.mockImplementationOnce(() => Promise.resolve(true));
          const createAccountContainer = shallow(
            <CreateAccountContainer mutate={jest.fn()} />
          );
          const createAccountScreen = createAccountContainer.find(
            "CreateAccount"
          );
          const username = "username";
          createAccountScreen.props().setUsername(username);
          return Promise.resolve().then(() => {
            expect(createAccountContainer.state("usernameError")).toBe(null);
          });
        });
        it("sets usernameLoading state to false", () => {
          validateUsername.mockImplementationOnce(() => Promise.resolve(true));
          const createAccountContainer = shallow(
            <CreateAccountContainer mutate={jest.fn()} />
          );
          const createAccountScreen = createAccountContainer.find(
            "CreateAccount"
          );
          const username = "username";
          return createAccountScreen
            .props()
            .setUsername(username)
            .then(() => {
              expect(createAccountContainer.state("usernameLoading")).toBe(
                false
              );
            });
        });
      });
    });
  });
  describe("setEmail", () => {
    it("sets email state with new value", () => {
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={jest.fn()} />
      );
      const createAccountScreen = createAccountContainer.find("CreateAccount");
      const email = "email@example.com";
      createAccountScreen.props().setEmail(email);
      expect(createAccountContainer.state("email")).toBe(email);
    });
    it("sets emailLoading state to true", () => {
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={jest.fn()} />
      );
      const spy = jest.spyOn(createAccountContainer.instance(), "setState");
      const createAccountScreen = createAccountContainer.find("CreateAccount");
      const email = "email@example.com";
      createAccountScreen.props().setEmail(email);
      expect(spy).toHaveBeenCalledWith({ email, emailLoading: true });
    });
    it("calls validateEmail with the email", () => {
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={jest.fn()} />
      );
      const createAccountScreen = createAccountContainer.find("CreateAccount");
      const email = "email@example.com";
      createAccountScreen.props().setEmail(email);
      expect(validateEmail).toHaveBeenCalledWith(email);
    });
    describe("when validateEmail returns false", () => {
      it("updates state", () => {
        validateEmail.mockImplementationOnce(() => false);
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={jest.fn()} />
        );
        const createAccountScreen = createAccountContainer.find(
          "CreateAccount"
        );
        const email = "email@example.com";
        return createAccountScreen
          .props()
          .setEmail(email)
          .then(() => {
            const state = createAccountContainer.state();
            expect(state.emailError).toBe(INVALID_EMAIL);
            expect(state.emailLoading).toBe(false);
          });
      });
    });
    describe("when validateEmail returns true", () => {
      it("calls isEmailUnique with the email", () => {
        validateEmail.mockImplementationOnce(() => true);
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={jest.fn()} />
        );
        const createAccountScreen = createAccountContainer.find(
          "CreateAccount"
        );
        const email = "email@example.com";
        createAccountScreen.props().setEmail(email);
        expect(isEmailUnique).toHaveBeenCalledWith(email);
      });
      describe("when isEmailUnique rejects", () => {
        it("updates the state", () => {
          isEmailUnique.mockImplementationOnce(() =>
            Promise.reject(new Error(NETWORK_ERROR))
          );
          validateEmail.mockImplementationOnce(() => true);
          const createAccountContainer = shallow(
            <CreateAccountContainer mutate={jest.fn()} />
          );
          const createAccountScreen = createAccountContainer.find(
            "CreateAccount"
          );
          const email = "email@example.com";
          return createAccountScreen
            .props()
            .setEmail(email)
            .then(() => {
              const state = createAccountContainer.state();
              expect(state.emailError).toBe(NETWORK_ERROR);
              expect(state.emailLoading).toBe(false);
            });
        });
      });
      describe("when isEmailUnique resolves to false", () => {
        it("updates the state", () => {
          isEmailUnique.mockImplementationOnce(() => Promise.resolve(false));
          validateEmail.mockImplementationOnce(() => true);
          const createAccountContainer = shallow(
            <CreateAccountContainer mutate={jest.fn()} />
          );
          const createAccountScreen = createAccountContainer.find(
            "CreateAccount"
          );
          const email = "email@example.com";
          return createAccountScreen
            .props()
            .setEmail(email)
            .then(() => {
              const state = createAccountContainer.state();
              expect(state.emailError).toBe(NON_UNIQUE_EMAIL);
              expect(state.emailLoading).toBe(false);
            });
        });
      });
      describe("when isEmailUnique resolves to true", () => {
        it("updates the state", () => {
          isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
          validateEmail.mockImplementationOnce(() => true);
          const createAccountContainer = shallow(
            <CreateAccountContainer mutate={jest.fn()} />
          );
          const createAccountScreen = createAccountContainer.find(
            "CreateAccount"
          );
          const email = "email@example.com";
          return createAccountScreen
            .props()
            .setEmail(email)
            .then(() => {
              const state = createAccountContainer.state();
              expect(state.emailError).toBe(null);
              expect(state.emailLoading).toBe(false);
            });
        });
      });
    });
  });
  describe("setPassword", () => {
    it("sets password state to the new value", () => {
      const mutate = jest.fn();
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={mutate} />
      );
      const password = "password";
      const createAccountScreen = createAccountContainer.find("CreateAccount");
      createAccountScreen.props().setPassword(password);
      expect(createAccountContainer.state("password")).toBe(password);
    });
    it("calls validatePassword with the new value", () => {
      const mutate = jest.fn();
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={mutate} />
      );
      const password = "password";
      const createAccountScreen = createAccountContainer.find("CreateAccount");
      createAccountScreen.props().setPassword(password);
      expect(validatePassword).toHaveBeenCalledWith(password);
    });
    describe("when validatePassword returns false", () => {
      it("sets the passwordError state to INVALID_PASSWORD", () => {
        validatePassword.mockImplementationOnce(() => false);
        const mutate = jest.fn();
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const password = "password";
        const createAccountScreen = createAccountContainer.find(
          "CreateAccount"
        );
        createAccountScreen.props().setPassword(password);
        expect(createAccountContainer.state("passwordError")).toBe(
          INVALID_PASSWORD
        );
      });
    });
    describe("when validatePassword returns true", () => {
      it("sets the passwordError state to null", () => {
        validatePassword.mockImplementationOnce(() => true);
        const mutate = jest.fn();
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const password = "password";
        const createAccountScreen = createAccountContainer.find(
          "CreateAccount"
        );
        createAccountScreen.props().setPassword(password);
        expect(createAccountContainer.state("passwordError")).toBe(null);
      });
    });
  });
  describe("setConfirmPassword", () => {
    it("sets the confirmPassword state with the new value", () => {
      const mutate = jest.fn();
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={mutate} />
      );
      const confirmPassword = "password";
      const createAccountScreen = createAccountContainer.find("CreateAccount");
      createAccountScreen.props().setConfirmPassword(confirmPassword);
      expect(createAccountContainer.state("confirmPassword")).toBe(
        confirmPassword
      );
    });
  });
  describe("createAccount", () => {
    it("sets the createAccountLoading state to true", () => {
      const mutate = jest.fn(() => Promise.resolve());
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={mutate} />
      );
      createAccountContainer.instance().createAccount();
      expect(createAccountContainer.state("createAccountLoading")).toBe(true);
    });
    it("calls validateUsername with the current username value", () => {
      validateUsername.mockClear();
      const mutate = jest.fn(() => Promise.resolve());
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={mutate} />
      );
      const username = "username";
      createAccountContainer.setState({
        username
      });
      createAccountContainer.instance().createAccount();
      expect(validateUsername).toHaveBeenCalledWith(username);
    });
    describe("when validateUsername rejects", () => {
      validateUsername.mockClear();
      validateUsername.mockImplementationOnce(() => Promise.reject());
      const mutate = jest.fn(() => Promise.resolve());
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={mutate} />
      );
      createAccountContainer.instance().createAccount();
      it("does not call mutate", () => {
        return Promise.resolve().then(() => {
          expect(mutate).not.toHaveBeenCalled();
        });
      });
      it("sets createAccountError state to NETWORK_ERROR message", () => {
        return Promise.resolve().then(() => {
          expect(createAccountContainer.state("usernameError")).toBe(
            NETWORK_ERROR
          );
        });
      });
      it("sets createAccountLoading state to false", () => {
        return Promise.resolve().then(() => {
          expect(createAccountContainer.state("createAccountLoading")).toBe(
            false
          );
        });
      });
    });
    describe("when validateUsername fulfills with false", () => {
      validateUsername.mockClear();
      validateUsername.mockImplementationOnce(() => Promise.resolve(false));
      const mutate = jest.fn(() => Promise.resolve());
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={mutate} />
      );
      createAccountContainer.instance().createAccount();
      it("does not call mutate", () => {
        return Promise.resolve().then(() => {
          expect(mutate).not.toHaveBeenCalled();
        });
      });
      it("sets createAccountError state to NON_UNIQUE_USERNAME message", () => {
        return Promise.resolve().then(() => {
          expect(createAccountContainer.state("usernameError")).toBe(
            NON_UNIQUE_USERNAME
          );
        });
      });
      it("sets createAccountLoading state to false", () => {
        return Promise.resolve().then(() => {
          expect(createAccountContainer.state("createAccountLoading")).toBe(
            false
          );
        });
      });
    });
    it("calls validateEmail with the email value", () => {
      validateEmail.mockClear();
      validateUsername.mockImplementationOnce(() => Promise.resolve(true));
      const mutate = jest.fn(() => Promise.resolve());
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={mutate} />
      );
      const email = "email@me.com";
      createAccountContainer.setState({ email });
      createAccountContainer.instance().createAccount();
      return Promise.resolve()
        .then()
        .then(() => {
          expect(validateEmail).toHaveBeenCalledWith(email);
        });
    });
    describe("when validateEmail returns false", () => {
      it("sets createAccountError state to INVALID_EMAIL", () => {
        validateEmail.mockClear();
        validateEmail.mockImplementationOnce(() => false);
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const email = "email@me.com";
        createAccountContainer.setState({ email });
        return createAccountContainer
          .instance()
          .createAccount()
          .then(() => {
            expect(createAccountContainer.state("emailError")).toBe(
              INVALID_EMAIL
            );
          });
      });
      it("sets createAccountLoading state to false", () => {
        validateEmail.mockClear();
        validateEmail.mockImplementationOnce(() => false);
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const email = "email@me.com";
        createAccountContainer.setState({ email });
        return createAccountContainer
          .instance()
          .createAccount()
          .then(() => {
            expect(createAccountContainer.state("emailError")).toBe(
              INVALID_EMAIL
            );
          });
      });
      it("does not call mutate", () => {
        validateEmail.mockClear();
        validateEmail.mockImplementationOnce(() => false);
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const email = "email@me.com";
        createAccountContainer.setState({ email });
        createAccountContainer.instance().createAccount();
        return Promise.resolve()
          .then()
          .then(() => {
            expect(mutate).not.toHaveBeenCalled();
          });
      });
    });
    it("calls isEmailUnique with the email value", () => {
      isEmailUnique.mockClear();
      validateUsername.mockImplementationOnce(() => Promise.resolve(true));
      validateEmail.mockImplementationOnce(() => true);
      const mutate = jest.fn(() => Promise.resolve());
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={mutate} />
      );
      const email = "email@me.com";
      createAccountContainer.setState({ email });
      createAccountContainer.instance().createAccount();
      return Promise.resolve()
        .then()
        .then(() => {
          expect(isEmailUnique).toHaveBeenCalledWith(email);
        });
    });
    describe("when isEmailUnique rejects", () => {
      it("does not call mutate", () => {
        isEmailUnique.mockClear();
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.reject());
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const email = "email@me.com";
        createAccountContainer.setState({ email });
        return createAccountContainer
          .instance()
          .createAccount()
          .then(() => {
            expect(mutate).not.toHaveBeenCalled();
          });
      });
      it("sets createAccountError to NETWORK_ERROR", () => {
        isEmailUnique.mockClear();
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.reject());
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const email = "email@me.com";
        createAccountContainer.setState({ email });
        return createAccountContainer
          .instance()
          .createAccount()
          .then(() => {
            expect(createAccountContainer.state("emailError")).toBe(
              NETWORK_ERROR
            );
          });
      });
      it("sets createAccountLoading to false", () => {
        isEmailUnique.mockClear();
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.reject());
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const email = "email@me.com";
        createAccountContainer.setState({ email });
        return createAccountContainer
          .instance()
          .createAccount()
          .then(() => {
            expect(createAccountContainer.state("createAccountLoading")).toBe(
              false
            );
          });
      });
    });
    describe("when isEmailUnique returns false", () => {
      it("does not call mutate", () => {
        isEmailUnique.mockClear();
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(false));
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const email = "email@me.com";
        createAccountContainer.setState({ email });
        return createAccountContainer
          .instance()
          .createAccount()
          .then(() => {
            expect(mutate).not.toHaveBeenCalled();
          });
      });
      it("sets emailError state to NON_UNIQUE_EMAIL message", () => {
        isEmailUnique.mockClear();
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(false));
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const email = "email@me.com";
        createAccountContainer.setState({ email });
        return createAccountContainer
          .instance()
          .createAccount()
          .then(() => {
            expect(createAccountContainer.state("emailError")).toBe(
              NON_UNIQUE_EMAIL
            );
          });
      });
      it("sets createAccountLoading state to false", () => {
        isEmailUnique.mockClear();
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(false));
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const email = "email@me.com";
        createAccountContainer.setState({ email });
        return createAccountContainer
          .instance()
          .createAccount()
          .then(() => {
            expect(createAccountContainer.state("createAccountLoading")).toBe(
              false
            );
          });
      });
    });
    it("calls validatePassword with the password value", () => {
      validatePassword.mockClear();
      validateUsername.mockImplementationOnce(() => Promise.resolve(true));
      validateEmail.mockImplementationOnce(() => true);
      isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
      const mutate = jest.fn(() => Promise.resolve());
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={mutate} />
      );
      const password = "password";
      createAccountContainer.setState({ password });
      return createAccountContainer
        .instance()
        .createAccount()
        .then(() => {
          expect(validatePassword).toHaveBeenCalledWith(password);
        });
    });
    describe("when validatePassword returns false", () => {
      it("does not call mutate", () => {
        validatePassword.mockImplementationOnce(() => false);
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const password = "password";
        const confirmPassword = password;
        createAccountContainer.setState({ password, confirmPassword });
        return createAccountContainer
          .instance()
          .createAccount()
          .then(() => {
            expect(mutate).not.toHaveBeenCalled();
          });
      });
      it("sets passwordError state to INVALID_PASSWORD message", () => {
        validatePassword.mockImplementationOnce(() => false);
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const password = "password";
        const confirmPassword = password;
        createAccountContainer.setState({ password, confirmPassword });
        return createAccountContainer
          .instance()
          .createAccount()
          .then(() => {
            expect(createAccountContainer.state("passwordError")).toBe(
              INVALID_PASSWORD
            );
          });
      });
      it("sets createAccountLoading state to false", () => {
        validatePassword.mockImplementationOnce(() => false);
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const password = "password";
        const confirmPassword = password;
        createAccountContainer.setState({ password, confirmPassword });
        return createAccountContainer
          .instance()
          .createAccount()
          .then(() => {
            expect(createAccountContainer.state("createAccountLoading")).toBe(
              false
            );
          });
      });
    });
    describe("when password !== confirmPassword", () => {
      it("does not call mutate", () => {
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        createAccountContainer.setState({ confirmPassword: "bad" });
        const createAccountScreen = createAccountContainer.find(
          "CreateAccount"
        );
        return createAccountScreen
          .props()
          .createAccount()
          .then(() => {
            expect(mutate).not.toHaveBeenCalled();
          });
      });
      it("sets createAccountError state to NON_MATCHING_PASSWORD", () => {
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
        validatePassword.mockImplementationOnce(() => true);
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        createAccountContainer.setState({ confirmPassword: "bad" });
        const createAccountScreen = createAccountContainer.find(
          "CreateAccount"
        );
        return createAccountScreen
          .props()
          .createAccount()
          .then(() => {
            expect(createAccountContainer.state("createAccountError")).toBe(
              NON_MATCHING_PASSWORD
            );
          });
      });
      it("sets createAccountLoading state to false", () => {
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
        validatePassword.mockImplementationOnce(() => true);
        const mutate = jest.fn(() => Promise.resolve());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        createAccountContainer.setState({ confirmPassword: "bad" });
        const createAccountScreen = createAccountContainer.find(
          "CreateAccount"
        );
        return createAccountScreen
          .props()
          .createAccount()
          .then(() => {
            expect(createAccountContainer.state("createAccountLoading")).toBe(
              false
            );
          });
      });
    });
    it("calls mutate prop with username, email, password and cofirmPassword state", () => {
      validateUsername.mockImplementationOnce(() => Promise.resolve(true));
      validateEmail.mockImplementationOnce(() => true);
      isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
      validatePassword.mockImplementationOnce(() => true);
      const mutate = jest.fn(() => Promise.resolve());
      const createAccountContainer = shallow(
        <CreateAccountContainer mutate={mutate} />
      );
      const username = "username";
      const email = "email";
      const password = "password";
      const confirmPassword = "password";
      createAccountContainer.setState({
        username,
        email,
        password,
        confirmPassword
      });
      return createAccountContainer
        .instance()
        .createAccount()
        .then(() => {
          expect(mutate).toHaveBeenCalledWith({
            variables: {
              user: {
                username,
                email,
                password,
                confirmPassword
              }
            }
          });
        });
    });
    describe("when mutate rejects", () => {
      it("sets createAccountError state to NETWORK_ERROR", () => {
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
        validatePassword.mockImplementationOnce(() => true);
        const mutate = jest.fn(() => Promise.reject());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const username = "username";
        const email = "email";
        const password = { id: "1", value: "password" };
        const confirmPassword = { id: "2", value: "password" };
        const createAccountScreen = createAccountContainer.find(
          "CreateAccount"
        );
        return createAccountScreen
          .props()
          .createAccount({ username }, { email }, password, confirmPassword)
          .then(() => {
            expect(createAccountContainer.state("createAccountError")).toBe(
              NETWORK_ERROR
            );
          });
      });
      it("sets createAccountLoading state to false", () => {
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
        validatePassword.mockImplementationOnce(() => true);
        const mutate = jest.fn(() => Promise.reject());
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const username = "username";
        const email = "email";
        const password = { id: "1", value: "password" };
        const confirmPassword = { id: "2", value: "password" };
        const createAccountScreen = createAccountContainer.find(
          "CreateAccount"
        );
        return createAccountScreen
          .props()
          .createAccount({ username }, { email }, password, confirmPassword)
          .then(() => {
            expect(createAccountContainer.state("createAccountLoading")).toBe(
              false
            );
          });
      });
    });
    describe("when mutate returns a user with errors", () => {
      it("sets the createAccountError state to a string joined on newlines", () => {
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
        validatePassword.mockImplementationOnce(() => true);
        const mutate = jest.fn(() =>
          Promise.resolve({
            data: {
              createUser: { errors: [NON_UNIQUE_EMAIL, NON_UNIQUE_USERNAME] }
            }
          })
        );
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        const username = "username";
        const email = "email";
        const password = { id: "1", value: "password" };
        const confirmPassword = { id: "2", value: "password" };
        const createAccountScreen = createAccountContainer.find(
          "CreateAccount"
        );
        return createAccountScreen
          .props()
          .createAccount({ username }, { email }, password, confirmPassword)
          .then(() => {
            expect(createAccountContainer.state("createAccountError")).toBe(
              [NON_UNIQUE_EMAIL, NON_UNIQUE_USERNAME].join("\n")
            );
          });
      });
      it("sets the createAccountLoading state to false", () => {
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
        validatePassword.mockImplementationOnce(() => true);
        const mutate = jest.fn(() =>
          Promise.resolve({
            data: {
              createUser: { errors: [NON_UNIQUE_EMAIL, NON_UNIQUE_USERNAME] }
            }
          })
        );
        const createAccountContainer = shallow(
          <CreateAccountContainer mutate={mutate} />
        );
        createAccountContainer.setState({ password: "password1" });
        const createAccountScreen = createAccountContainer.find(
          "CreateAccount"
        );
        return createAccountScreen
          .props()
          .createAccount()
          .then(() => {
            expect(createAccountContainer.state("createAccountLoading")).toBe(
              false
            );
          });
      });
    });
    describe("when mutate returns a proper user", () => {
      it("calls navigation.navigate prop with DASHBOARD", () => {
        validateUsername.mockImplementationOnce(() => Promise.resolve(true));
        validateEmail.mockImplementationOnce(() => true);
        isEmailUnique.mockImplementationOnce(() => Promise.resolve(true));
        validatePassword.mockImplementationOnce(() => true);
        const username = "username";
        const email = "email";
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
          .props()
          .createAccount()
          .then(() => {
            expect(navigation.navigate).toHaveBeenCalledWith(DASHBOARD);
          });
      });
    });
  });
});
