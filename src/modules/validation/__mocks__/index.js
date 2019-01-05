const validations = jest.genMockFromModule("..");
validations.validateUsername = jest.fn(username =>
	Promise.resolve(username !== "taken")
);

module.exports = validations;
