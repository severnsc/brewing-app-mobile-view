import { BACKEND_URL } from "../../constants";
const validate = require("validate.js");

export const validatePassword = password => password.length >= 8;
export const validateUsername = username =>
	fetch(BACKEND_URL + "/isUsernameUnique", {
		method: "POST",
		body: JSON.stringify({ username }),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => res.json())
		.then(bool => bool)
		.catch(e => e);

export const validateEmail = email => {
	const constraints = {
		from: {
			email: true
		}
	};
	return validate({ from: email }, constraints);
};

export const isEmailUnique = email => {
	fetch(BACKEND_URL + "/isEmailUnique", {
		method: "POST",
		body: JSON.stringify({ email }),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => res.json())
		.then(bool => bool)
		.catch(e => e);
};
