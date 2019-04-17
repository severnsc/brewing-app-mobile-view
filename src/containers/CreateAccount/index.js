import React from "react";
import PropTypes from "prop-types";
import { CREATE_USER } from "../../graphql";
import { graphql, compose } from "react-apollo";
import { CreateAccount } from "../../screens";
import {
  DASHBOARD,
  NETWORK_ERROR,
  NON_UNIQUE_USERNAME,
  NON_UNIQUE_EMAIL,
  NON_MATCHING_PASSWORD,
  INVALID_EMAIL
} from "../../constants";
import {
  validateUsername,
  validateEmail,
  isEmailUnique
} from "../../modules/validation";

export class CreateAccountContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usernameError: null,
      usernameLoading: false,
      email: "",
      emailError: null,
      emailLoading: false,
      password: "",
      passwordError: null,
      confirmPassword: ""
    };
  }
  createAccount = () => {
    const { username, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword)
      return this.setState({ createAccountError: NON_MATCHING_PASSWORD });
    return this.props
      .mutate({
        variables: {
          user: {
            username,
            email,
            password,
            confirmPassword
          }
        }
      })
      .then(({ data: { createUser } }) => {
        if (createUser.errors.length === 0) {
          this.props.navigation.navigate(DASHBOARD);
        } else {
          this.setState({ createAccountError: createUser.errors.join("\n") });
        }
      })
      .catch(() => this.setState({ createAccountError: NETWORK_ERROR }));
  };
  setUsername = username => {
    return validateUsername(username)
      .then(bool =>
        this.setState({ usernameError: bool ? null : NON_UNIQUE_USERNAME })
      )
      .catch(() => this.setState({ usernameError: NETWORK_ERROR }));
  };
  onEmailChange = email => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) return this.setState({ emailError: INVALID_EMAIL });
    return isEmailUnique(email)
      .then(bool =>
        this.setState({ emailError: bool ? null : NON_UNIQUE_EMAIL })
      )
      .catch(() => this.setState({ emailError: NETWORK_ERROR }));
  };
  render() {
    const {
      username,
      usernameError,
      usernameLoading,
      email,
      emailError,
      emailLoading,
      password,
      passwordError,
      confirmPassword
    } = this.state;
    return (
      <CreateAccount
        createAccount={this.createAccount}
        username={username}
        usernameError={usernameError}
        usernameLoading={usernameLoading}
        email={email}
        emailError={emailError}
        emailLoading={emailLoading}
        password={password}
        passwordError={passwordError}
        confirmPassword={confirmPassword}
        setUsername={this.setUsername}
        onEmailChange={this.onEmailChange}
      />
    );
  }
}

CreateAccountContainer.propTypes = {
  mutate: PropTypes.func.isRequired
};

CreateAccountContainer.defaultProps = {
  mutate: () => {}
};

export default compose(graphql(CREATE_USER))(CreateAccountContainer);
