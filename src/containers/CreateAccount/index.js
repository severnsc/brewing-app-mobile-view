import React from "react";
import PropTypes from "prop-types";
import { CREATE_USER } from "../../graphql";
import { graphql, compose } from "react-apollo";
import { CreateAccount } from "../../screens";
import {
  DASHBOARD,
  NETWORK_ERROR,
  NON_UNIQUE_USERNAME,
  EMPTY_USERNAME,
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
    if (username === "") {
      this.setState({ usernameError: EMPTY_USERNAME });
      return false;
    }
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

  validateConfirmPassword = (password, confirmPassword) =>
    password === confirmPassword;

  createAccount = async () => {
    this.setState({ createAccountLoading: true });
    const { username, email, password, confirmPassword } = this.state;
    let isFormValid = true;
    const validators = await Promise.all([
      this.validateUsername(username),
      this.validateEmail(email),
      this.validatePassword(password)
    ]);
    isFormValid = !validators.filter(v => !v).length;
    if (
      !isFormValid ||
      !this.validateConfirmPassword(password, confirmPassword)
    ) {
      return this.setState({ createAccountLoading: false });
    }
    try {
      const { errors } = await this.props.mutate({
        variables: {
          user: {
            username,
            email,
            password
          }
        },
        errorPolicy: "all"
      });
      if (!errors) {
        this.props.navigation.navigate(DASHBOARD);
      } else {
        this.setState({
          createAccountError: errors.map(err => err.message).join("\n"),
          createAccountLoading: false
        });
      }
    } catch {
      this.setState({
        createAccountError: NETWORK_ERROR,
        createAccountLoading: false
      });
    }
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
      createAccountLoading,
      createAccountError
    } = this.state;
    return (
      <CreateAccount
        createAccount={this.createAccount}
        createAccountLoading={createAccountLoading}
        createAccountError={createAccountError}
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
  mutate: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

CreateAccountContainer.defaultProps = {
  mutate: () => {},
  navigation: {
    navigate: () => {}
  }
};

export default compose(graphql(CREATE_USER))(CreateAccountContainer);
