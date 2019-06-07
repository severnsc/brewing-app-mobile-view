import React from "react";
import Text from ".";
import { storiesOf } from "@storybook/react-native";
import {
  withKnobs,
  text,
  boolean,
  color,
  object
} from "@storybook/addon-knobs";

const groupId = "Text";
storiesOf("Text", module).add("default", () => (
  <Text
    value={text("Value", "Text", groupId)}
    bold={boolean("Bold", false, groupId)}
    color={color("Color", "red", groupId)}
    success={boolean("Success", false, groupId)}
    danger={boolean("Danger", false, groupId)}
    style={object("Style", {}, groupId)}
  />
));
