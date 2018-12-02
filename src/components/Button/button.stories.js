import React from "react";
import Button from ".";
import { storiesOf } from "@storybook/react-native";

storiesOf("Button", module)
  .add("with value", () => (
    <Button textColor="white" value="press" onPress={() => {}} />
  ))
  .add("with primary prop", () => (
    <Button textColor="white" value="press" primary={true} onPress={() => {}} />
  ))
  .add("with secondary prop", () => (
    <Button value="press" secondary={true} onPress={() => {}} />
  ))
  .add("with success prop", () => (
    <Button textColor="white" value="press" success={true} onPress={() => {}} />
  ))
  .add("with danger prop", () => (
    <Button textColor="white" value="press" danger={true} onPress={() => {}} />
  ))
  .add("with round prop", () => (
    <Button textColor="white" value="+" round={true} onPress={() => {}} />
  ))
  .add("with hideBorder prop", () => (
    <Button
      value="press"
      secondary={true}
      hideBorder={true}
      onPress={() => {}}
    />
  ))
  .add("with circle prop", () => (
    <Button
      textColor="white"
      fontSize={25}
      value="+"
      circle={true}
      onPress={() => {}}
    />
  ));
