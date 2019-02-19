import { validateEmail, validatePassword } from "../user";
const validations = jest.genMockFromModule("..");
validations.validateUsername = jest.fn(username =>
  Promise.resolve(username !== "taken")
);
validations.isEmailUnique = jest.fn(email =>
  fetch(email)
    .then(res => res.json())
    .then(data => data)
);
validations.validateEmail = validateEmail;
validations.validatePassword = validatePassword;

module.exports = validations;
