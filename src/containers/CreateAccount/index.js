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

  validateUsername = async username => {
    try {
      const isUsernameValid = await validateUsername(username);
      if (isUsernameValid) {
        if (this.state.usernameError) this.setState({ usernameError: null });
      } else {
        this.setState({ usernameError: NON_UNIQUE_USERNAME });
      }
      return isUsernameValid;
    } catch (e) {
      this.setState({ usernameError: NETWORK_ERROR });
      return false;
    }
  };

  validateEmail = async email => {
    const isEmailValid = validateEmail(email);
    if (isEmailValid) {
      if (this.state.emailError) this.setState({ emailError: null });
    } else {
      this.setState({ emailError: INVALID_EMAIL });
      return isEmailValid;
    }
    try {
      const emailIsUnique = await isEmailUnique(email);
      if (emailIsUnique) {
        if (this.state.emailError) this.setState({ emailError: null });
      } else {
        this.setState({ emailError: NON_UNIQUE_EMAIL });
      }
      return emailIsUnique;
    } catch (e) {
      this.setState({ emailError: NETWORK_ERROR });
      return false;
    }
  };

  validatePassword = password => {
    const isPasswordValid = validatePassword(password);
    if (isPasswordValid) {
      if (this.state.passwordError) this.setState({ passwordError: null });
    } else {
      this.setState({ passwordError: INVALID_PASSWORD });
    }
    return isPasswordValid;
  };

  validateConfirmPassword = (password, confirmPassword) => {
    const isConfirmPasswordValid = password === confirmPassword;
    if (isConfirmPasswordValid) {
      if (this.state.createAccountError === NON_MATCHING_PASSWORD)
        this.setState({ createAccountError: null });
    } else {
      this.setState({
        createAccountError: NON_MATCHING_PASSWORD
      });
    }
    return isConfirmPasswordValid;
  };

  createAccount = async () => {
    this.setState({ createAccountLoading: true });
    const { username, email, password, confirmPassword } = this.state;
    let isFormValid = true;
    const validators = await Promise.all([
      this.validateUsername(username),
      this.validateEmail(email),
      this.validatePassword(password),
      this.validateConfirmPassword(password, confirmPassword)
    ]);
    isFormValid = !validators.filter(v => !v).length;
    if (!isFormValid) {
      return this.setState({ createAccountLoading: false });
    }
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

  setUsername = async username => {
    this.setState({ username, usernameLoading: true });
    await this.validateUsername(username);
    return this.setState({ usernameLoading: false });
  };

  setEmail = async email => {
    this.setState({ email, emailLoading: true });
    await this.validateEmail(email);
    return this.setState({ emailLoading: false });
  };

  setPassword = password => {
    this.setState({ password });
    this.validatePassword(password);
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
