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
});
