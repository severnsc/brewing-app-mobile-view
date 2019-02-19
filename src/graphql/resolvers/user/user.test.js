import userResolvers from ".";
import { GET_USER } from "../../queries";
const validation = require("../../../modules/validation");
jest.mock("../../../modules/validation");
describe("user resolvers", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  describe("validate username", () => {
    describe("valid username", () => {
      it("updates the username with the provided value", () => {
        const validateUsername = userResolvers.validateUsername;
        const username = "username";
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user: {
                username: ""
              }
            })
          ),
          writeQuery: jest.fn()
        };
        return validateUsername({}, { username }, { cache }).then(user => {
          expect(user.username).toBe(username);
        });
      });
      it("calls writeQuery with the updated user", () => {
        const validateUsername = userResolvers.validateUsername;
        const username = "username";
        const user = {
          username: ""
        };
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user
            })
          ),
          writeQuery: jest.fn()
        };
        return validateUsername({}, { username }, { cache }).then(user => {
          expect(cache.writeQuery).toHaveBeenCalledWith({
            data: {
              user: {
                ...user,
                username
              }
            },
            query: GET_USER
          });
        });
      });
    });
    describe("invalid username", () => {
      it("updates username field with the value", () => {
        fetch.mockResponseOnce(JSON.stringify(false));
        const validateUsername = userResolvers.validateUsername;
        const username = "taken";
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user: {
                username: "",
                errors: []
              }
            })
          ),
          writeQuery: jest.fn()
        };
        const error = {
          __typename: "Error",
          message: "Username is already taken! Try another username.",
          location: {
            __typename: "Location",
            node: "user",
            field: "username"
          }
        };
        return validateUsername({}, { username }, { cache }).then(user => {
          expect(user.username).toEqual(username);
        });
      });
      it("updates errors with an invalid username error", () => {
        fetch.mockResponseOnce(JSON.stringify(false));
        const validateUsername = userResolvers.validateUsername;
        const username = "taken";
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user: {
                username: "",
                errors: []
              }
            })
          ),
          writeQuery: jest.fn()
        };
        const error = {
          __typename: "Error",
          message: "Username is already taken! Try another username.",
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
        const validateUsername = userResolvers.validateUsername;
        const username = "taken";
        const user = {
          username: "",
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
          message: "Username is already taken! Try another username.",
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
                username,
                errors: [...user.errors, error]
              }
            }
          });
        });
      });
    });
    describe("when it returns an error", () => {
      it("sets the username to the username variable", () => {
        validation.validateUsername.mockImplementationOnce(() =>
          Promise.reject(new Error())
        );
        const validateUsername = userResolvers.validateUsername;
        const username = "taken";
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user: {
                username: "",
                errors: []
              }
            })
          ),
          writeQuery: jest.fn()
        };
        return validateUsername({}, { username }, { cache }).then(user => {
          expect(user.username).toEqual(username);
        });
      });
      it("sets the errors to a network error", () => {
        validation.validateUsername.mockImplementationOnce(() =>
          Promise.reject(new Error())
        );
        const validateUsername = userResolvers.validateUsername;
        const username = "taken";
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user: {
                username: "",
                errors: []
              }
            })
          ),
          writeQuery: jest.fn()
        };
        const error = {
          __typename: "Error",
          message: "There was a problem with the network. Try again.",
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
        const validateUsername = userResolvers.validateUsername;
        const username = "taken";
        const user = {
          username: "",
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
          message: "There was a problem with the network. Try again.",
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
                username,
                errors: [...user.errors, error]
              }
            }
          });
        });
      });
    });
  });
  describe("validate email", () => {
    describe("valid email", () => {
      it("returns the user with the email value updated to equal the email variable", () => {
        fetch.mockResponseOnce(JSON.stringify(true));
        const validateEmail = userResolvers.validateEmail;
        const email = "email@gmail.com";
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user: {
                email: ""
              }
            })
          ),
          writeQuery: jest.fn()
        };
        return validateEmail({}, { email }, { cache }).then(user => {
          expect(user.email).toBe(email);
        });
      });
      it("calls writeQuery with the updated user", () => {
        fetch.mockResponseOnce(JSON.stringify(true));
        const validateEmail = userResolvers.validateEmail;
        const email = "email@gmail.com";
        const user = {
          email: ""
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
            data: { user: { ...user, email } },
            query: GET_USER
          });
        });
      });
      describe("when email is not unique", () => {
        it("returns the user with an email is not unique error", () => {
          fetch.mockResponseOnce(JSON.stringify(false));
          const validateEmail = userResolvers.validateEmail;
          const email = "email@gmail.com";
          const cache = {
            readQuery: jest.fn(() =>
              Promise.resolve({
                user: {
                  email: "",
                  errors: []
                }
              })
            ),
            writeQuery: jest.fn()
          };
          const error = {
            __typename: "Error",
            message: "Email is already taken! Try another email.",
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
        it("returns the user with the email value set to the email variable", () => {
          fetch.mockResponseOnce(JSON.stringify(false));
          const validateEmail = userResolvers.validateEmail;
          const email = "email@gmail.com";
          const cache = {
            readQuery: jest.fn(() =>
              Promise.resolve({
                user: {
                  email: "",
                  errors: []
                }
              })
            ),
            writeQuery: jest.fn()
          };
          return validateEmail({}, { email }, { cache }).then(user => {
            expect(user.email).toBe(email);
          });
        });
        it("calls writeQuery with the updated user", () => {
          fetch.mockResponseOnce(JSON.stringify(false));
          const validateEmail = userResolvers.validateEmail;
          const email = "email@gmail.com";
          const user = {
            email: "",
            errors: []
          };
          const error = {
            __typename: "Error",
            message: "Email is already taken! Try another email.",
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
                  email,
                  errors: [...user.errors, error]
                }
              }
            });
          });
        });
      });
      describe("catching errors from fetch", () => {
        it("returns the user with updated email", () => {
          fetch.mockReject(new Error());
          const validateEmail = userResolvers.validateEmail;
          const email = "email@gmail.com";
          const user = {
            email: "",
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
          return validateEmail({}, { email }, { cache }).then(newUser => {
            expect(newUser.email).toBe(email);
          });
        });
        it("returns the user with a netowrk failure error", () => {
          fetch.mockReject(new Error());
          const validateEmail = userResolvers.validateEmail;
          const email = "email@gmail.com";
          const user = {
            email: "",
            errors: []
          };
          const error = {
            __typename: "Error",
            message: "There was a problem with the network. Try again.",
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
          const validateEmail = userResolvers.validateEmail;
          const email = "email@gmail.com";
          const user = {
            email: "",
            errors: []
          };
          const error = {
            __typename: "Error",
            message: "There was a problem with the network. Try again.",
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
                  email,
                  errors: [...user.errors, error]
                }
              }
            });
          });
        });
      });
    });
    describe("invalid email", () => {
      it("returns the user with the email field set to the email variable", () => {
        const validateEmail = userResolvers.validateEmail;
        const email = "email";
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user: {
                email: "",
                errors: []
              }
            })
          ),
          writeQuery: jest.fn()
        };
        return validateEmail({}, { email }, { cache }).then(user => {
          expect(user.email).toBe(email);
        });
      });
      it("returns the user with an invalid email error", () => {
        const validateEmail = userResolvers.validateEmail;
        const email = "email";
        const error = {
          __typename: "Error",
          message: "Email is not valid!",
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
                email: "",
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
        const validateEmail = userResolvers.validateEmail;
        const email = "email";
        const user = {
          email: "",
          errors: []
        };
        const error = {
          __typename: "Error",
          message: "Email is not valid!",
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
                email,
                errors: [...user.errors, error]
              }
            }
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
          message: "Password is too short!",
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
});
