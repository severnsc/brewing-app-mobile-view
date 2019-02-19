import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../components";
import { graphql } from "react-apollo";
import { VALIDATE_USERNAME } from "../../graphql";

const Container = ({ data, mutate, testID, style }) => {
  const onChange = username => mutate({ variables: { username } });

  const isError = !!data.user.errors.length;
  const usernameError = data.user.errors.find(
    error => error.location.field === "username"
  );

  return (
    <TextInput
      isError={isError}
      errorText={usernameError && usernameError.message}
      onChange={onChange}
      value={data.user.username || ""}
      testID={testID}
      style={style}
      label="Username"
    />
  );
};

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

const UsernameInput = graphql(VALIDATE_USERNAME)(Container);

export default UsernameInput;
