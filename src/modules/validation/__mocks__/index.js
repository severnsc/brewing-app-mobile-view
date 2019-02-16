import { validateEmail, validatePassword } from "..";

const validateUsername = jest.fn(username =>
  Promise.resolve(username !== "taken")
);
const isEmailUnique = jest.fn(email => Promise.resolve(email !== "not unique"));

export { validateUsername, isEmailUnique, validateEmail, validatePassword };
