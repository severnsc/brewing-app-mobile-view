import userResolvers from ".";
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
          )
        };
        return validateUsername({}, { username }, { cache }).then(user => {
          expect(user.username).toBe(username);
        });
      });
    });
    describe("invalid username", () => {
      it("updates username field with the value", () => {
        fetch.mockResponse(JSON.stringify(false));
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
          node: "user",
          field: "username"
        };
        return validateUsername({}, { username }, { cache }).then(user => {
          expect(user.username).toEqual(username);
        });
      });
      it("updates errors with an invalid username error", () => {
        fetch.mockResponse(JSON.stringify(false));
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
          node: "user",
          field: "username"
        };
        return validateUsername({}, { username }, { cache }).then(user => {
          expect(user.errors).toEqual([error]);
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
          node: "user",
          field: "username"
        };
        return validateUsername({}, { username }, { cache }).then(user => {
          expect(user.errors).toEqual([error]);
        });
      });
    });
  });
  describe("validate email", () => {
    describe("valid email", () => {
      it("returns the user with the email value updated to equal the email variable", () => {
        fetch.mockResponse(JSON.stringify(true));
        const validateEmail = userResolvers.validateEmail;
        const email = "email@gmail.com";
        const cache = {
          readQuery: jest.fn(() =>
            Promise.resolve({
              user: {
                email: ""
              }
            })
          )
        };
        return validateEmail({}, { email }, { cache }).then(user => {
          expect(user.email).toBe(email);
        });
      });
      describe("when email is not unique", () => {
        it("returns the user with an email is not unique error", () => {
          fetch.mockResponse(JSON.stringify(false));
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
            node: "user",
            field: "email"
          };
          return validateEmail({}, { email }, { cache }).then(user => {
            expect(user.errors[0]).toEqual(error);
          });
        });
        it("returns the user with the email value set to the email variable", () => {
          fetch.mockResponse(JSON.stringify(false));
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
      });
    });
  });
});
