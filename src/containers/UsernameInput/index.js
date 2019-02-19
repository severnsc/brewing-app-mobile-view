import React from "react";
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

const UsernameInput = graphql(VALIDATE_USERNAME)(Container);

export default UsernameInput;
