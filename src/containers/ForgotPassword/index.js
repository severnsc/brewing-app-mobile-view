import React from "react";
import PropTypes from "prop-types";
import { ForgotPassword } from "../../screens";
import { graphql, compose } from "react-apollo";
import { FORGOT_PASSWORD } from "../../graphql";
import { FORGOT_PASSWORD_CONFIRM } from "../../constants";
import { validateEmail } from "../../modules/validation";

export class ForgotPasswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false
    };
  }

  onSubmit = ({ value }) => {
    const isEmailValid = validateEmail(value);
    if (!isEmailValid) {
      this.setState({ isError: true });
      return Promise.resolve();
    }
    return this.props
      .mutate({ variables: { email: value } })
      .then(() => this.props.navigation.navigate(FORGOT_PASSWORD_CONFIRM));
  };

  render() {
    return (
      <ForgotPassword onSubmit={this.onSubmit} isError={this.state.isError} />
    );
  }
}

ForgotPasswordContainer.propTypes = {
  mutate: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

ForgotPasswordContainer.defaultProps = {
  mutate: () => {},
  navigation: {
    navigate: () => {}
  }
};

export default compose(graphql(FORGOT_PASSWORD))(ForgotPasswordContainer);
