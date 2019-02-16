const validations = require(".");

describe("validation mock", () => {
  describe("validate username mock", () => {
    describe("when passing taken", () => {
      it("should return a promise that resolves to false", () => {
        return validations
          .validateUsername("taken")
          .then(bool => expect(bool).toBe(false));
      });
    });
    describe("when passing other value", () => {
      it("should return a promise that resolves to true", () => {
        return validations
          .validateUsername("not taken")
          .then(bool => expect(bool).toBe(true));
      });
    });
  });
  describe("isEmailUnique mock", () => {
    describe("when returning false", () => {
      it("should return false", () => {
        return validations
          .isEmailUnique("not unique")
          .then(bool => expect(bool).toBe(false));
      });
    });
    describe("when returning true", () => {
      it("should return true", () => {
        fetch.mockResponse(JSON.stringify(true));
        return validations
          .isEmailUnique("unique")
          .then(bool => expect(bool).toBe(true));
      });
    });
  });
});
