import userResolvers from ".";
import { GET_USER } from "../../queries";
import { CREATE_USER_REMOTE, UPDATE_USER } from "../../mutations";
import {
  EMPTY_USERNAME,
  NON_UNIQUE_USERNAME,
  NON_UNIQUE_EMAIL,
  NETWORK_ERROR,
  INVALID_EMAIL,
  INVALID_PASSWORD
} from "../../../constants/errorMessages";
//import console = require("console");

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
  describe("validate username", () => {
    const validateUsername = userResolvers.validateUsername;
    describe("valid username", () => {
      it("calls writeQuery with the user", () => {
        const username = "username";
        const user = {
          id: "1",
          errors: []
        };
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user
            })
          ),
          writeQuery: jest.fn()
        };
        return validateUsername({}, { username }, { cache }).then(newUser => {
          expect(cache.writeQuery).toHaveBeenCalledWith({
            data: { user },
            query: GET_USER,
            variables: {
              excludeUsername: true,
              excludeEmail: true
            }
          });
        });
      });
      it("removes any previous username errors from the user", () => {
        const username = "username";
        const user = {
          id: "1",
          errors: [
            {
              __typename: "Error",
              message: NON_UNIQUE_USERNAME,
              location: {
                __typename: "Location",
                node: "user",
                field: "username"
              }
            }
          ]
        };
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user
            })
          ),
          writeQuery: jest.fn()
        };
        return validateUsername({}, { username }, { cache }).then(newUser => {
          expect(cache.writeQuery).toHaveBeenCalledWith({
            data: {
              user: {
                ...user,
                errors: []
              }
            },
            query: GET_USER,
            variables: {
              excludeUsername: true,
              excludeEmail: true
            }
          });
        });
      });
      it("leaves any non-username errors attached to the user", () => {
        const username = "username";
        const user = {
          id: "1",
          errors: [
            {
              __typename: "Error",
              message: NON_UNIQUE_EMAIL,
              location: {
                __typename: "Location",
                node: "user",
                field: "email"
              }
            }
          ]
        };
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user
            })
          ),
          writeQuery: jest.fn()
        };
        return validateUsername({}, { username }, { cache }).then(newUser => {
          expect(newUser.errors).toEqual(user.errors);
        });
      });
    });
    describe("empty username", () => {
      it("updates errors with a EMPTY_USERNAME error", () => {
        const username = "";
        const error = {
          __typename: "Error",
          message: EMPTY_USERNAME,
          location: {
            __typename: "Location",
            node: "user",
            field: "username"
          }
        };
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user: {
                id: "1",
                errors: []
              }
            })
          ),
          writeQuery: jest.fn()
        };
        return validateUsername({}, { username }, { cache }).then(newUser => {
          expect(newUser.errors[0]).toEqual(error);
        });
      });
      it("calls cache.writeQuery with the updated user", () => {
        const username = "";
        const error = {
          __typename: "Error",
          message: EMPTY_USERNAME,
          location: {
            __typename: "Location",
            node: "user",
            field: "username"
          }
        };
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user: {
                id: "1",
                errors: []
              }
            })
          ),
          writeQuery: jest.fn()
        };
        return validateUsername({}, { username }, { cache }).then(newUser => {
          expect(cache.writeQuery).toHaveBeenCalledWith({
            query: GET_USER,
            variables: { excludeUsername: true, excludeEmail: true },
            data: { user: newUser }
          });
        });
      });
    });
    describe("invalid username", () => {
      it("updates errors with an invalid username error", () => {
        fetch.mockResponseOnce(JSON.stringify(false));
        const username = "taken";
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user: {
                id: "1",
                errors: []
              }
            })
          ),
          writeQuery: jest.fn()
        };
        const error = {
          __typename: "Error",
          message: NON_UNIQUE_USERNAME,
          location: {
            __typename: "Location",
            node: "user",
            field: "username"
          }
        };
        return validateUsername({}, { username }, { cache }).then(user => {
          expect(user.errors).toEqual([error]);
        });
      });
      it("calls writeQuery with the updated user", () => {
        fetch.mockResponseOnce(JSON.stringify(false));
        const username = "taken";
        const user = {
          id: "1",
          errors: []
        };
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user
            })
          ),
          writeQuery: jest.fn()
        };
        const error = {
          __typename: "Error",
          message: NON_UNIQUE_USERNAME,
          location: {
            __typename: "Location",
            node: "user",
            field: "username"
          }
        };
        return validateUsername({}, { username }, { cache }).then(newUser => {
          expect(cache.writeQuery).toHaveBeenCalledWith({
            query: GET_USER,
            data: {
              user: {
                ...user,
                errors: [...user.errors, error]
              }
            },
            variables: {
              excludeUsername: true,
              excludeEmail: true
            }
          });
        });
      });
    });
    describe("when it returns an error", () => {
      it("sets the errors to a network error", () => {
        validation.validateUsername.mockImplementationOnce(() =>
          Promise.reject(new Error())
        );
        const username = "taken";
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user: {
                id: "1",
                errors: []
              }
            })
          ),
          writeQuery: jest.fn()
        };
        const error = {
          __typename: "Error",
          message: NETWORK_ERROR,
          location: {
            __typename: "Location",
            node: "user",
            field: "username"
          }
        };
        return validateUsername({}, { username }, { cache }).then(user => {
          expect(user.errors).toEqual([error]);
        });
      });
      it("calls writeQuery with the updated user", () => {
        validation.validateUsername.mockImplementationOnce(() =>
          Promise.reject(new Error())
        );
        const username = "taken";
        const user = {
          id: "1",
          errors: []
        };
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user
            })
          ),
          writeQuery: jest.fn()
        };
        const error = {
          __typename: "Error",
          message: NETWORK_ERROR,
          location: {
            __typename: "Location",
            node: "user",
            field: "username"
          }
        };
        return validateUsername({}, { username }, { cache }).then(newUser => {
          expect(cache.writeQuery).toHaveBeenCalledWith({
            query: GET_USER,
            data: {
              user: {
                ...user,
                errors: [...user.errors, error]
              }
            },
            variables: {
              excludeUsername: true,
              excludeEmail: true
            }
          });
        });
      });
    });
  });
  describe("validate email", () => {
    const validateEmail = userResolvers.validateEmail;
    it("calls cache.readQuery with the right arguments", () => {
      fetch.mockResponseOnce(JSON.stringify(true));
      const email = "email@me.com";
      const user = {
        errors: []
      };
      const cache = {
        readQuery: jest.fn(() => Promise.resolve({ user })),
        writeQuery: jest.fn()
      };
      return validateEmail({}, { email }, { cache }).then(() => {
        expect(cache.readQuery).toHaveBeenCalledWith({
          query: GET_USER,
          variables: { excludeEmail: true, excludeUsername: true }
        });
      });
    });
    describe("valid email", () => {
      it("removes any email errors from the user", () => {
        fetch.mockResponseOnce(JSON.stringify(true));
        const email = "email@gmail.com";
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
          readQuery: jest.fn(() =>
            Promise.resolve({
              user
            })
          ),
          writeQuery: jest.fn()
        };
        return validateEmail({}, { email }, { cache }).then(user => {
          expect(cache.writeQuery).toHaveBeenCalledWith({
            data: { user: { ...user, errors: [] } },
            query: GET_USER,
            variables: { excludeEmail: true, excludeUsername: true }
          });
        });
      });
      it("leaves any non-email errors on the user", () => {
        fetch.mockResponseOnce(JSON.stringify(true));
        const email = "email@gmail.com";
        const user = {
          errors: [
            {
              __typename: "Error",
              message: NON_UNIQUE_USERNAME,
              location: {
                __typename: "Location",
                node: "user",
                field: "username"
              }
            }
          ]
        };
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user
            })
          ),
          writeQuery: jest.fn()
        };
        return validateEmail({}, { email }, { cache }).then(newUser => {
          expect(cache.writeQuery).toHaveBeenCalledWith({
            data: { user },
            query: GET_USER,
            variables: { excludeEmail: true, excludeUsername: true }
          });
        });
      });
      describe("when email is empty", () => {
        it("returns the user with an INVALID_EMAIL error", () => {
          const email = "";
          const cache = {
            readQuery: jest.fn(() =>
              Promise.resolve({
                user: {
                  id: "1",
                  errors: []
                }
              })
            ),
            writeQuery: jest.fn()
          };
          const error = {
            __typename: "Error",
            message: INVALID_EMAIL,
            location: {
              __typename: "Location",
              node: "user",
              field: "email"
            }
          };
          return validateEmail({}, { email }, { cache }).then(newUser => {
            expect(newUser.errors[0]).toEqual(error);
          });
        });
      });
      describe("when email is not unique", () => {
        it("returns the user with an email is not unique error", () => {
          fetch.mockResponseOnce(JSON.stringify(false));
          const email = "email@gmail.com";
          const cache = {
            readQuery: jest.fn(() =>
              Promise.resolve({
                user: {
                  errors: []
                }
              })
            ),
            writeQuery: jest.fn()
          };
          const error = {
            __typename: "Error",
            message: NON_UNIQUE_EMAIL,
            location: {
              __typename: "Location",
              node: "user",
              field: "email"
            }
          };
          return validateEmail({}, { email }, { cache }).then(user => {
            expect(user.errors[0]).toEqual(error);
          });
        });
        it("calls writeQuery with the updated user", () => {
          fetch.mockResponseOnce(JSON.stringify(false));
          const email = "email@gmail.com";
          const user = {
            errors: []
          };
          const error = {
            __typename: "Error",
            message: NON_UNIQUE_EMAIL,
            location: {
              __typename: "Location",
              node: "user",
              field: "email"
            }
          };
          const cache = {
            readQuery: jest.fn(() =>
              Promise.resolve({
                user
              })
            ),
            writeQuery: jest.fn()
          };
          return validateEmail({}, { email }, { cache }).then(newUser => {
            expect(cache.writeQuery).toHaveBeenCalledWith({
              query: GET_USER,
              data: {
                user: {
                  ...user,
                  errors: [...user.errors, error]
                }
              },
              variables: { excludeEmail: true, excludeUsername: true }
            });
          });
        });
      });
      describe("catching errors from fetch", () => {
        it("returns the user with a netowrk failure error", () => {
          fetch.mockReject(new Error());
          const email = "email@gmail.com";
          const user = {
            errors: []
          };
          const error = {
            __typename: "Error",
            message: NETWORK_ERROR,
            location: {
              __typename: "Location",
              node: "user",
              field: "email"
            }
          };
          const cache = {
            readQuery: jest.fn(() =>
              Promise.resolve({
                user
              })
            ),
            writeQuery: jest.fn()
          };
          return validateEmail({}, { email }, { cache }).then(newUser => {
            expect(newUser.errors[0]).toEqual(error);
          });
        });
        it("calls writeQuery with the updated user", () => {
          fetch.mockReject(new Error());
          const email = "email@gmail.com";
          const user = {
            errors: []
          };
          const error = {
            __typename: "Error",
            message: NETWORK_ERROR,
            location: {
              __typename: "Location",
              node: "user",
              field: "email"
            }
          };
          const cache = {
            readQuery: jest.fn(() =>
              Promise.resolve({
                user
              })
            ),
            writeQuery: jest.fn()
          };
          return validateEmail({}, { email }, { cache }).then(newUser => {
            expect(cache.writeQuery).toHaveBeenCalledWith({
              query: GET_USER,
              data: {
                user: {
                  ...user,
                  errors: [...user.errors, error]
                }
              },
              variables: { excludeEmail: true, excludeUsername: true }
            });
          });
        });
      });
    });
    describe("invalid email", () => {
      it("returns the user with an invalid email error", () => {
        const email = "email";
        const error = {
          __typename: "Error",
          message: INVALID_EMAIL,
          location: {
            __typename: "Location",
            node: "user",
            field: "email"
          }
        };
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user: {
                errors: []
              }
            })
          ),
          writeQuery: jest.fn()
        };
        return validateEmail({}, { email }, { cache }).then(user => {
          expect(user.errors[0]).toEqual(error);
        });
      });
      it("calls writeQuery with the updated user", () => {
        const email = "email";
        const user = {
          errors: []
        };
        const error = {
          __typename: "Error",
          message: INVALID_EMAIL,
          location: {
            __typename: "Location",
            node: "user",
            field: "email"
          }
        };
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user
            })
          ),
          writeQuery: jest.fn()
        };
        return validateEmail({}, { email }, { cache }).then(newUser => {
          expect(cache.writeQuery).toHaveBeenCalledWith({
            query: GET_USER,
            data: {
              user: {
                ...user,
                errors: [...user.errors, error]
              }
            },
            variables: { excludeEmail: true, excludeUsername: true }
          });
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
    });
    it("calls cache.readQuery with the GET_USER query", () => {
      fetch.mockResponseOnce(() => Promise.resolve({}));
      return createUser({}, { user: userInput }, { cache, client }).then(() => {
        expect(cache.readQuery).toHaveBeenCalledWith({ query: GET_USER });
      });
    });
    describe("when username is empty", () => {
      it("returns the user with a EMPTY_USERNAME error", () => {
        validation.isEmailUnique.mockImplementationOnce(() =>
          Promise.resolve(true)
        );
        const error = {
          __typename: "Error",
          message: EMPTY_USERNAME,
          location: {
            __typename: "Location",
            node: "user",
            field: "username"
          }
        };
        return createUser(
          {},
          { user: { ...userInput, username: "" } },
          { cache, client }
        ).then(newUser => {
          expect(newUser.errors[0]).toEqual(error);
        });
      });
    });
    describe("when username is invalid", () => {
      it("returns the user with a NON_UNIQUE_USERNAME error", () => {
        validation.validateUsername.mockImplementationOnce(() =>
          Promise.resolve(false)
        );
        validation.isEmailUnique.mockImplementationOnce(() =>
          Promise.resolve(true)
        );
        const error = {
          __typename: "Error",
          message: NON_UNIQUE_USERNAME,
          location: {
            __typename: "Location",
            node: "user",
            field: "username"
          }
        };
        return createUser(
          {},
          { user: { ...userInput, username: "taken" } },
          { cache, client }
        ).then(newUser => {
          expect(newUser.errors[0]).toEqual(error);
        });
      });
    });
    describe("when validateUsername returns an error", () => {
      validation.validateUsername.mockImplementationOnce(() =>
        Promise.reject()
      );
      validation.isEmailUnique.mockImplementationOnce(() =>
        Promise.resolve(true)
      );
      const error = {
        __typename: "Error",
        message: NETWORK_ERROR,
        location: {
          __typename: "Location",
          node: "user",
          field: "username"
        }
      };
      return createUser({}, { user: userInput }, { cache, client }).then(
        newUser => {
          expect(newUser.errors[0]).toEqual(error);
        }
      );
    });
    describe("when validateEmail encounters an error", () => {
      it("returns the user with a NETWORK_ERROR error", () => {
        validation.validateUsername.mockImplementationOnce(() =>
          Promise.resolve(true)
        );
        validation.isEmailUnique.mockImplementationOnce(() => Promise.reject());
        return createUser({}, { user: userInput }, { cache, client }).then(
          newUser => {
            expect(newUser.errors[0]).toEqual(constructNetworkError("email"));
          }
        );
      });
    });
    describe("when validateEmail returns false from isEmailUnique", () => {
      it("returns the user with a NON_UNIQUE_EMAIL error", () => {
        validation.validateUsername.mockImplementationOnce(() =>
          Promise.resolve(true)
        );
        validation.isEmailUnique.mockImplementationOnce(() =>
          Promise.resolve(false)
        );
        const error = {
          __typename: "Error",
          message: NON_UNIQUE_EMAIL,
          location: {
            __typename: "Location",
            node: "user",
            field: "email"
          }
        };
        return createUser({}, { user: userInput }, { cache, client }).then(
          newUser => {
            expect(newUser.errors[0]).toEqual(error);
          }
        );
      });
    });
    describe("when validateEmail returns false from validation.validateEmail", () => {
      it("returns an INVALID_EMAIL error", () => {
        validation.validateUsername.mockImplementationOnce(() =>
          Promise.resolve(true)
        );
        const error = {
          __typename: "Error",
          message: INVALID_EMAIL,
          location: {
            __typename: "Location",
            node: "user",
            field: "email"
          }
        };
        return createUser(
          {},
          { user: { ...userInput, email: "me" } },
          { cache, client }
        ).then(newUser => {
          expect(newUser.errors[0]).toEqual(error);
        });
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
      it("returns the user", () => {
        validation.validateUsername.mockImplementationOnce(() =>
          Promise.resolve(true)
        );
        validation.isEmailUnique.mockImplementationOnce(() =>
          Promise.resolve(true)
        );
        return createUser(
          {},
          { user: { ...userInput, confirmPassword: "different" } },
          { cache, client }
        ).then(newUser => {
          expect(newUser).toEqual(user);
        });
      });
    });
    describe("when all validations pass", () => {
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
                userInput: {
                  username,
                  email,
                  password
                }
              }
            });
          }
        );
      });
      it("calls cache.writeQuery with the results from the CREATE_USER_REMOTE mutation", () => {
        const remoteUser = {
          id: "1",
          username: "username",
          email: "email@email.com"
        };
        const client = {
          mutate: jest.fn(() => Promise.resolve(remoteUser))
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
