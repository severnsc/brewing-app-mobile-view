import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../components";
import { graphql, compose } from "react-apollo";
import { VALIDATE_USERNAME, GET_USER } from "../../graphql";
import debounce from "lodash.debounce";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  debounced = debounce(
    username => this.props.mutate({ variables: { username } }),
    500
  );

  onChange = username => {
    this.setState({ username });
    this.debounced(username);
  };

  render() {
    const {
      data: {
        user: { errors }
      },
      testID,
      style
    } = this.props;
    const { username } = this.state;
    let isError = false;
    let usernameError;
    const usernameErrors = errors.filter(
      err => err.location.field === "username"
    );
    if (usernameErrors.length > 0) {
      isError = true;
      usernameError = usernameErrors.pop().message;
    }

    return (
      <TextInput
        isError={isError}
        errorText={usernameError}
        onChange={this.onChange}
        value={username}
        testID={testID}
        style={style}
        label="Username"
      />
    );
  }
}

Container.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
      email: PropTypes.string,
      errors: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.arrayOf(
          PropTypes.shape({
            message: PropTypes.string,
            location: PropTypes.shape({
              node: PropTypes.string,
              field: PropTypes.string
            })
          })
        )
      ])
    })
  }).isRequired,
  mutate: PropTypes.func.isRequired,
  testID: PropTypes.string,
  style: PropTypes.object
};

Container.defaultProps = {
  data: {
    user: {
      username: "",
      email: "",
      errors: []
    }
  },
  mutate: () => {}
};

const UsernameInput = compose(
  graphql(VALIDATE_USERNAME),
  graphql(GET_USER)
)(Container);

export default UsernameInput;
