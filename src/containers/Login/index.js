import React from "react";
import PropTypes from "prop-types";
import { Login } from "../../screens";
import { LOGIN_USER } from "../../graphql";
import { compose, graphql } from "react-apollo";
import { DASHBOARD, FORGOT_PASSWORD } from "../../constants";

export class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false
    };
  }

  login = ({ value: username }, { value: password }) => {
    return this.props
      .mutate({
        variables: {
          user: {
            username,
            password
          }
        }
      })
      .then(({ error }) => {
        if (error) {
          this.setState({ isError: true });
        } else {
          this.props.navigation.navigate(DASHBOARD);
        }
      })
      .catch(e => Promise.reject());
  };

  forgotPassword = () => {
    this.props.navigation.navigate(FORGOT_PASSWORD);
  };

  render() {
    return (
      <Login
        login={this.login}
        isError={this.state.isError}
        forgotPassword={this.forgotPassword}
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
