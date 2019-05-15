import React from "react";
import PropTypes from "prop-types";
import { Login } from "../../screens";
import { LOGIN_USER } from "../../graphql";
import { compose, graphql } from "react-apollo";
import { DASHBOARD, FORGOT_PASSWORD, NETWORK_ERROR } from "../../constants";

export class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      username: "",
      password: "",
      loginError: "",
      loading: false
    };
  }

  login = () => {
    return this.props
      .mutate({
        errorPolicy: "all",
        variables: {
          user: {
            username: this.state.username,
            password: this.state.password
          }
        }
      })
      .then(({ errors }) => {
        if (errors) {
          this.setState({ isError: true });
        } else {
          this.props.navigation.navigate(DASHBOARD);
        }
      })
      .catch(e => this.setState({ loginError: NETWORK_ERROR }));
  };

  forgotPassword = () => {
    this.props.navigation.navigate(FORGOT_PASSWORD);
  };

  setUsername = username => this.setState({ username });

  setPassword = password => this.setState({ password });

  render() {
    const { username, isError, password, loginError, loading } = this.state;
    return (
      <Login
        submit={this.login}
        username={username}
        setUsername={this.setUsername}
        password={password}
        setPassword={this.setPassword}
        loginError={loginError}
        isError={isError}
        forgotPassword={this.forgotPassword}
        loading={loading}
      />
    );
  }
}

LoginContainer.propTypes = {
  mutate: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

LoginContainer.defaultProps = {
  mutate: () => {},
  navigation: {
    navigate: () => {}
  }
};

export default compose(graphql(LOGIN_USER))(LoginContainer);
