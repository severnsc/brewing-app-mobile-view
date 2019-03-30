import userResolvers from ".";
import { GET_USER } from "../../queries";
import { CREATE_USER_REMOTE } from "../../mutations";
import {
  NETWORK_ERROR,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  NON_MATCHING_PASSWORD
} from "../../../constants/errorMessages";

const validation = require("../../../modules/validation");
jest.mock("../../../modules/validation");
describe("user resolvers", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  describe("update user", () => {
    const { updateUser } = userResolvers;
    it("returns a user with userEdit merged in", () => {
      const edit = {
        username: "username"
      };
      const user = {
        username: "",
        email: "",
        errors: []
      };
      const cache = {
        readQuery: jest.fn(() => Promise.resolve({ user })),
        writeQuery: jest.fn()
      };
      return updateUser({}, { edit }, { cache }).then(newUser => {
        expect(newUser).toEqual({
          username: "username",
          email: "",
          errors: []
        });
      });
    });
    it("calls cache.writeQuery with the new user", () => {
      const userEdit = {
        username: "username"
      };
      const user = {
        username: "",
        email: "",
        errors: []
      };
      const cache = {
        readQuery: jest.fn(() => Promise.resolve({ user })),
        writeQuery: jest.fn()
      };
      return updateUser({}, { userEdit }, { cache }).then(newUser => {
        expect(cache.writeQuery).toHaveBeenCalledWith({
          query: GET_USER,
          data: { user: newUser }
        });
      });
    });
  });
  describe("validate password", () => {
    describe("valid password", () => {
      it("returns the user", () => {
        const validatePassword = userResolvers.validatePassword;
        const password = "password";
        const user = {
          errors: []
        };
        const cache = {
          readQuery: jest.fn(() => Promise.resolve({ user })),
          writeQuery: jest.fn()
        };
        return validatePassword({}, { password }, { cache }).then(newUser => {
          expect(newUser).toEqual(user);
        });
      });
      it("removes any password errors from the user", () => {
        const validatePassword = userResolvers.validatePassword;
        const password = "password";
        const user = {
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
        };
        const cache = {
          readQuery: jest.fn(() => Promise.resolve({ user })),
          writeQuery: jest.fn()
        };
        return validatePassword({}, { password }, { cache }).then(newUser => {
          expect(newUser.errors).toEqual([]);
        });
      });
      it("leaves any non-password errors on the user", () => {
        const validatePassword = userResolvers.validatePassword;
        const password = "password";
        const user = {
          errors: [
            {
              __typename: "Error",
              message: INVALID_EMAIL,
              location: {
                __typename: "Location",
                node: "user",
                field: "email"
              }
            }
          ]
        };
        const cache = {
          readQuery: jest.fn(() => Promise.resolve({ user })),
          writeQuery: jest.fn()
        };
        return validatePassword({}, { password }, { cache }).then(newUser => {
          expect(newUser.errors).toEqual(user.errors);
        });
      });
      it("calls writeQuery with the updated user", () => {
        const validatePassword = userResolvers.validatePassword;
        const password = "password";
        const user = {
          errors: [
            {
              __typename: "Error",
              message: INVALID_EMAIL,
              location: {
                __typename: "Location",
                node: "user",
                field: "email"
              }
            }
          ]
        };
        const cache = {
          readQuery: jest.fn(() => Promise.resolve({ user })),
          writeQuery: jest.fn()
        };
        return validatePassword({}, { password }, { cache }).then(newUser => {
          expect(cache.writeQuery).toHaveBeenCalledWith({
            query: GET_USER,
            data: {
              user: newUser
            }
          });
        });
      });
    });
    describe("invalid password", () => {
      it("returns the user with an invalid password error", () => {
        const validatePassword = userResolvers.validatePassword;
        const password = "";
        const user = {
          errors: []
        };
        const error = {
          __typename: "Error",
          message: INVALID_PASSWORD,
          location: {
            __typename: "Location",
            node: "user",
            field: "password"
          }
        };
        const cache = {
          readQuery: jest.fn(() => Promise.resolve({ user })),
          writeQuery: jest.fn()
        };
        return validatePassword({}, { password }, { cache }).then(newUser => {
          expect(newUser.errors[0]).toEqual(error);
        });
      });
      it("calls writeQuery with the updated user", () => {
        const validatePassword = userResolvers.validatePassword;
        const password = "";
        const user = {
          errors: []
        };
        const cache = {
          readQuery: jest.fn(() => Promise.resolve({ user })),
          writeQuery: jest.fn()
        };
        return validatePassword({}, { password }, { cache }).then(newUser => {
          expect(cache.writeQuery).toHaveBeenCalledWith({
            query: GET_USER,
            data: {
              user: newUser
            }
          });
        });
      });
    });
  });
  describe("createUser", () => {
    const createUser = userResolvers.createUser;
    const username = "username";
    const email = "me@email.com";
    const password = "password";
    const confirmPassword = "password";
    const userInput = {
      username,
      email,
      password,
      confirmPassword
    };
    const user = {
      username: "",
      email: "",
      errors: []
    };
    const cache = {
      readQuery: jest.fn(() => Promise.resolve({ user })),
      writeQuery: jest.fn()
    };
    const client = {
      mutate: jest.fn(userInput => Promise.resolve(userInput))
    };
    const constructNetworkError = field => ({
      __typename: "Error",
      message: NETWORK_ERROR,
      location: {
        __typename: "Location",
        node: "user",
        field
      }
    });
    beforeEach(() => {
      cache.readQuery.mockClear();
      cache.writeQuery.mockClear();
      client.mutate.mockClear();
    });
    it("calls cache.readQuery with the GET_USER query", () => {
      fetch.mockResponseOnce(() => Promise.resolve({}));
      return createUser({}, { user: userInput }, { cache, client }).then(() => {
        expect(cache.readQuery).toHaveBeenCalledWith({ query: GET_USER });
      });
    });
    describe("when password is invalid", () => {
      it("returns a INVALID_PASSWORD error", () => {
        validation.validateUsername.mockImplementationOnce(() =>
          Promise.resolve(true)
        );
        validation.isEmailUnique.mockImplementationOnce(() =>
          Promise.resolve(true)
        );
        const error = {
          __typename: "Error",
          message: INVALID_PASSWORD,
          location: {
            __typename: "Location",
            node: "user",
            field: "password"
          }
        };
        return createUser(
          {},
          { user: { ...userInput, password: "short" } },
          { cache, client }
        ).then(newUser => {
          expect(newUser.errors[0]).toEqual(error);
        });
      });
    });
    describe("when confirmPassword !== password", () => {
      it("returns the user with a confirm password error", () => {
        validation.validateUsername.mockImplementationOnce(() =>
          Promise.resolve(true)
        );
        validation.isEmailUnique.mockImplementationOnce(() =>
          Promise.resolve(true)
        );
        const confirmPasswordError = {
          __typename: "Error",
          message: NON_MATCHING_PASSWORD,
          location: {
            __typename: "Location",
            node: "user",
            field: "confirmPassword"
          }
        };
        return createUser(
          {},
          { user: { ...userInput, confirmPassword: "different" } },
          { cache, client }
        ).then(newUser => {
          expect(newUser).toEqual({ ...user, errors: [confirmPasswordError] });
        });
      });
    });
    describe("when all validations pass", () => {
      describe("when mutate fails", () => {
        it("updates the user with a NETWORK_ERROR and a field of createUser", () => {
          const client = {
            mutate: jest.fn(() => Promise.reject())
          };
          validation.validateUsername.mockImplementationOnce(() =>
            Promise.resolve(true)
          );
          validation.isEmailUnique.mockImplementationOnce(() =>
            Promise.resolve(true)
          );
          const error = constructNetworkError("createUser");
          return createUser({}, { user: userInput }, { cache, client }).then(
            newUser => {
              expect(newUser.errors[0]).toEqual(error);
            }
          );
        });
      });
      it("calls client.mutate with the CREATE_USER_REMOTE mutation and the UserInput", () => {
        const client = {
          mutate: jest.fn(() => Promise.resolve())
        };
        validation.validateUsername.mockImplementationOnce(() =>
          Promise.resolve(true)
        );
        validation.isEmailUnique.mockImplementationOnce(() =>
          Promise.resolve(true)
        );
        return createUser({}, { user: userInput }, { cache, client }).then(
          () => {
            expect(client.mutate).toHaveBeenCalledWith({
              mutation: CREATE_USER_REMOTE,
              variables: {
                user: {
                  username,
                  email,
                  password
                }
              }
            });
          }
        );
      });
      describe("when client.mutate is successful", () => {
        it("calls cache.writeQuery with the results from the CREATE_USER_REMOTE mutation", () => {
          const remoteUser = {
            id: "1",
            username: "username",
            email: "email@email.com"
          };
          const client = {
            mutate: jest.fn(() =>
              Promise.resolve({ data: { createUser: remoteUser } })
            )
          };
          validation.validateUsername.mockImplementationOnce(() =>
            Promise.resolve(true)
          );
          validation.isEmailUnique.mockImplementationOnce(() =>
            Promise.resolve(true)
          );
          return createUser({}, { user: userInput }, { cache, client }).then(
            () => {
              expect(cache.writeQuery).toHaveBeenCalledWith({
                query: GET_USER,
                data: {
                  user: {
                    ...user,
                    ...remoteUser
                  }
                }
              });
            }
          );
        });
      });
    });
  });
});
