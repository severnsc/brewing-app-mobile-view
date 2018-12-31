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
      textColor={color("Text color", "#fff", "Button")}
      value={text("Value", "press", "Button")}
      onPress={() => {}}
    />
  ))
  .add("with primary prop", () => (
    <Button
      textColor={color("Text color", "#fff", "Button")}
      value={text("Value", "press", "Button")}
      primary={true}
      onPress={() => {}}
    />
  ))
  .add("with secondary prop", () => (
    <Button
      value={text("Value", "press", "Button")}
      secondary={true}
      onPress={() => {}}
    />
  ))
  .add("with success prop", () => (
    <Button
      textColor={color("Text color", "#fff", "Button")}
      value={text("Value", "press", "Button")}
      success={true}
      onPress={() => {}}
    />
  ))
  .add("with danger prop", () => (
    <Button
      textColor={color("Text color", "#fff", "Button")}
      value={text("Value", "press", "Button")}
      danger={true}
      onPress={() => {}}
    />
  ))
  .add("with round prop", () => (
    <Button
      textColor={color("Text color", "#fff", "Button")}
      value={text("Value", "+", "Button")}
      round={true}
      onPress={() => {}}
    />
  ))
  .add("with hideBorder prop", () => (
    <Button
      value={text("Value", "press", "Button")}
      secondary={true}
      hideBorder={true}
      onPress={() => {}}
    />
  ))
  .add("with circle prop", () => (
    <Button
      textColor={color("Text color", "#fff", "Button")}
      fontSize={number("Font size", 25, {}, "Button")}
      value={text("Value", "+", "Button")}
      circle={true}
      onPress={() => {}}
    />
  ));
