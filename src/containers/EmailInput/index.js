import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../components";
import { compose, graphql } from "react-apollo";
import { GET_USER, VALIDATE_EMAIL } from "../../graphql";
import debounce from "lodash.debounce";

class EmailInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  debounced = debounce(
    email => this.props.mutate({ variables: { email } }),
    500
  );

  onChange = email => {
    this.debounced(email);
    this.setState({ email });
  };

  render() {
    const { email } = this.state;
    const { testID, style, data } = this.props;
    let isError = false;
    let errorText = "";
    if (data.user.errors.length > 0) {
      isError = true;
      errorText = data.user.errors.find(err => err.location.field === "email")
        .message;
    }
    return (
      <TextInput
        onChange={this.onChange}
        value={email}
        testID={testID}
        style={style}
        label="Email"
        isError={isError}
        errorText={errorText}
      />
    );
  }
}

EmailInput.propTypes = {
  testID: PropTypes.string,
  style: PropTypes.object,
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
  }).isRequired
};

EmailInput.defaultProps = {
  data: {
    user: {
      username: "",
      email: "",
      errors: []
    }
  },
  mutate: () => {}
};

export default compose(
  graphql(GET_USER),
  graphql(VALIDATE_EMAIL)
)(EmailInput);
