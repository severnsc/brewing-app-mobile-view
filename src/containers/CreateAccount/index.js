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
  INVALID_EMAIL,
  INVALID_PASSWORD
} from "../../constants";
import {
  validateUsername,
  validateEmail,
  validatePassword,
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
      confirmPassword: "",
      createAccountLoading: false,
      createAccountError: null
    };
  }

  createAccount = async () => {
    this.setState({ createAccountLoading: true });
    const { username, email, password, confirmPassword } = this.state;
    const isUsernameValid = await validateUsername(username).catch(() => {
      this.setState({
        createAccountError: NETWORK_ERROR
      });
      return false;
    });
    if (!isUsernameValid) {
      if (this.state.createAccountError !== NETWORK_ERROR)
        this.setState({ createAccountError: NON_UNIQUE_USERNAME });
      return this.setState({ createAccountLoading: false });
    }
    const isEmailValid = validateEmail(email);
    if (!isEmailValid)
      return this.setState({
        createAccountError: INVALID_EMAIL,
        createAccountLoading: false
      });
    const _isEmailUnique = await isEmailUnique(email).catch(() => {
      this.setState({ createAccountError: NETWORK_ERROR });
      return false;
    });
    if (!_isEmailUnique) {
      if (this.state.createAccountError !== NETWORK_ERROR)
        this.setState({
          createAccountError: NON_UNIQUE_EMAIL
        });
      return this.setState({ createAccountLoading: false });
    }
    const isPasswordValid = validatePassword(password);
    if (!isPasswordValid)
      return this.setState({
        createAccountError: INVALID_PASSWORD,
        createAccountLoading: false
      });
    if (password !== confirmPassword)
      return this.setState({
        createAccountError: NON_MATCHING_PASSWORD,
        createAccountLoading: false
      });
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
          this.setState({
            createAccountError: createUser.errors.join("\n"),
            createAccountLoading: false
          });
        }
      })
      .catch(() =>
        this.setState({
          createAccountError: NETWORK_ERROR,
          createAccountLoading: false
        })
      );
  };
  setUsername = username => {
    this.setState({ username, usernameLoading: true });
    return validateUsername(username)
      .then(bool =>
        this.setState({
          usernameError: bool ? null : NON_UNIQUE_USERNAME,
          usernameLoading: false
        })
      )
      .catch(() =>
        this.setState({ usernameError: NETWORK_ERROR, usernameLoading: false })
      );
  };
  setEmail = email => {
    this.setState({ email, emailLoading: true });
    const isEmailValid = validateEmail(email);
    if (!isEmailValid)
      return this.setState({ emailError: INVALID_EMAIL, emailLoading: false });
    return isEmailUnique(email)
      .then(bool =>
        this.setState({
          emailError: bool ? null : NON_UNIQUE_EMAIL,
          emailLoading: false
        })
      )
      .catch(() =>
        this.setState({ emailError: NETWORK_ERROR, emailLoading: false })
      );
  };
  setPassword = password => {
    this.setState({
      password,
      passwordError: validatePassword(password) ? null : INVALID_PASSWORD
    });
  };
  setConfirmPassword = confirmPassword => this.setState({ confirmPassword });
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
      confirmPassword,
      createAccountLoading
    } = this.state;
    return (
      <CreateAccount
        createAccount={this.createAccount}
        createAccountLoading={createAccountLoading}
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
        setEmail={this.setEmail}
        setPassword={this.setPassword}
        setConfirmPassword={this.setConfirmPassword}
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
