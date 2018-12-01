import React from "react";
import TextInput from ".";
import { storiesOf } from "@storybook/react-native";

storiesOf("TextInput", module)
  .add("with value", () => (
    <TextInput value="input goes here" onChange={() => {}} />
  ))
  .add("with placeholder", () => (
    <TextInput placeholder="placeholder" onChange={() => {}} />
  ))
  .add("with password", () => (
    <TextInput password={true} value="password" onChange={() => {}} />
  ))
  .add("with autoFocus", () => (
    <TextInput
      autoFocus={true}
      label="Focus"
      value="Im focused!"
      onChange={() => {}}
    />
  ))
  .add("with label", () => (
    <TextInput
      label="Username"
      placeholder="Enter your username"
      onChange={() => {}}
    />
  ))
  .add("with isError", () => (
    <TextInput isError={true} label="Password" onChange={() => {}} />
  ));
