import React from "react";
import EmailInput from ".";
import { storiesOf } from "@storybook/react-native";

storiesOf("EmailInput", module)
  .add("with value", () => (
    <EmailInput value="me@example.com" onChange={() => {}} />
  ))
  .add("with placeholder", () => (
    <EmailInput placeholder="Placeholder" onChange={() => {}} />
  ))
  .add("with autoFocus", () => (
    <EmailInput autoFocus={true} onChange={() => {}} />
  ))
  .add("with label", () => (
    <EmailInput
      label="Email"
      placeholder="me@example.com"
      onChange={() => {}}
    />
  ));
