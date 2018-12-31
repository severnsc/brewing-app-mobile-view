import React from "react";
import Button from ".";
import { storiesOf } from "@storybook/react-native";
import {
  withKnobs,
  text,
  color,
  boolean,
  number
} from "@storybook/addon-knobs";

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add("with value", () => (
    <Button
      textColor={color("Text color", "#fff")}
      value={text("Value", "press")}
      onPress={() => {}}
    />
  ))
  .add("with primary prop", () => (
    <Button
      textColor={color("Text color", "#fff")}
      value={text("Value", "press")}
      primary={true}
      onPress={() => {}}
    />
  ))
  .add("with secondary prop", () => (
    <Button
      value={text("Value", "press")}
      secondary={true}
      onPress={() => {}}
    />
  ))
  .add("with success prop", () => (
    <Button
      textColor={color("Text color", "#fff")}
      value={text("Value", "press")}
      success={true}
      onPress={() => {}}
    />
  ))
  .add("with danger prop", () => (
    <Button
      textColor={color("Text color", "#fff")}
      value={text("Value", "press")}
      danger={true}
      onPress={() => {}}
    />
  ))
  .add("with round prop", () => (
    <Button
      textColor={color("Text color", "#fff")}
      value={text("Value", "+")}
      round={true}
      onPress={() => {}}
    />
  ))
  .add("with hideBorder prop", () => (
    <Button
      value={text("Value", "press")}
      secondary={true}
      hideBorder={true}
      onPress={() => {}}
    />
  ))
  .add("with circle prop", () => (
    <Button
      textColor={color("Text color", "#fff")}
      fontSize={number("Font size", 25)}
      value={text("Value", "+")}
      circle={true}
      onPress={() => {}}
    />
  ));
